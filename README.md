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

## 📚 Phase 3 Completion: The Practice Engine
Phase 3 is complete! The interactive Practice Engine allows users to take topic-wise mock tests.
- A responsive grid layout allows topic selection.
- The server securely fetches and shuffles a pool of topic-specific questions, selecting 5 at random.
- The highly interactive Client UI provides instant feedback (coloring correct/incorrect options).
- Explanations fade in immediately upon answering.
- Final scores are tallied and presented in a sleek completion screen.

## 📊 Phase 4 Completion: User Dashboard
Phase 4 is complete! The User Dashboard (`/dashboard`) provides a highly visual overview of the user's progress.
- Built strictly with Next.js Server Components for instantaneous, zero-loading-spinner performance.
- Pulls live data (`current_streak`, `stats`) securely from Supabase via `@supabase/ssr`.
- Visually emphasizes gamification using an orange-themed 'Current Streak' flame card.
- Dynamically calculates user accuracy and visualizes Topic Mastery using sleek Tailwind progress bars.

### Setup Instructions
1. Open `.env.local` and replace the placeholder values with your actual Supabase URL and Anon Key.
2. Run the SQL scripts in order in your Supabase SQL Editor:
   - `supabase_setup.sql` (Base Auth schema & users table)
   - `supabase_phase2.sql` (Daily Circuits schema)
   - `supabase_phase3.sql` (Practice Engine schema & mock questions)
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
