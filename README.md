## Resume App

An interactive resume built with React + Vite + Tailwind, featuring search, skill filters, expandable sections, and a simple protected route for the resume page.


### Setup

Prerequisites:
- Node.js 18+ (recommended 20+)

Install dependencies:

```bash
npm install
# or
pnpm install
# or (if you use Bun)
bun install
```

Run the dev server:

```bash
npm run dev
# then open the printed local URL (usually http://localhost:5173)
```

Build and preview production:

```bash
npm run build
npm run preview
```


### Hardcoded credentials

- Email: `testuser@gmail.com`
- Password: `1234`

Notes:
- The login requires a Gmail address format. Only `@gmail.com` emails pass client-side validation.
- On successful login, `sessionStorage.isAuthed = "true"` is set (the app also accepts `isAuth`).
- The resume route (`/resume`) is protected; if not authed, it navigates back to `/`.


### Tech stack & key decisions

- React 19 + TypeScript
- React Router 7 for routing and a small `Protected` wrapper
- Vite 7 for dev/build, with `@vitejs/plugin-react`
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Utilities drive the lightweight theme (zinc/gray neutrals, subtle borders, accessible focus rings)
- `lucide-react` for icons (e.g., chevrons, search, close)
- Data stored in `src/data/resume.json` (no backend). This keeps the app simple and easy to edit

UI/UX decisions:
- Expand/collapse implemented with a Set of expanded ids for both Experience and Projects. Buttons receive `aria-expanded` and `aria-controls` for accessibility. Chevron icons rotate on expand
- Search and skill filters are memoized (`useMemo`) for snappy interactions
- Print-friendly styles so the resume looks good when exported as PDF
- Simple, subtle theme colors reused across components for consistency


### Known trade-offs

- Auth is purely client-side: credentials are hardcoded and stored in memory; session uses `sessionStorage`. Not secure for production
- Email validation is minimal (regex for `@gmail.com`); no stronger schema validation
- No persistence of UI state (expanded panels, filters, search) across refreshes
- No unit/E2E tests yet
- Accessibility is good for the expand/collapse controls, but broader auditing (labels, roles, tab order, color contrast in all states) can be expanded


### If I had more time

- Replace fake auth with a proper backend (OAuth or password flow), hashed storage, and protected API routes
- Add form/schema validation with Zod or Yup; show inline errors with accessible announcements
- Persist UI state (filters, search, expanded ids) via URL params or localStorage
- Extract UI primitives (Badge, Button, Disclosure) to reusable components
- Improve theming with CSS variables and add dark mode
- Add unit tests (Vitest/RTL) and E2E tests (Cypress/Playwright)
- Performance polish: virtualize very long lists and defer non-critical work
- CI setup (lint, typecheck, tests) with PR checks


### Project structure (high level)

- `src/App.tsx`: routes and the `Protected` wrapper
- `src/pages/login.tsx`: login form with Gmail-only validation and redirect on success
- `src/pages/resume.tsx`: resume UI (search, filters, experience and projects with expand/collapse, education)
- `src/components/skills-badge.tsx`: compact badge component
- `src/data/resume.json`: resume content (name, title, contact, skills, experience, projects, education)
- `vite.config.ts`: Vite + React + Tailwind plugin setup


### How to change credentials (for quick demos)

- Update the check in `src/pages/login.tsx`:
  - Change the allowed email and/or the regex if you want to allow non-Gmail emails
  - Change the password comparison accordingly


