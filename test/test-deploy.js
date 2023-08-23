//const { ethers } = require("hardhat")
const hre = require("hardhat")
const { ethers } = hre
const { expect, assert } = require("chai")

describe("SimpleStorage", () => {
    let simpleStorageFactory, simpleStorage

    beforeEach((done) => {
        ethers
            .getContractFactory("SimpleStorage")
            .then((factory) => {
                simpleStorageFactory = factory
                return factory.deploy()
            })
            .then((deployedContract) => {
                simpleStorage = deployedContract
                done()
            })
            .catch((error) => done(error))
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = ethers.BigNumber.from("0")

        assert.equal(currentValue.toString(), expectedValue.toString())
    })

    it("Should update when we call store", async function () {
        const expectedValue = ethers.BigNumber.from("7")
        await simpleStorage.store(expectedValue)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue.toString())
    })

    it("Should add a person's name and favorite number correctly", async function () {
        // Initial data for testing
        const testName = "Alice"
        const testFavoriteNumber = ethers.BigNumber.from("42")

        // Retrieve the initial number of people
        const initialPeopleCount = await simpleStorage.getPeopleCount()

        // Call the function to add the person
        await simpleStorage.addPerson(testName, testFavoriteNumber)

        // Retrieve the person added at the end of the people array
        const addedPerson = await simpleStorage.people(initialPeopleCount)

        // Check the added person's details
        assert.equal(
            addedPerson.name,
            testName,
            "The name of the added person is incorrect."
        )
        assert.equal(
            addedPerson.favoriteNumber.toString(),
            testFavoriteNumber.toString(),
            "The favorite number of the added person is incorrect."
        )

        // Check the mapping for correctness
        const retrievedFavoriteNumber =
            await simpleStorage.nameToFavoriteNumber(testName)
        assert.equal(
            retrievedFavoriteNumber.toString(),
            testFavoriteNumber.toString(),
            "The mapping from name to favorite number is incorrect."
        )
    })
})
