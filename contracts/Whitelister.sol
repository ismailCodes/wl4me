//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Whitelister {
    //The structure that will hold a project
    struct Project {
        bool isWhitelistingActive;
        string name;
        uint256 id;
        uint256 numAddressesWhitelisted;
        uint256 maxWhitelistedAddresses;
        address owner;
        mapping(address => bool) whitelistedAddresses;
    }
    uint256 internal idCounter;
    mapping(uint256 => Project) public projects;

    /**
        addAddressToWhitelist - This function adds the address of the sender to the
        whitelist in the appropriate project
     */
    function addAddressToWhitelist(uint256 projectId) public {
        // check if project whitelisting is active
        require(projects[projectId].isWhitelistingActive == true, "Whitelisting not active");
        // check if the user has already been whitelisted
        require(
            !projects[projectId].whitelistedAddresses[msg.sender],
            "Already whitelisted"
        );
        // check if the numAddressesWhitelisted < maxWhitelistedAddresses, if not then throw an error.
        require(
            projects[projectId].numAddressesWhitelisted <
                projects[projectId].maxWhitelistedAddresses,
            "Limit reached"
        );
        // Add the address which called the function to the whitelistedAddress array
        projects[projectId].whitelistedAddresses[msg.sender] = true;
        // Increase the number of whitelisted addresses
        projects[projectId].numAddressesWhitelisted += 1;
    }

    /**
        addProject - This function adds a project to the whitelister contract
     */
    function addProject(string memory name, uint256 _maxWhitelistedAddresses)
        public
    {
        // Create a new project
        projects[idCounter].isWhitelistingActive = true;
        projects[idCounter].name = name;
        projects[idCounter].id = idCounter;
        projects[idCounter].maxWhitelistedAddresses = _maxWhitelistedAddresses;
        projects[idCounter].numAddressesWhitelisted = 0;
        projects[idCounter].owner = msg.sender;
        idCounter += 1;
    }
}
