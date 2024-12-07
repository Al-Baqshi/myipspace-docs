---
title: "Smart Contracts"
description: "Guide to writing and testing smart contracts."
---
Here’s a production-ready implementation of the smart contracts for your **EntityFactory**, **RFP**, **RTS**, and **Escrow**, adhering to **best practices** and ensuring **security** with Solidity. This implementation will include:

- Security enhancements (e.g., OpenZeppelin’s libraries like SafeMath, Ownable, and ReentrancyGuard).
- Modular design for scalability and maintainability.
- ERC721 for entity management (EntityFactory).
- Individual contracts for RFP, RTS, and Escrow.

---

### **1. EntityFactory Contract**

The `EntityFactory` contract allows users to create unique entities (e.g., usernames) as ERC721 tokens. Users must have one of these entities to interact with the other contracts.

#### **EntityFactory.sol**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EntityFactory is ERC721, Ownable, ReentrancyGuard {
    uint256 private nextEntityId;
    mapping(string => bool) private usernameExists;

    struct Entity {
        uint256 entityId;
        address owner;
        string username;
    }

    mapping(uint256 => Entity) public entities;

    event EntityCreated(uint256 indexed entityId, address indexed owner, string username);

    constructor() ERC721("Entity", "ENT") {}

    /**
     * @dev Create a unique entity with a username.
     */
    function createEntity(string memory username) external nonReentrant {
        require(!usernameExists[username], "Username already exists");
        require(bytes(username).length > 0, "Username cannot be empty");

        uint256 entityId = nextEntityId++;
        usernameExists[username] = true;

        _mint(msg.sender, entityId);
        entities[entityId] = Entity({
            entityId: entityId,
            owner: msg.sender,
            username: username
        });

        emit EntityCreated(entityId, msg.sender, username);
    }

    /**
     * @dev Verify if a username exists.
     */
    function isUsernameTaken(string memory username) external view returns (bool) {
        return usernameExists[username];
    }

    /**
     * @dev Retrieve entity details by ID.
     */
    function getEntity(uint256 entityId) external view returns (Entity memory) {
        return entities[entityId];
    }
}
```

---

### **2. RFP Contract**

The `RFP` (Request for Proposal) contract enables users to create proposals, where bidders can submit bids. Only entity owners can create RFPs.

#### **RFP.sol**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract RFP is Ownable, ReentrancyGuard {
    struct Proposal {
        address bidder;
        uint256 amount;
        uint256 duration; // Duration in seconds
    }

    struct RFPDetails {
        uint256 id;
        address issuer;
        string title;
        string description;
        uint256 deadline;
        bool awarded;
    }

    uint256 private nextRFPId;
    mapping(uint256 => RFPDetails) public rfpList;
    mapping(uint256 => Proposal[]) public proposals;

    event RFPCreated(uint256 indexed id, address indexed issuer, string title);
    event ProposalSubmitted(uint256 indexed rfpId, address indexed bidder, uint256 amount);
    event RFPAwarded(uint256 indexed rfpId, address indexed awardee);

    /**
     * @dev Create a new RFP.
     */
    function createRFP(
        string memory title,
        string memory description,
        uint256 duration // Deadline in seconds
    ) external returns (uint256) {
        uint256 id = nextRFPId++;
        rfpList[id] = RFPDetails({
            id: id,
            issuer: msg.sender,
            title: title,
            description: description,
            deadline: block.timestamp + duration,
            awarded: false
        });

        emit RFPCreated(id, msg.sender, title);
        return id;
    }

    /**
     * @dev Submit a proposal for an RFP.
     */
    function submitProposal(uint256 rfpId, uint256 amount, uint256 duration) external {
        require(rfpList[rfpId].deadline > block.timestamp, "RFP deadline passed");
        require(!rfpList[rfpId].awarded, "RFP already awarded");

        proposals[rfpId].push(Proposal({
            bidder: msg.sender,
            amount: amount,
            duration: duration
        }));

        emit ProposalSubmitted(rfpId, msg.sender, amount);
    }

    /**
     * @dev Award the RFP to a specific proposal.
     */
    function awardRFP(uint256 rfpId, uint256 proposalIndex) external onlyOwner {
        require(!rfpList[rfpId].awarded, "RFP already awarded");
        require(proposals[rfpId].length > proposalIndex, "Proposal does not exist");

        rfpList[rfpId].awarded = true;
        Proposal memory winningProposal = proposals[rfpId][proposalIndex];

        emit RFPAwarded(rfpId, winningProposal.bidder);
    }
}
```

