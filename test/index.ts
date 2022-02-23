import { expect } from "chai";
import { ethers } from "hardhat";

describe("Whitelister", function () {
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

  it("Should add a project", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    await whitelister.addProject("Project 1", 10);
    expect((await whitelister.projects(0)).name).to.equal("Project 1");
  });

  it("Should add multiple projects", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    await whitelister.addProject("Project 1", 10);
    await whitelister.addProject("Project 2", 20);
    await whitelister.addProject("Project 3", 30);

    expect((await whitelister.projects(0)).name).to.equal("Project 1");
    expect((await whitelister.projects(1)).name).to.equal("Project 2");
    expect((await whitelister.projects(2)).name).to.equal("Project 3");
    expect((await whitelister.projects(0)).maxWhitelistedAddresses).to.equal(
      "10"
    );
    expect((await whitelister.projects(1)).maxWhitelistedAddresses).to.equal(
      "20"
    );
    expect((await whitelister.projects(2)).maxWhitelistedAddresses).to.equal(
      "30"
    );
  });

  it("Should add an address to a project whitelist", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    const [account] = await ethers.getSigners();

    // Add a new project to the contract
    await whitelister.addProject("Project 1", 10);
    await whitelister.addAddressToWhitelist(0);

    // Check that the address is whitelisted
    expect(await whitelister.isWhitelisted(0, account.address)).to.equal(true);
  });

  it("Should add multiple addresses to a project whitelist", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    const [account1, account2, account3] = await ethers.getSigners();

    await whitelister.addProject("Project 1", 10);

    await whitelister.connect(account1).addAddressToWhitelist(0);
    await whitelister.connect(account2).addAddressToWhitelist(0);
    await whitelister.connect(account3).addAddressToWhitelist(0);

    expect(await whitelister.isWhitelisted(0, account1.address)).to.equal(true);
    expect(await whitelister.isWhitelisted(0, account2.address)).to.equal(true);
    expect(await whitelister.isWhitelisted(0, account3.address)).to.equal(true);
  });

  it("Should get the number of whitelisted addresses for a project", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    const [account1, account2, account3] = await ethers.getSigners();

    await whitelister.addProject("Project 1", 10);

    await whitelister.connect(account1).addAddressToWhitelist(0);
    await whitelister.connect(account2).addAddressToWhitelist(0);
    await whitelister.connect(account3).addAddressToWhitelist(0);

    expect(await whitelister.getWhitelistedAddressesCount(0)).to.equal(3);
  });

  it("Should return the number of maximum whitelist addresses", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    await whitelister.addProject("Project 1", 10);

    expect(await whitelister.getMaxWhitelistedAddressesCount(0)).to.equal(10);
  });

  it("Should toggle whitelisting for a certain project", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    await whitelister.addProject("Project 1", 10);

    expect((await whitelister.projects(0)).isWhitelistingActive).to.equal(true);

    await whitelister.toggleWhitelisting(0);

    expect((await whitelister.projects(0)).isWhitelistingActive).to.equal(
      false
    );
  });

  it("Should revert if someone else triied to toggle whitelisting status", async function () {
    const Whitelister = await ethers.getContractFactory("Whitelister");
    const whitelister = await Whitelister.deploy();
    await whitelister.deployed();

    const [owner, account1] = await ethers.getSigners();

    await whitelister.connect(owner).addProject("Project 1", 10);

    await expect(
      whitelister.connect(account1).toggleWhitelisting(0)
    ).to.be.revertedWith("You are not the owner");
  });
});
