---
title: "Smart Contracts"
description: "Guide to writing and testing smart contracts."
---
Here is a **complete set of instructions** to develop, test, and deploy the system, including Solidity contracts and a NestJS backend. This guide assumes you're building a smart contract as a service (SCaaS) system for users to deploy and interact with contracts such as **EntityFactory**, **RFP**, **RTS**, and **Escrow**.

---

## **Part 1: Solidity Smart Contracts**

The first part involves developing and deploying smart contracts to an EVM-compatible blockchain (e.g., Ethereum, Polygon).

---

### **Step 1: Install Required Tools**

1. Install **Node.js** (v16 or later) and **npm**:
   ```bash
   sudo apt install nodejs npm
   node -v
   npm -v
   ```

2. Install **Hardhat** globally:
   ```bash
   npm install --save-dev hardhat
   ```

3. Install required dependencies for Solidity development:
   ```bash
   npm install @openzeppelin/contracts dotenv hardhat-ethers ethers
   ```

4. Install **MetaMask** on your browser and set it up for your testnet (e.g., Polygon Mumbai).

---

### **Step 2: Directory Structure for Contracts**

```plaintext
contracts/
├── EntityFactory.sol       # Handles unique usernames (ERC721 tokens)
├── RFP.sol                 # Request for Proposal (RFP) logic
├── RTS.sol                 # Request to Supply (RTS) logic
├── Escrow.sol              # Escrow system for secure payments
hardhat.config.js           # Hardhat configuration
scripts/
├── deploy.js               # Deployment script for all contracts
.env                        # Environment variables for private key and RPC URL
```

---

### **Step 3: Write the Contracts**

Copy the code provided for the contracts (EntityFactory, RFP, RTS, and Escrow) into the `contracts/` directory.

- Use **OpenZeppelin contracts** for security.
- Use **SafeMath** and **ReentrancyGuard** where applicable.

---

### **Step 4: Hardhat Configuration**

**hardhat.config.js**
```javascript
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.POLYGON_MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

---

### **Step 5: Environment Variables**

Create a `.env` file with your configuration:
```plaintext
POLYGON_MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
PRIVATE_KEY=your-wallet-private-key
```

---

### **Step 6: Deployment Script**

**scripts/deploy.js**
```javascript
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const EntityFactory = await ethers.getContractFactory("EntityFactory");
  const entityFactory = await EntityFactory.deploy();
  console.log("EntityFactory deployed to:", entityFactory.address);

  const RFP = await ethers.getContractFactory("RFP");
  const rfp = await RFP.deploy();
  console.log("RFP deployed to:", rfp.address);

  const RTS = await ethers.getContractFactory("RTS");
  const rts = await RTS.deploy();
  console.log("RTS deployed to:", rts.address);

  const Escrow = await ethers.getContractFactory("Escrow");
  const stableTokenAddress = "0xYourStableTokenAddress"; // Replace with your stable token
  const escrow = await Escrow.deploy(stableTokenAddress);
  console.log("Escrow deployed to:", escrow.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

---

### **Step 7: Deploy Contracts**

1. Compile the contracts:
   ```bash
   npx hardhat compile
   ```

2. Deploy to the testnet (e.g., Polygon Mumbai):
   ```bash
   npx hardhat run scripts/deploy.js --network mumbai
   ```

3. Save the deployed contract addresses. You’ll need them for the backend.

---

## **Part 2: Backend with NestJS**

Now, we will build a **NestJS backend** to interact with the deployed contracts.

---

### **Step 1: Set Up the Backend**

1. Install the NestJS CLI:
   ```bash
   npm install -g @nestjs/cli
   ```

2. Create a new project:
   ```bash
   nest new bitregalo-backend
   ```

3. Install required dependencies:
   ```bash
   npm install ethers dotenv
   ```

4. Set up `.env` file:
   ```plaintext
   POLYGON_MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
   PRIVATE_KEY=your-wallet-private-key
   ENTITY_FACTORY_ADDRESS=0xYourEntityFactoryAddress
   RFP_ADDRESS=0xYourRFPAddress
   RTS_ADDRESS=0xYourRTSAddress
   ESCROW_ADDRESS=0xYourEscrowAddress
   ```

---

### **Step 2: Directory Structure**

```plaintext
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   ├── entities/
│   │   ├── entities.controller.ts
│   │   ├── entities.service.ts
│   │   ├── entities.module.ts
│   ├── rfp/
│   │   ├── rfp.controller.ts
│   │   ├── rfp.service.ts
│   │   ├── rfp.module.ts
│   ├── rts/
│   │   ├── rts.controller.ts
│   │   ├── rts.service.ts
│   │   ├── rts.module.ts
│   ├── escrow/
│   │   ├── escrow.controller.ts
│   │   ├── escrow.service.ts
│   │   ├── escrow.module.ts
```

---

### **Step 3: Create the Blockchain Service**

**blockchain.service.ts**
```typescript
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contracts: Record<string, ethers.Contract>;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_MUMBAI_RPC_URL);
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);

    const entityFactoryAbi = require('../abis/EntityFactory.json');
    const rfpAbi = require('../abis/RFP.json');
    const rtsAbi = require('../abis/RTS.json');
    const escrowAbi = require('../abis/Escrow.json');

    this.contracts = {
      entityFactory: new ethers.Contract(process.env.ENTITY_FACTORY_ADDRESS, entityFactoryAbi, this.wallet),
      rfp: new ethers.Contract(process.env.RFP_ADDRESS, rfpAbi, this.wallet),
      rts: new ethers.Contract(process.env.RTS_ADDRESS, rtsAbi, this.wallet),
      escrow: new ethers.Contract(process.env.ESCROW_ADDRESS, escrowAbi, this.wallet),
    };
  }

  async createEntity(username: string): Promise<any> {
    const tx = await this.contracts.entityFactory.createEntity(username);
    return tx.wait();
  }

  async createRFP(title: string, description: string, duration: number): Promise<any> {
    const tx = await this.contracts.rfp.createRFP(title, description, duration);
    return tx.wait();
  }

  // Add similar methods for RTS and Escrow
}
```

---

### **Step 4: Create Modules**

- Each module (e.g., Entities, RFP, RTS, Escrow) will have its controller, service, and routes.
- Use the `BlockchainService` to interact with the smart contracts.

---

### **Step 5: Testing**

- Write unit tests for each service and controller.
- Use Postman or Swagger to test the API endpoints.

---

This setup ensures **scalability**, **security**, and **production readiness**, while adhering to the **Smart Contract as a Service (SCaaS)** model. Let me know if you want detailed controllers or testing scripts!