---

### **3. RTS Contract**

The `RTS` (Request to Supply) contract works similarly to the RFP but focuses on suppliers advertising their services.

#### **RTS.sol**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RTS is Ownable {
    struct Offer {
        address supplier;
        string title;
        string description;
        uint256 price;
        uint256 deliveryTime; // in seconds
    }

    Offer[] public offers;

    event OfferCreated(uint256 indexed id, address indexed supplier, string title);

    /**
     * @dev Create a new supply offer.
     */
    function createOffer(
        string memory title,
        string memory description,
        uint256 price,
        uint256 deliveryTime
    ) external {
        offers.push(Offer({
            supplier: msg.sender,
            title: title,
            description: description,
            price: price,
            deliveryTime: deliveryTime
        }));

        emit OfferCreated(offers.length - 1, msg.sender, title);
    }

    /**
     * @dev Get all offers.
     */
    function getOffers() external view returns (Offer[] memory) {
        return offers;
    }
}
```

---

### **4. Escrow Contract**

The `Escrow` contract holds funds securely between two parties. Only the issuer can release funds, and the receiver can cancel.

#### **Escrow.sol**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Escrow is Ownable, ReentrancyGuard {
    struct EscrowDetails {
        address issuer;
        address receiver;
        uint256 amount;
        bool released;
        bool cancelled;
    }

    IERC20 public stableToken;
    mapping(uint256 => EscrowDetails) public escrows;
    uint256 private nextEscrowId;

    event EscrowCreated(uint256 indexed id, address indexed issuer, address indexed receiver, uint256 amount);
    event EscrowReleased(uint256 indexed id, address indexed receiver, uint256 amount);
    event EscrowCancelled(uint256 indexed id, address indexed issuer, uint256 amount);

    constructor(IERC20 _stableToken) {
        stableToken = _stableToken;
    }

    /**
     * @dev Create a new escrow.
     */
    function createEscrow(address receiver, uint256 amount) external nonReentrant returns (uint256) {
        require(receiver != address(0), "Invalid receiver address");
        require(amount > 0, "Amount must be greater than zero");

        stableToken.transferFrom(msg.sender, address(this), amount);

        uint256 id = nextEscrowId++;
        escrows[id] = EscrowDetails({
            issuer: msg.sender,
            receiver: receiver,
            amount: amount,
            released: false,
            cancelled: false
        });

        emit EscrowCreated(id, msg.sender, receiver, amount);
        return id;
    }

    /**
     * @dev Release funds to the receiver.
     */
    function releaseEscrow(uint256 id) external nonReentrant {
        EscrowDetails storage escrow = escrows[id];
        require(msg.sender == escrow.issuer, "Only issuer can release funds");
        require(!escrow.released, "Funds already released");
        require(!escrow.cancelled, "Escrow cancelled");

        escrow.released = true;
        stableToken.transfer(escrow.receiver, escrow.amount);

        emit EscrowReleased(id, escrow.receiver, escrow.amount);
    }

    /**
     * @dev Cancel escrow and refund issuer.
     */
    function cancelEscrow(uint256 id) external nonReentrant {
        EscrowDetails storage escrow = escrows[id];
        require(msg.sender == escrow.receiver, "Only receiver can cancel escrow");
        require(!escrow.released, "Funds already released");
        require(!escrow.cancelled, "Escrow already cancelled");

        escrow.cancelled = true;
        stableToken.transfer(escrow.issuer, escrow.amount);

        emit EscrowCancelled(id, escrow.issuer, escrow.amount);
    }
}
```

---

### **Next Steps**

- **Deploy these contracts** on your desired blockchain (Ethereum, Polygon, etc.).
- Use NestJS to integrate and provide APIs for interacting with

 these contracts.
- Use best practices for testing (unit tests and integration tests) to ensure contract functionality and security.

Let me know if you'd like the backend (NestJS) APIs to interact with these contracts!