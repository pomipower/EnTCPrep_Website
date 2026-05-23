# EnTCPrep Platform

The ultimate web-based practice platform for Electronics and Telecommunication (EnTC) students to master fundamentals, prepare for competitive exams (GATE, ESE), and ace technical interviews.

## 🚀 Phase 1 Completion
Phase 1 is complete! The foundational application shell has been scaffolded, integrating Next.js App Router, Tailwind CSS, shadcn/ui, and Supabase Authentication.

## ⚡ Phase 2 Completion: The Daily Circuit
Phase 2 is complete! The Daily Circuit feature allows users to solve a daily EnTC puzzle.
- Server-side securely validates answers with tolerance ranges.
- Users are granted 3 attempts to solve the puzzle.
- Gamified streak increments correctly.

## 📚 Phase 3 Completion: The Practice Engine
Phase 3 is complete! The interactive Practice Engine allows users to take topic-wise mock tests.
- Topic grid layout.
- Securely fetches 5 random questions.
- Instant, heavily animated client feedback.

## 📊 Phase 4 Completion: User Dashboard
Phase 4 is complete! The User Dashboard (`/dashboard`) provides a highly visual overview of the user's progress.
- Built strictly with Next.js Server Components.
- Pulls live data (`current_streak`, `stats`).
- Visual progress bars for topic mastery tracking.

## 🤝 Phase 5 Completion: Community & Monetization
Phase 5 is complete! The platform is now ready for crowdsourcing and monetization.
- **Reporting System**: Integrated a `Flag` icon into the Quiz Engine that opens a sleek Modal to report errors directly to the `reports` Supabase table.
- **Contribute Page**: A fully fledged form allowing users to submit new EnTC questions to the `suggestions` table for admin review.
- **Monetization**: Deployed `<AdPlaceholder />` globally in the AppShell Layout and locally within the Practice UI grid.

### Setup Instructions
1. Open `.env.local` and replace the placeholder values.
2. Run the SQL scripts in order in your Supabase SQL Editor:
   - `supabase_setup.sql` (Base Auth schema)
   - `supabase_phase2.sql` (Daily Circuits schema)
   - `supabase_phase3.sql` (Practice Engine schema)
   - `supabase_phase5.sql` (Reports & Suggestions schema)
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
