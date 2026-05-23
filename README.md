# EnTCPrep Platform

The ultimate web-based practice platform for Electronics and Telecommunication (EnTC) students to master fundamentals, prepare for competitive exams (GATE, ESE), and ace technical interviews.

## 🚀 Phase 1 Completion
Phase 1 is complete! The foundational application shell has been scaffolded, integrating Next.js App Router, Tailwind CSS, shadcn/ui, and Supabase Authentication.

## ⚡ Phase 2 Completion: The Daily Circuit
Phase 2 is complete! The Daily Circuit feature allows users to solve a daily EnTC puzzle.
- Server-side securely validates answers with tolerance ranges.
- Users are granted 3 attempts to solve the puzzle.
- Correct answers increment their gamified streak (`current_streak`) in the database.
- Detailed explanations are revealed upon success or failure.

### Setup Instructions
1. Open `.env.local` and replace the placeholder values with your actual Supabase URL and Anon Key.
2. Run the SQL script found in `supabase_setup.sql` in your Supabase SQL Editor.
3. Run the SQL script found in `supabase_phase2.sql` in your Supabase SQL Editor to apply Phase 2 schemas.
4. Install dependencies: `npm install`
5. Run the development server: `npm run dev`

### Project Structure
- `src/app`: Contains Next.js routes. The `/daily` route handles the daily puzzle UI.
- `src/components/layout`: Contains responsive shell components.
- `src/utils/supabase`: Contains Supabase Auth clients.
- `supabase_setup.sql`: Base Phase 1 database schema.
- `supabase_phase2.sql`: Phase 2 database updates (Daily Circuits).
