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

    //Modifiers
    // check if project whitelisting is active
    modifier activeWhitelisting(uint256 _projectId) {
        require(
            projects[_projectId].isWhitelistingActive == true,
            "Whitelisting not active"
        );
        _;
    }

    // check if the user has already been whitelisted
    modifier notAlreadyWhitelisted(uint256 _projectId, address _address) {
        require(
            !projects[_projectId].whitelistedAddresses[msg.sender],
            "Already whitelisted"
        );
        _;
    }

    // check if the numAddressesWhitelisted < maxWhitelistedAddresses, if not then throw an error.
    modifier whitelistingLimit(uint256 _projectId) {
        require(
            projects[_projectId].numAddressesWhitelisted <
                projects[_projectId].maxWhitelistedAddresses,
            "Limit reached"
        );
        _;
    }

    // check if the action is performed by the project owner
    modifier ownerOnly(uint256 _projectId) {
        require(
            msg.sender == projects[_projectId].owner,
            "You are not the owner"
        );
        _;
    }

    /**
        addAddressToWhitelist - This function adds the address of the sender to the
        whitelist in the appropriate project
     */
    function addAddressToWhitelist(uint256 projectId)
        public
        activeWhitelisting(projectId)
        notAlreadyWhitelisted(projectId, msg.sender)
        whitelistingLimit(projectId)
    {
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

    /**
        isWhitelisted - This function checks if the address is whitelisted in the project
     */
    function isWhitelisted(uint256 projectId, address _address)
        public
        view
        returns (bool)
    {
        return projects[projectId].whitelistedAddresses[_address];
    }

    /** 
        numOfWhitelistedAddresses - This function returns the number of whitelisted
        addresses in a specific project
     */
    function getWhitelistedAddressesCount(uint256 projectId)
        public
        view
        returns (uint256)
    {
        return projects[projectId].numAddressesWhitelisted;
    }

    /**
        getMaxWhitelistedAddresses - This function returns the max number of
        whitelisted addresses
    */
    function getMaxWhitelistedAddressesCount(uint256 projectId)
        public
        view
        returns (uint256)
    {
        return projects[projectId].maxWhitelistedAddresses;
    }

    /** 
        toggleWhitelisting - This function toggles the whitelisting on and off
     */
    function toggleWhitelisting(uint256 projectId) public ownerOnly(projectId) {
        projects[projectId].isWhitelistingActive = !projects[projectId]
            .isWhitelistingActive;
    }
}
