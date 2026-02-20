Plan: Firestore-backed newsletter subscription

1) Add subscribe API route (server)
- app/lib
- POST handler:
  - Read email from body
  - Sanitize: trim + lowercase
  - Validate with regex
  - Check existing doc by email in collection newsletter_subscribers
  - If exists: return 409
  - Else: add doc with email + subscribedAt

2) Wire Footer client
- app/ui/Footer.tsx
- On submit:
  - POST /api/subscribe
  - Show loading state
  - Show success, already-exists, or error message
  - Reset input on success

3) Environment variable
- Set CONFIG (base64 of JSON service account fields).
