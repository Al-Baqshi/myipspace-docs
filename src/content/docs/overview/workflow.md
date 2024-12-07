---
title: Work flow 
description: A work flow guid for muy ip space 
---
### **Stage 1: Hybrid Approach Workflow - User Onboarding and Core Features**

This stage focuses on a streamlined user experience, assuming all contracts (entities, escrows) are pre-deployed and fully tested. Users interact only with pre-deployed contracts via a simple interface, ensuring a **plug-and-play experience**.

---

### **1. Workflow Overview**

Here’s a clear table outlining the **on-chain** and **off-chain** components of the platform. This breakdown highlights where each workflow or data component resides, making it easy for developers to identify responsibilities and design the system efficiently.

---

### **On-Chain vs. Off-Chain Components**

| **Component**           | **On-Chain**                                                                 | **Off-Chain**                                                                                       |
|--------------------------|------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **Entities**             | - Entity NFTs: Unique identifiers for users or organizations.               | - Entity metadata beyond basic identifiers (e.g., descriptions, large files).                      |
|                          | - Ownership and roles (e.g., Admin, Viewer).                                | - User-uploaded logos, additional details.                                                         |
|                          | - Parent-child relationships for sub-entities.                             |                                                                                                     |
| **RFPs (Request for Proposal)** | - Minimal metadata: Entity link, status (`Open`, `Closed`, etc.).           | - RFP details (e.g., title, scope, budget, deadlines).                                             |
|                          | - IPFS hash or data hash for file integrity verification.                   | - Uploaded proposal documents, technical specs, or attachments.                                    |
| **RTSs (Request to Sign)**| - Minimal metadata: Entity link, status (`Draft`, `Under Review`).          | - RTS details (e.g., terms, pricing, delivery conditions).                                          |
|                          | - IPFS hash or data hash for file integrity verification.                   | - Supplier responses, uploaded agreements.                                                         |
| **Escrows**              | - Smart contracts: Handle fund locking, milestone tracking, and releases.   | - Supporting documents for milestone approvals or deliverables.                                     |
|                          | - Escrow metadata: Linked RFP/RTS references, milestones.                  | - Notifications and alerts for milestones and payment statuses.                                    |
| **Storage System**       | - Metadata linking NFTs to off-chain storage (e.g., storage plan).          | - Files uploaded by users, including RFP/RTS documents and entity data.                            |
| **User Identity**        | - Decentralized Identifier (DID) stored as part of the entity NFT.          | - KYC/KYB data stored securely in a cloud environment (encrypted).                                 |
| **Analytics**            | - Basic logs for key on-chain events (e.g., NFT creation, escrow updates).  | - Detailed insights processed off-chain (e.g., RFP response rates, supplier activity).             |
| **AI Tools**             | - None.                                                                     | - AI-generated templates and recommendations (e.g., RFP structures, scoring systems).              |
| **Payments**             | - Payment transactions executed through smart contracts.                   | - Payment receipts or summaries stored for reporting purposes.                                     |
| **Governance**           | - DAO governance tokens and voting mechanisms.                             | - Discussion forums or proposal drafts stored off-chain.                                           |

---
Got it! Let’s revise the **user stories** to make them more aligned with this updated functionality and provide a **smooth and straightforward workflow**. 

---

### **Updated User Stories for MyIPSpace**

---

#### **1. Creating an Entity: On-Chain or Off-Chain**
**Scenario**: A user wants to create a new entity and decide whether it operates on-chain or off-chain, with customized options for on-chain entities.

**User Story**:  
- **As a user**,  
- **I want** to create an entity and choose whether it will operate on-chain or off-chain,  
- **So that** I can tailor the entity’s setup to my specific needs and preferences.  

**Acceptance Criteria**:
1. **Entity Creation Flow**:
   - Users can select between "On-Chain" or "Off-Chain" when creating an entity.
   - For on-chain entities:
     - Users select the blockchain network (e.g., Solana, Ethereum, Stellar).
     - Users specify the stable token for transactions (e.g., USDC, DAI).
     - The system deploys a bundle of smart contracts for:
       - RFPs (Demand)
       - RTSs (Supply)
       - Escrow management
       - Entity and sub-entity management
     - On-chain entities are assigned Decentralized Identifiers (DIDs) for security.
   - For off-chain entities:
     - Users can add metadata, documents, and KYC/KYB tags, which are stored securely.
2. Users can set verification tags (e.g., KYC, KYB) for entities to ensure compliance and security.
3. Sub-entities can be created under a parent entity, with inheritance of on-chain or off-chain designation.

**Benefits**:
- Provides flexibility and customization for different workflows.
- Ensures security and scalability with smart contract bundles for on-chain entities.
- Allows hierarchical organization with sub-entities for complex structures.

---

#### **2. Managing RFPs (Demand) within an Entity**
**Scenario**: A user wants to create and manage RFPs (Demand) within their entity, ensuring seamless procurement workflows.

