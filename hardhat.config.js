require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomicfoundation/hardhat-verify")
require("@nomiclabs/hardhat-ethers")
require("hardhat-gas-reporter")
require("solidity-coverage")

const SEPOLIAURL = process.env.SEPOLIAURL
const PRIVATEKEY = process.env.PRIVATEKEY
const ETHSCAN = process.env.ETHSCANKEY
const CONKEY = process.env.COINMARKETKEY

module.exports = {
    solidity: "0.8.19",
    networks: {
        sepolia: {
            // This is a network identifier, it can be named whatever you like
            url: SEPOLIAURL,
            accounts: [PRIVATEKEY], // Note: accounts, not account
            chainId: 11155111,
        },
    },
    etherscan: {
        apiKey: ETHSCAN,
    },
    gasReporter: {
        enabled: true,
        outputFile: "Gasreport.txt",
        nocolors: true,
        currency: "USD",
        coinmarketcap: CONKEY,
        token: "MATIC",
    },
}
