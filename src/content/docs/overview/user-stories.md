---
title: User Stories
description: Short version.
---
### **User Stories for MyIPSpace**

Here is the updated and clarified set of **user stories** incorporating your specifications. This version aligns with the MyIPSpace functionality, emphasizing the relationship between **RFP (Demand)**, **RTS (Display)**, **AI Notes**, **Chat Module**, and **Entity Management**.

---

### **1. Main Entity and Sub-Entities as Workspaces**































#### **Scenario**: Organizing workspaces for users and entities.

- **User Story**:
  - **As a user**,  
  - **I want** my main workspace (main entity) to represent my organization or personal space,  
  - **So that** I can manage all projects, tasks, and documents efficiently.

- **Acceptance Criteria**:
  - The **main entity** (workspace) is represented as an NFT with metadata:
    - Owner’s wallet address.
    - KYC (for individuals) or KYB (for organizations).
    - Linked sub-entities (spaces) for structured organization.
  - Sub-entities (spaces) inherit roles and permissions but can be customized.
  - Users can:
    - Create RFPs, RTSs, escrows, and documents within entities or sub-entities.
    - Store files or link AI Notes to specific entities or sub-entities.

---

### **2. RFP (Demand) Management**

#### **Scenario**: Creating and managing Requests for Proposals (RFPs).

- **User Story**:
  - **As a user**,  
  - **I want** to create RFPs (Demand) tied to an entity or sub-entity,  
  - **So that** I can request services or products transparently and efficiently.

- **Acceptance Criteria**:
  - Users can create RFPs with:
    - Title, scope, budget, deadlines, and attached documents.
    - Linked entity or sub-entity reference.
  - On-chain:
    - Minimal metadata is stored (e.g., linked entity, status).
    - Status changes (e.g., `Open`, `Awarded`, `Closed`) are logged immutably.
  - Off-chain:
    - Full details (e.g., proposal documents) are securely stored.
  - Notifications alert users about responses or deadlines.
  - AI suggestions help with:
    - RFP templates.
    - Milestone creation for linked escrows.

---

### **3. RTS (Display) Management**

#### **Scenario**: Posting Requests to Supply (RTSs).

- **User Story**:
  - **As a user**,  
  - **I want** to create RTSs (Display) tied to an entity or sub-entity,  
  - **So that** I can showcase my services or products to potential buyers.

- **Acceptance Criteria**:
  - Users can post RTSs with:
    - Terms, pricing, delivery conditions, and attached documents.
    - Linked entity or sub-entity reference.
  - On-chain:
    - Metadata includes entity reference and status (e.g., `Draft`, `Under Review`).
  - Off-chain:
    - Full RTS details (e.g., images, descriptions, or agreements).
  - Buyers can:
    - Respond to RTSs.
    - Negotiate terms securely.

---

### **4. Escrow Module**

#### **Scenario**: Securing financial transactions with milestones.

- **User Story**:
  - **As a user**,  
  - **I want** to create escrow contracts tied to RFPs or RTSs,  
  - **So that** payments are secure and milestone-based.

- **Acceptance Criteria**:
  - Escrows link to RFPs or RTSs for traceability.
  - Users define:
    - Milestones, payment amounts, and conditions for fund release.
  - Notifications update users about:
    - Milestone progress.
    - Fund release status.

---

### **5. AI Notes and Reminders**

#### **Scenario**: Using AI for notes, insights, and reminders.

- **User Story**:
  - **As a user**,  
  - **I want** to interact with AI for generating notes or setting reminders,  
  - **So that** I can organize my tasks and workflows efficiently.

- **Acceptance Criteria**:
  - AI Notes can be linked to:
    - Entities or sub-entities for contextual relevance.
  - Users can:
    - Generate actionable insights or reminders (e.g., "Remind me about this in 7 days").
    - Set reminders tied to deadlines or milestones.
  - AI capabilities include:
    - Suggestions for RFP/RTS templates.
    - Workflow optimizations.
  - Notifications remind users of AI-generated events.

---

### **6. Chat Module**

#### **Scenario**: Real-time communication between users.

- **User Story**:
  - **As a user**,  
  - **I want** to chat with other users securely and link conversations to entities or workflows,  
  - **So that** I can collaborate effectively.

- **Acceptance Criteria**:
  - Users can initiate chats linked to:
    - Entities, sub-entities, RFPs, RTSs, or escrows.
  - Messages are encrypted and searchable.
  - Notifications alert users to new messages.
  - Features include:
    - File sharing within chats.
    - Group chats for team discussions.

---

### **7. Document and Storage Management**

#### **Scenario**: Storing and managing documents in entities or sub-entities.

- **User Story**:
  - **As a user**,  
  - **I want** to store and organize documents within my workspace or sub-entities,  
  - **So that** I can access and manage files efficiently.

- **Acceptance Criteria**:
  - Users can:
    - Upload documents tied to entities or sub-entities.
    - Categorize files (e.g., RFPs, RTSs, general documentation).
  - Storage tiers include:
    - Default free tier (e.g., 5GB).
    - Paid upgrades for additional storage.

---

### **8. KYC/KYB Integration**

#### **Scenario**: Verifying identity for security and compliance.

- **User Story**:
  - **As a user**,  
  - **I want** to complete KYC (Know Your Customer) or KYB (Know Your Business) verification for my entity,  
  - **So that** I can ensure compliance and secure access.

- **Acceptance Criteria**:
  - KYC/KYB data is securely stored off-chain.
  - Users can upload required documents (e.g., government ID, business registration).
  - Verified entities display KYC/KYB tags in their metadata.

---

### **9. Notifications and Alerts**

#### **Scenario**: Staying informed about tasks and workflows.

- **User Story**:
  - **As a user**,  
  - **I want** to receive notifications for key actions and reminders,  
  - **So that** I can stay updated on deadlines and status changes.

- **Acceptance Criteria**:
  - Notifications include:
    - RFP/RTS status updates.
    - Escrow milestone progress.
    - AI-generated reminders.
  - Users can configure:
    - Notification preferences (e.g., email, app alerts).

---

### **Integration Summary**

| Feature           | Key Functionality                                                                                   |
|--------------------|----------------------------------------------------------------------------------------------------|
| **Main Entity**    | Represents the workspace (NFT-based) with metadata, roles, and linked sub-entities.                |
| **Sub-Entities**   | Spaces within the workspace for organizing RFPs, RTSs, and files.                                  |
| **RFP**            | Demand-based requests for services or products.                                                    |
| **RTS**            | Display-based offers for services or products.                                                     |
| **Escrow**         | Secure financial transactions tied to RFPs or RTSs.                                                |
| **AI Notes**       | AI-powered insights, reminders, and templates tied to entities or workflows.                       |
| **Chat Module**    | Secure, real-time communication linked to workflows or entities.                                   |
| **KYC/KYB**        | Verification of personal or business identity for compliance.                                      |
| **Storage**        | File and document management linked to entities or sub-entities.                                   |

---

This updated version integrates your specifications, providing a comprehensive set of user stories. Let me know if you need further refinements or additional features!