import { expect } from "chai";
import { ethers } from "hardhat";

describe("Newly deployed contract", function () {
  it("Should return false for a non existing project", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    expect((await whitelister.projects(0)).isWhitelistingActive).to.equal(
      false
    );
  });

  it("Should raise error if trying to add an address to a non existing project", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    await expect(whitelister.addAddressToWhitelist(0)).to.be.revertedWith(
      "Whitelisting not active"
    );
  });
});

describe("Adding a project", function () {
  it("Should add a project", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    await whitelister.addProject("Project 1", 10);
    expect((await whitelister.projects(0)).name).to.equal("Project 1");
  });
});
