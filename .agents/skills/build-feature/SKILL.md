---
name: build-feature
description: Implement or review end-to-end product features in the admin-live-chat React application across domain types, API services, TanStack Query hooks, Zustand stores, validation, components, views, routes, roles, filters, timezone handling, mutations, and Socket.IO updates. Use whenever adding or changing a feature, API integration, route, permission, server or shared state, filtering, pagination, mutation, or realtime behavior in this repository.
---

# Build features

## Map the feature before editing

1. Find the closest existing domain under `src/components`, `src/hooks`, `src/services`,
   `src/stores`, `src/types`, and `src/views`.
2. Trace the current data contract from API response through service, query hook/store, component,
   and route. Confirm role and timezone behavior.
3. List the affected read queries, mutation side effects, URL parameters, realtime events, and user
   states before implementing.
4. Extend the nearest pattern. Do not introduce a new state or data-fetching library.

## Place responsibilities by layer

- `src/types/<domain>.ts`: domain entities, enums, API responses, and payload types.
- `src/types/queries.ts`: typed query/filter contracts shared with services and stores.
- `src/services/<domain>.service.ts`: endpoint paths, HTTP verbs, parameter cleanup, and typed return
  values. Call the shared `apiService`; never call Axios directly from UI code.
- `src/configs/query-keys.ts`: stable keys for every new remote resource.
- `src/hooks/use<Domain>.ts`: TanStack Query reads/mutations, query keys, enablement, cache updates or
  invalidation, and mutation feedback.
- `src/stores/<domain>.ts`: cross-component client state such as filters, pagination, persisted
  preferences, socket state, or deliberate optimistic overlays. Do not copy ordinary server data
  into Zustand.
- `src/utils/validators/<domain>.ts`: Zod schemas and inferred form value types.
- `src/components/<domain>`: domain presentation and interaction.
- `src/views/<domain>`: thin route-level composition.
- `src/routes/index.tsx` and `src/configs/menu.ts`: lazy route registration and matching
  role-aware navigation.

Export a new service or store through its existing barrel file when that directory already uses one.

## Implement remote data deliberately

- Build query keys from `QUERY_KEYS` and every input that changes the result. Avoid keys that hide
  filters inside a mutable object.
- Gate requests with `enabled` when identity, authentication, or a required identifier is missing.
- Add the timezone from `useTimezoneStore` when the endpoint or neighboring domain is
  timezone-aware.
- Clean optional request parameters with `filteredObject` when the API should not receive empty
  strings, `null`, or `undefined`.
- For pagination, keep UI pages one-based at the store/API boundary and convert TanStack Table's
  zero-based `pageIndex` explicitly.
- For infinite queries, derive the next page from the API pagination contract and flatten pages with
  `useMemo`.
- After a mutation, invalidate or update all affected detail, list, count, and dashboard queries.
  Prefer a precise cache update when the response is authoritative and invalidation would cause
  visible churn.
- Use the shared API error shape for user messages and retain a safe fallback message.

## Keep filters and URLs synchronized

- Store TypeScript filter fields in camelCase.
- Use the existing snake_case names in URL search parameters and API payloads where required.
- Hydrate filter state from the URL once, write searches with `replace: true`, and reset the domain
  store when the filter component unmounts.
- Reset the page to 1 when filters or page size change.
- Debounce free-text inputs when they trigger requests while typing. Explicit Search forms may
  update only on submit.
- Preserve URLs that can be copied, refreshed, and reopened without losing the applied filter.

## Enforce authorization consistently

- Derive role checks through `useRole` and `AccountAuthorityEnum`.
- Add route access and `MENU_NAVIGATION_ITEMS.allowedRoles` together.
- Match role-dependent data sources, actions, and fields to the backend contract.
- Do not expose an unauthorized mutation and rely on the API rejection as the normal UX.
- Preserve the customer-support redirect and the existing admin/accounting/live-chat distinctions
  unless the requirement explicitly changes them.

## Handle forms and mutations

- Use React Hook Form and a Zod resolver for non-trivial input.
- Infer form value types from the schema, then map them explicitly to the API payload.
- Reset edit forms when the selected entity or mode changes.
- Disable cancel/submit controls while pending and prevent duplicate submissions.
- Keep success toasts and cache invalidation in the mutation hook when they are reusable across
  callers. Keep navigation/dialog closure in the invoking component.
- Confirm destructive, bulk, reassignment, status-closing, or otherwise high-impact mutations.

## Handle realtime features safely

- Use the existing `SocketProvider`, socket service, domain socket hooks, and Zustand socket fields.
- Register and clean up each listener symmetrically; avoid duplicate listeners after rerenders or
  reconnects.
- Preserve pending/sent/failed message states and retry behavior for chat messages.
- Reconcile optimistic overlays with authoritative socket/API data and clear them after success or
  terminal failure.
- Invalidate every affected list/detail/count after assignment, status, read-state, or message
  events, while avoiding an invalidate loop.
- Keep reconnect and disconnected feedback actionable; never present a failed send as successful.

## Complete the user-facing behavior

- Apply `.agents/skills/design-experience/SKILL.md` for any visible feature work.
- Cover loading, empty, error, success, disabled, and permission-denied states that apply.
- Keep route-level files lazy-loaded and wrapped with the existing error boundary.
- Use domain-specific empty and error copy; avoid exposing raw server or stack-trace text.

## Verify the feature

1. Exercise the happy path and one API failure path.
2. Exercise empty data, loading, pending mutation, refresh/deep link, and relevant role variants.
3. For filters, verify URL hydration, search, clear/reset, page reset, and timezone.
4. For mutations, verify the detail, list, count, and dashboard views that depend on changed data.
5. For socket work, verify reconnect, duplicate-event resistance, optimistic reconciliation, and
   listener cleanup.
6. Run the repository verification commands from `AGENTS.md`.
