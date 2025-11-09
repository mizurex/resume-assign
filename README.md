## Resume App

An interactive resume built with React + Vite + Tailwind, featuring search, skill filters and expandable sections.

### Demo


https://github.com/user-attachments/assets/44426546-f710-45cd-93a2-07824ab68da2




### Setup

Prerequisites:
- Bun 1.1+ (preferred), or Node.js 18+

Install dependencies:

```bash
bun install
# or
npm install
# or
pnpm install
```

Run the dev server:

```bash
npm run dev
# or
bun run dev
```

Build and preview production:

```bash
npm run build
npm run preview
# or with Bun
bun run build
bun run preview
```

Lint:

```bash
npm run lint
# or
bun run lint
```


### Hardcoded credentials

- Email: `testuser@gmail.com`
- Password: `1234`



### Known trade-offs

- Auth is purely client-side: credentials are hardcoded and stored in memory; session uses `sessionStorage`. Not secure for production
- Email validation is minimal (regex for `@gmail.com`); no stronger schema validation
- No persistence of UI state (expanded panels, filters, search) across refreshes
- No unit/E2E tests yet


### Future inhancements

- Replace fake auth with a proper backend (OAuth or password flow), hashed storage, and protected API routes
- Add form/schema validation with Zod or Yup; show inline errors with accessible announcements
- Persist UI state (filters, search, expanded ids) via URL params or localStorage
- Extract UI primitives (Badge, Button, Disclosure) to reusable components


### Files

- `src/pages/login.tsx`: login form with Gmail-only validation and redirect on success
- `src/pages/resume.tsx`: resume UI
- `src/data/resume.json`: sample data



