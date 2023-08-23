// imports
const { ethers, run, network } = require("hardhat")
//async

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying...")
    const simpleStorage = await SimpleStorageFactory.deploy()

    console.log(`Deployed contract to: ${simpleStorage.address}`)

    console.log(network.config)

    if (network.config.chainId === 11155111 && process.env.ETHSCAN) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is ${currentValue}`)
    const transcationRepsonse = await simpleStorage.store(7)
    await transcationRepsonse.wait()
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is ${updatedvalue}`)
}

async function verity(contractAddress, args) {
    console.log("Verify contract...")

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase.includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
