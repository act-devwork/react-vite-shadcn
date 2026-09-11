# API and security

## API boundaries

- Access backend endpoints only through `src/services/api.service.ts` and a typed domain service.
- Keep authentication headers and global HTTP status handling in the shared API layer.
- Read public runtime configuration through `src/configs/env.ts`.
- Preserve the existing 401 logout/redirect behavior and do not weaken authorization checks to make
  a UI flow pass.

## Input and output safety

- Treat every client value as untrusted. Validate form input and encode URL values.
- Avoid rendering unsanitized HTML. If HTML rendering is unavoidable, document and enforce its
  sanitization boundary.
- Show users concise, actionable errors and preserve a safe fallback message.
- Do not expose stack traces, tokens, raw headers, or sensitive server details in the UI or logs.

## Sensitive data

- Never commit tokens, credentials, private endpoints, real customer data, or copied production
  payloads.
- Do not log customer messages, emails, phone numbers, order details, authentication data, or other
  personally identifiable information for debugging.
- Do not store sensitive data in query parameters, local storage, or persisted Zustand state unless
  the existing product contract explicitly requires it and the security impact is understood.