**User Story**:  
- **As a user**,  
- **I want** to issue RFPs (Demand) tied to an entity,  
- **So that** I can request services or products in a transparent and structured manner.  

**Acceptance Criteria**:
1. Users can create RFPs (Demand) directly within an entity.
2. For on-chain entities:
   - RFP details (e.g., title, scope, budget) are stored on-chain in the entity's smart contract.
   - Responses are linked to the on-chain record, ensuring transparency.
3. For off-chain entities:
   - RFP details and responses are stored securely off-chain.
4. The platform notifies relevant users or suppliers about the RFP.
5. Users can track responses, evaluate proposals, and select suppliers via a dashboard.

**Benefits**:
- Simplifies procurement with structured and transparent workflows.
- Enhances trust with immutable records for on-chain entities.

---

#### **3. Managing RTSs (Supply) within an Entity**
**Scenario**: A user wants to post and manage RTSs (Supply) within their entity, enabling efficient sales workflows.

**User Story**:  
- **As a user**,  
- **I want** to issue RTSs (Supply) tied to an entity,  
- **So that** I can offer my services or products to potential buyers.  

**Acceptance Criteria**:
1. Users can create RTSs (Supply) directly within an entity.
2. For on-chain entities:
   - RTS details (e.g., description, pricing, delivery terms) are stored on-chain in the entity's smart contract.
   - Buyers’ responses and agreements are securely recorded on-chain.
3. For off-chain entities:
   - RTS details and buyer interactions are stored off-chain but can be tied to entity metadata.
4. AI assistance provides pricing recommendations and optimizations based on entity data.
5. The platform provides analytics for RTS performance (e.g., views, responses).

**Benefits**:
- Enables efficient sales workflows with structured offer management.
- Optimizes user offers using AI-driven insights and recommendations.

---

#### **4. Escrow System for Secure Transactions**
**Scenario**: A user wants to ensure secure transactions tied to RFPs (Demand) and RTSs (Supply) within an entity.

**User Story**:  
- **As a user**,  
- **I want** to use the escrow system for secure payments tied to RFPs and RTSs,  
- **So that** funds are only released when agreed-upon conditions are met.  

**Acceptance Criteria**:
1. Users can initiate escrow agreements tied to RFPs (Demand) and RTSs (Supply).
2. For on-chain entities:
   - The escrow is managed via a smart contract on the chosen blockchain network.
   - Milestone-based payment releases are supported.
3. For off-chain entities:
   - Escrow agreements are managed off-chain but securely linked to entity metadata.
4. Notifications keep all parties updated on escrow status changes.
5. AI tracks escrow progress and provides alerts for potential delays.

**Benefits**:
- Increases trust between buyers and sellers.
- Provides a secure and transparent payment system.

---

#### **5. Sub-Entities and Verification Tags**
**Scenario**: A user wants to create sub-entities and assign KYC/KYB tags for secure and hierarchical management.

**User Story**:  
- **As a user**,  
- **I want** to create sub-entities under a parent entity,  
- **So that** I can manage complex workflows in a hierarchical structure.  

**Acceptance Criteria**:
1. Users can create sub-entities under a parent entity, inheriting the parent’s on-chain or off-chain designation.
2. Each sub-entity can:
   - Operate independently with its own RFPs (Demand), RTSs (Supply), and escrow agreements.
   - Have unique KYC/KYB verification tags.
3. Verification tags ensure secure and compliant operations for each sub-entity.

**Benefits**:
- Supports complex organizational structures with hierarchical workflows.
- Ensures security and compliance through verification tags.

---

#### **6. Comprehensive Dashboard for Workflow Management**
**Scenario**: A user wants a centralized view of all their entities, tasks, and workflows.

**User Story**:  
- **As a user**,  
- **I want** a dashboard summarizing all my entities, RFPs (Demand), RTSs (Supply), and reminders,  
- **So that** I can manage everything efficiently from one place.  

**Acceptance Criteria**:
1. The dashboard provides:
   - A summary of all active entities, including sub-entities.
   - Metrics like pending RFPs, active RTSs, and escrow statuses.
   - Notifications for deadlines, tasks, and milestones.
2. Users can perform quick actions, such as:
   - Creating new entities, RFPs (Demand), or RTSs (Supply).
   - Reviewing and updating workflows.
3. AI provides contextual insights and recommendations.

**Benefits**:
- Consolidates all workflows in a single interface.
- Improves decision-making with real-time metrics and insights.

---

These revised user stories ensure a **smooth and intuitive workflow**, reflecting the platform’s flexibility to operate both on-chain and off-chain. The inclusion of **custom smart contracts**, **hierarchical sub-entities**, and **verification tags** adds scalability and security for both individual and enterprise users. Let me know if there’s anything to expand or refine further!