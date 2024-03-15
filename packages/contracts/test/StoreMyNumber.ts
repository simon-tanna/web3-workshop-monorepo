import { expect } from "chai";
import { ethers } from "hardhat";
import { StoreMyNumber } from "../typechain";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("StoreMyNumber", function () {
  let storeMyNumber: StoreMyNumber;

  async function deployStoreMyNumber() {
    // Contracts are deployed using the first signer/account by default

    const StoreMyNumber = await ethers.getContractFactory("StoreMyNumber");
    storeMyNumber = (await StoreMyNumber.deploy()) as any as StoreMyNumber;

    return { storeMyNumber };
  }

  describe("Deployment", function () {
    it("Should be deployed", async function () {
      const { storeMyNumber } = await deployStoreMyNumber();

      expect(storeMyNumber.deploymentTransaction()).to.not.be.null;
    });
  });

  describe("Initial state", function () {
    it("should have an initial favorite number of 0", async function () {
      expect(await storeMyNumber.retrieve()).to.equal(0);
    });
  });

  describe("Non-existent person", function () {
    it("should return a default value for non-existent person", async function () {
      // Assuming the default favorite number is 0 for non-existent person
      const nonExistentName = "NonExistent";
      expect(
        await storeMyNumber.retrievePeopleByName(nonExistentName)
      ).to.equal(0);
    });
  });

  describe("store and retrieve", function () {
    it("should store and retrieve the favorite number", async function () {
      const testNumber = 7;
      await storeMyNumber.store(testNumber);
      expect(await storeMyNumber.retrieve()).to.equal(testNumber);
    });
  });

  describe("people array and mapping", function () {
    it("should add multiple people and maintain correct state", async function () {
      const people = [
        { name: "Bob", favoriteNumber: 15 },
        { name: "Charlie", favoriteNumber: 20 },
      ];

      for (let person of people) {
        await storeMyNumber.addPerson(person.name, person.favoriteNumber);
      }

      // Check that each person has been added correctly
      for (let i = 0; i < people.length; i++) {
        const person = await storeMyNumber.people(i);
        expect(person.name).to.equal(people[i].name);
        expect(person.favoriteNumber).to.equal(people[i].favoriteNumber);
      }
    });
  });

  describe("addPerson and retrievePeopleByName", function () {
    it("should add a person and retrieve their favorite number by name", async function () {
      const testName = "Alice";
      const testNumber = 10;
      await storeMyNumber.addPerson(testName, testNumber);

      // Test the mapping from name to favorite number
      expect(await storeMyNumber.nameToFavoriteNumber(testName)).to.equal(
        testNumber
      );

      // Test retrieving the person's favorite number by name
      expect(await storeMyNumber.retrievePeopleByName(testName)).to.equal(
        testNumber
      );
    });
  });

  describe("Boundary Conditions", function () {
    it("should handle large favorite numbers", async function () {
      const largeNumber = ethers.MaxUint256;
      await storeMyNumber.store(largeNumber);
      expect(await storeMyNumber.retrieve()).to.equal(largeNumber);
    });

    it("should handle empty name strings", async function () {
      const emptyName = "";
      const testNumber = 123;
      await storeMyNumber.addPerson(emptyName, testNumber);

      expect(await storeMyNumber.retrievePeopleByName(emptyName)).to.equal(
        testNumber
      );
    });
  });

  describe("Adding duplicate names with different numbers", function () {
    it("should update the favorite number for a name", async function () {
      const name = "Duplicate";
      await storeMyNumber.addPerson(name, 100);
      await storeMyNumber.addPerson(name, 200); // Assuming this updates the existing entry
      expect(await storeMyNumber.retrievePeopleByName(name)).to.equal(200);
    });
  });

  describe("Stress Testing", function () {
    it("should handle adding many people", async function () {
      const numberOfPeople = 50;
      for (let i = 0; i < numberOfPeople; i++) {
        await storeMyNumber.addPerson(`Person${i}`, i);
      }
      // Verify the last person added
      expect(
        await storeMyNumber.retrievePeopleByName(`Person${numberOfPeople - 1}`)
      ).to.equal(numberOfPeople - 1);
    });
  });
});
