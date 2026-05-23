# EnTCPrep Platform

The ultimate web-based practice platform for Electronics and Telecommunication (EnTC) students to master fundamentals, prepare for competitive exams (GATE, ESE), and ace technical interviews.

## 🚀 Phase 1 Completion
Phase 1 is complete! The foundational application shell has been scaffolded, integrating Next.js App Router, Tailwind CSS, shadcn/ui, and Supabase Authentication.

### Setup Instructions
1. Open `.env.local` and replace the placeholder values with your actual Supabase URL and Anon Key.
2. Run the SQL script found in `supabase_setup.sql` in your Supabase SQL Editor to create the `users` table, link it to Auth via triggers, and enable Row Level Security (RLS).
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

### Project Structure
- `src/app`: Contains Next.js routes, including protected routes under `(app)` wrapped in the AppShell layout.
- `src/components/layout`: Contains responsive shell components like `Sidebar`, `BottomNav`, and `AdPlaceholder`.
- `src/utils/supabase`: Contains browser, server, and middleware clients for Supabase Auth.
- `supabase_setup.sql`: Database schema definition and RLS configuration.
