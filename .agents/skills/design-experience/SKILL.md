---
name: design-experience
description: Implement or review UI and UX in the admin-live-chat React application using its existing Tailwind, shadcn/Base UI, responsive, dark-theme, form, table, and feedback patterns. Use for visual changes, new screens or components, layout and responsive behavior, accessibility, forms, filters, dialogs, loading and empty states, or interaction polish in this repository.
---

# Design the experience

## Start from the existing system

1. Inspect the nearest screen and the primitive under `src/components/ui` before designing a new
   pattern.
2. Reuse a domain component from `src/components/<domain>` when behavior is domain-specific. Move a
   component to `src/components/common` only when at least two domains need the same abstraction.
3. Use `cn` from `@/utils` for conditional classes and use Lucide icons already installed.
4. Avoid editing generated-style UI primitives for a one-off screen requirement. Extend them only
   when the change is reusable and preserves existing callers.

## Follow the visual language

- Use Inter, the established `rounded-md`/`--radius: 0.5rem` geometry, and the current density:
  controls are normally `h-10`, compact actions use the existing small or icon sizes.
- Use semantic colors such as `background`, `foreground`, `card`, `muted`, `accent`, `primary`,
  `destructive`, `border`, and their foreground pairs. Do not hardcode a new brand palette.
- Use explicit status colors only when a nearby domain mapping already defines them. Always pair a
  status color with readable text or an icon.
- Support both light and dark themes. Prefer semantic tokens; add `dark:` overrides only when the
  semantic token does not express the intended result.
- Keep typography hierarchy consistent: page titles normally use
  `text-lg md:text-xl font-bold tracking-tight`; supporting text uses `text-xs` and
  `text-muted-foreground`.

## Compose pages consistently

- For standard pages inside `AppLayout`, start from `p-4 h-dvh overflow-y-auto`.
- Use `space-y-4` for the title/action row, filters, results, and pagination.
- Make filter areas responsive with a one-column base and wider breakpoint grids. Keep each control
  full-width, allow Enter to submit text filters, and expose a visible Search action.
- Use the shared `DataTable` and its pagination for tabular server data. Keep horizontal overflow in
  the table container instead of squeezing content into unreadable columns.
- Keep dialogs within the viewport with an appropriate `sm:max-w-*` and `max-h-[90vh] overflow-y-auto`
  for long content.
- Preserve the chat layout's independent scrolling regions and mobile panel behavior. Use
  `useIsMobile` only when behavior or rendered structure must change; use responsive classes for
  purely visual changes.
- Respect safe-area utilities on mobile and avoid fixed elements covering input or navigation.

## Design every interaction state

For each async or data-driven surface, implement the states that apply:

1. Initial loading: use the shared `LoadingSpinner` or `Skeleton` without flashing a false empty
   state.
2. Loaded empty: explain what is absent with domain-specific copy such as `No accounts found`.
3. Error: keep the current screen usable where possible and show concise actionable feedback.
4. Mutation pending: disable the initiating control and use `Button`'s `loading` prop.
5. Success: update/invalidate data, close the completed dialog when appropriate, then show a concise
   toast.
6. Destructive or high-impact action: use `useConfirmModal`, name the affected entity, and use the
   destructive variant.

Do not use toast as the only feedback for a persistent validation error. Put form errors next to the
relevant field.

## Build accessible controls

- Use native interactive elements or existing Radix primitives; do not make a clickable `div`.
- Give icon-only controls an `aria-label` and a tooltip when the icon's meaning is not universal.
- Associate form labels, descriptions, and errors through the shared form primitives.
- Preserve keyboard operation for dialogs, dropdowns, tables, filters, and chat input.
- Provide visible hover, active, disabled, and focus states. Do not remove focus behavior without an
  equivalent visible state.
- Keep touch targets near the established 36–40 px control sizes.
- Do not communicate status or selection through color alone.
- Add meaningful alt text for informative images and empty alt text for decorative images.

## Review before handoff

- Check at narrow mobile, tablet, and desktop widths.
- Check light and dark themes.
- Check long labels, empty data, loading, API error, validation error, and pending mutation.
- Check keyboard-only use and icon-control accessible names.
- Verify that the intended panel owns scrolling and that no content is clipped behind the sidebar,
  mobile sheet, or safe area.
- Run the repository verification commands from `AGENTS.md`.
