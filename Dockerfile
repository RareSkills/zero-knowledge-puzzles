# 1. Build install circom
FROM rust:1.70.0 as circom-installer

WORKDIR /circom

# Install circom
RUN git clone https://github.com/iden3/circom.git .

# use circom v2.1.9 due to bug in v2.2.0 - https://github.com/iden3/circom/issues/308
RUN git checkout tags/v2.1.9
RUN cargo build --release
RUN cargo install --path circom

# Use Node.js image based on Debian Buster for compatibility
FROM node:18-buster

# Set the PATH explicitly to include standard directories
ENV PATH="/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Copy the Circom binary from the build stage
COPY --from=circom-installer /usr/local/cargo/bin/circom /usr/local/bin/circom

# Ensure the Circom binary is executable
RUN chmod +x /usr/local/bin/circom

# Verify that Circom is in PATH and print version
RUN which circom
RUN circom --version

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock* ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Default command
ENTRYPOINT [ "yarn" ]
CMD [ "test" ]

