// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importing necessary OpenZeppelin contracts.
// ERC20: Standard interface for Ethereum tokens.
// ERC20Burnable: Allows tokens to be destructively "burned".
// Ownable: Provides basic authorization control functions.
// ERC20Permit: Allows token spending without sending a transaction.
// ReentrancyGuard: Prevents reentrancy attacks.
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// WorkshopToken is an ERC20 token that includes additional functionality:
// - Burnable: allowing token holders to destroy their tokens.
// - Ownable: designates an owner with exclusive privileges.
// - Permit: allows token spending based on signed approvals.
// - ReentrancyGuard: protects against reentrancy attacks in claim functionality.
contract WorkshopToken is
    ERC20,
    ERC20Burnable,
    Ownable,
    ERC20Permit,
    ReentrancyGuard
{
    // Constants are capitalized by convention.
    // USER_CLAIM_LIMIT_BASE defines the base amount a user can claim per day.
    // DAY defines the number of seconds in one day, used for claim intervals.
    uint256 private constant USER_CLAIM_LIMIT_BASE = 10; // Base limit without decimals
    uint256 private constant DAY = 24 * 60 * 60; // Time constants

    // State variables for user claims
    // Mapping to store the last claim time for each user.
    // Mapping to store the total claimed amount for each user within a day.
    mapping(address => uint256) private lastClaimTimes;
    mapping(address => uint256) private claimedAmounts;

    // The constructor initializes the token and sets the initial owner.
    // It also mints an initial supply to the contract itself for claim purposes.
    constructor(
        address initialOwner
    )
        ERC20("workyshoppy", "WSPY")
        Ownable(initialOwner)
        ERC20Permit("workyshoppy")
    {
        _mint(address(this), 200000 * 10 ** decimals());
    }

    // Mint function allows the owner to mint new tokens to a specified address.
    // This is restricted to the owner by the onlyOwner modifier from Ownable.
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount); // Allow unlimited minting by the owner.
    }

    // claimTokens allows users to claim a fixed number of tokens once per day.
    // This function uses nonReentrant modifier to prevent reentrancy attacks.
    function claimTokens() external nonReentrant {
        require(
            block.timestamp >= lastClaimTimes[msg.sender] + DAY ||
                lastClaimTimes[msg.sender] == 0,
            "WorkshopToken: Claim not allowed yet"
        );

        // Resets claim amounts and timestamps after 24 hours have passed.
        if (block.timestamp >= lastClaimTimes[msg.sender] + DAY) {
            claimedAmounts[msg.sender] = 0;
            lastClaimTimes[msg.sender] = block.timestamp;
        }

        uint256 claimAmount = USER_CLAIM_LIMIT_BASE * 10 ** decimals(); // Calculate claim amount with correct token decimals.
        require(
            claimedAmounts[msg.sender] + claimAmount <=
                USER_CLAIM_LIMIT_BASE * 10 ** decimals(),
            "WorkshopToken: Claim limit exceeded for today"
        );

        // Ensures there are enough tokens in the contract before proceeding with the claim.
        require(
            balanceOf(address(this)) >= claimAmount,
            "WorkshopToken: Insufficient tokens in the contract"
        );

        // Update claimed amount and transfer tokens.
        claimedAmounts[msg.sender] += claimAmount;
        _transfer(address(this), msg.sender, claimAmount);
    }
}
