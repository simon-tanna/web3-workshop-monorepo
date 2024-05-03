// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/// @title Factory contract for deploying StoreMyNumber contracts
contract StoreMyNumberFactory {
    // Mapping to keep track of deployed contracts and their owners
    mapping(address => address) public deployedContracts;
    // Event to log contract deployment
    event ContractDeployed(address indexed owner, address indexed contractAddress);

    /// @notice Deploys a new instance of the StoreMyNumber contract
    /// @param _favoriteNumber The favorite number to initialize in the new contract
    function deployStoreMyNumber(uint256 _favoriteNumber) external {
        StoreMyNumber newContract = new StoreMyNumber();
        newContract.store(_favoriteNumber);
        deployedContracts[msg.sender] = address(newContract);
        emit ContractDeployed(msg.sender, address(newContract));
    }

    /// @notice Retrieves the deployed StoreMyNumber contract address for the caller
    /// @return The address of the deployed contract, if any
    function getDeployedStoreMyNumber() external view returns (address) {
        return deployedContracts[msg.sender];
    }
}

/// @title A contract for storing and retrieving people's favorite numbers
/// @dev This contract allows users to store a favorite number, add a person with a favorite number,
/// and retrieve information about people's favorite numbers using their name.
///
contract StoreMyNumber {
    /// @notice Stores the favorite number set by the last user who called `store`.
    uint256 favoriteNumber;

    /// @notice Struct representing a person with a name and their favorite number.
    /// @param favoriteNumber The person's favorite number.
    /// @param name The name of the person.
    ///
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    /// @notice Dynamic array of `People` structs storing information about people's favorite numbers.
    People[] public people;

    /// @notice Mapping of person's names to their favorite numbers for quick lookup.
    mapping(string => uint256) public nameToFavoriteNumber;

    /// @notice Stores a favorite number.
    /// @dev Updates the `favoriteNumber` storage variable with the provided `_favoriteNumber`.
    /// @param _favoriteNumber The favorite number to store.
    ///
    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    /// @notice Retrieves the last stored favorite number.
    /// @return The last stored favorite number.
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    /// @notice Adds a new person's name and favorite number to the contract.
    /// @dev Adds a new `People` struct to the `people` array and updates the `nameToFavoriteNumber` mapping.
    /// @param _name The name of the person to add.
    /// @param _favoriteNumber The person's favorite number.
    ///
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    /// @notice Retrieves a person's favorite number by their name.
    /// @dev Looks up the person's favorite number using the `nameToFavoriteNumber` mapping.
    /// @param _name The name of the person whose favorite number to retrieve.
    /// @return The favorite number of the person.
    ///
    function retrievePeopleByName(
        string memory _name
    ) public view returns (uint256) {
        return nameToFavoriteNumber[_name];
    }
}