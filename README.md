# zero-knowledge-puzzles .

Simple Zero knowledge puzzles to learn writing circuits in [circom](https://docs.circom.io/) lang.

## Installation

### Rust

Circom compiler requires rust .
For MacOs and Linux users,
```
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

```

### Circom compiler 

Clone the circom repository

```
git clone https://github.com/iden3/circom.git
```

Enter the repository

```
cargo build --release
```

Install

```
cargo install --path circom
```

### Libraries 

```
npm install 
```

## Solving puzzles.

Write your solution .

Then run the following command

```
yarn test ./test/<TestName>.js
```

## Relevant links 

- [CircomLib](https://github.com/iden3/circomlib )

- [Quickly compile circuits using this online browser compiler - Zkrepl](https://zkrepl.dev)

## Troubleshoot

Mac users getting this error on circom installation
```
error: linking with `cc` failed: exit status: 1
```

Install xcode , then restart your mac .

```
xcode-select --install
```

## Contributors
- [supernova](https://github.com/supernovahs)
- [tanim0la](https://github.com/tanim0la)

