# React and data architecture

## TypeScript and components

- Keep TypeScript strict. Model API entities, responses, payloads, component props, and hook options
  explicitly; prefer `unknown` plus narrowing over introducing new `any`.
- Do not use `@ts-ignore`, non-null assertions, or unsafe casts to bypass a contract unless the
  invariant is proven and documented next to the exception.
- Use function components and hooks. Keep route-level views thin and move reusable behavior into
  hooks or domain components.
- Keep component state minimal. Derive values during render when possible instead of synchronizing
  duplicate state through an effect.
- Use `useMemo` and `useCallback` only when they prevent meaningful recomputation, stabilize a
  dependency/interface, or match an established performance-sensitive pattern.
- Split a component when it mixes several independent responsibilities or becomes difficult to
  review, but avoid one-use wrapper components that add no behavior or clarity.

## Effects and collections

- Include complete effect dependencies even though the ESLint rule is currently disabled.
- Give every subscription, event listener, timer, socket handler, and async lifecycle symmetric
  cleanup.
- Never mutate React state, Zustand state collections, query-cache data, props, or API responses in
  place. Create a new object, array, `Map`, or `Set` when state changes.
- Use stable domain identifiers for rendered list keys. Do not use the array index when items can
  be inserted, removed, reordered, filtered, or updated.

## Remote and client state

- Treat TanStack Query as the source of truth for remote data.
- Use Zustand only for client state shared across components, persisted preferences,
  filters/pagination, socket state, and optimistic overlays that cannot live cleanly in the query
  cache.
- Include every value that changes a request in its query key, including filters, identifiers,
  pagination where applicable, role-dependent request selection, and timezone.
- Use the configured timezone helpers/store for API queries and date presentation; do not assume the
  browser timezone is the business timezone.

## Filters, forms, and layout

- Keep URL search parameters shareable. Map snake_case URL/API fields to the camelCase TypeScript
  model at the boundary.
- Use React Hook Form with Zod for non-trivial forms. Show field-level validation and prevent repeat
  submissions while a mutation is pending.
- Keep route permissions and sidebar visibility aligned. UI hiding is not a substitute for the
  route guard or backend authorization.
- Preserve the full-viewport shell: `body` does not scroll. Each page or panel must own its intended
  scroll container and must not introduce nested accidental page scrolling.
