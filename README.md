# Dialog / دیالوگ MVP

Dialog is a bilingual MVP for a smart acting platform. It combines a professional actor directory, AI-style acting education, rehearsal partner requests, casting calls, supportive speech exercises, and parent-supervised children practice.

Persian (`fa`, RTL) is treated as the primary market language, while English (`en`, LTR) is fully supported from day one.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Server Components and small client components for mock interactions
- `lucide-react` icons
- Structured mock data layer prepared for Supabase replacement

## Run Locally

```bash
npm install
npm run dev
```

Open:

- Persian: `http://localhost:3000/fa`
- English: `http://localhost:3000/en`

Useful checks:

```bash
npm run lint
npm run build
```

## Main Features

- Public landing page, login, and register flows
- Mock dashboard with profile summary, learning progress, casting calls, practice requests, speech exercise, and quick module access
- Actor profile form and professional actor directory with search and filters
- Actor detail pages with resume, skills, portfolio, availability, and contact preference
- Acting education with teacher agents, lesson paths, locked/in-progress/completed states, XP, streak placeholder, and mock feedback
- Mock AI practice chat for teacher agents
- Practice partner request list, create flow, detail page, and mocked interest action
- Casting call list, create flow, detail page, and mocked resume submission
- Supportive speech exercises with a clear non-medical warning
- Parent-supervised children practice with no open-ended AI chat
- Mock admin dashboard with metrics, reported content placeholders, and activity feed

## Bilingual And RTL Architecture

- Localized routes live under `/fa/...` and `/en/...`.
- `src/proxy.ts` redirects unlocalized paths to `/fa`.
- `src/app/[lang]/layout.tsx` sets `lang` and `dir` on the document.
- Supported locales are defined in `src/i18n/config.ts`.
- UI copy is stored in `src/i18n/messages.ts`.
- Route helpers live in `src/i18n/route-context.ts`.
- Components receive dictionaries instead of hardcoding visible UI text.

## Mock Data Structure

- Domain types: `src/lib/types.ts`
- Mock records: `src/lib/mock-data.ts`
- Query helpers: `src/lib/mock-services.ts`
- Mock AI behavior: `src/lib/mock-ai.ts`

The mock layer includes users, profiles, actor skills, portfolio items, teacher agents, lessons, lesson progress, practice requests, casting calls, speech exercises, child exercises, and admin stats.

## Future Supabase Integration Plan

- Add Supabase Auth for login, registration, and session management.
- Map `UserRole` to role-based access control policies.
- Create database tables from the TypeScript interfaces in `src/lib/types.ts`.
- Store actor portfolio media in Supabase Storage.
- Replace `src/lib/mock-services.ts` with server-side Supabase queries.
- Add admin moderation tables for reports, audit logs, and content review states.

## Future AI-Agent Integration Plan

- Replace `src/lib/mock-ai.ts` with an LLM service adapter.
- Keep teacher-agent metadata in the database, but keep safety copy in the product UI.
- Add retrieval over public acting-method notes and lesson content.
- Add response moderation, prompt logging, rate limiting, and human escalation.
- Keep children practice closed-ended; do not add open-ended child chat.

## Safety And Ethics

- Teacher agents are clearly presented as educational reconstructions, not real historical people.
- AI feedback is marked as fallible and not a substitute for a human acting coach.
- Speech support is not medical treatment or a replacement for speech therapy.
- Children practice requires parent or caregiver supervision.
- Casting copy includes fairness guidance and a moderation/reporting placeholder.

## Known Limitations

- Authentication, persistence, uploads, moderation, and AI responses are mocked.
- Forms do not save to a database.
- Search and filters run only on local mock data.
- Dates and activity feeds are sample records.

## Next Development Steps

1. Connect Supabase Auth and protected app routes.
2. Create database migrations from `src/lib/types.ts`.
3. Replace mock services with typed server data access functions.
4. Add file upload and portfolio storage.
5. Add moderation workflows and admin review actions.
6. Integrate a guarded LLM adapter for adult education chat.
7. Add automated tests for i18n routing, filters, and role-based flows.
