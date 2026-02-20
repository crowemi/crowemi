Plan: Firestore-backed newsletter subscription

1) Install dependency
- Add @google-cloud/firestore.

2) Create config for base64 env
- app/lib/config.ts
- Parse GCP_CONFIG_BASE64 (base64 JSON)
- Extract project_id, client_email, private_key
- Return typed AppConfig for Firestore.

3) Create Firestore helper
- app/lib/firestore.ts
- Singleton Firestore client
- Generic helpers:
  - queryDocuments
  - addDocument
  - getDocument
  - updateDocument
  - deleteDocument

4) Add subscribe API route (server)
- app/lib
- POST handler:
  - Read email from body
  - Sanitize: trim + lowercase
  - Validate with regex
  - Check existing doc by email in collection newsletter_subscribers
  - If exists: return 409
  - Else: add doc with email + subscribedAt

5) Wire Footer client
- app/ui/Footer.tsx
- On submit:
  - POST /api/subscribe
  - Show loading state
  - Show success, already-exists, or error message
  - Reset input on success

6) Environment variable
- Set CONFIG (base64 of JSON service account fields).
