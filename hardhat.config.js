/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "Compile/contracts/", // Tell Hardhat where to find contracts.
  },
//   networks: {
//     hardhat: {},
//    
//     mainnet: {
//       url: ,
//       accounts: [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
//     },
//   },
};