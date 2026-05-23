-- EnTCPrep Phase 5: Community & Monetization Setup

-- 1. Create the reports table
create table public.reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  question_id uuid references public.questions not null,
  issue_type text not null,
  description text,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.reports enable row level security;

-- Policy: Users can insert their own reports
create policy "Users can insert reports" 
on public.reports for insert 
with check (auth.uid() = user_id);


-- 2. Create the suggestions table
create table public.suggestions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  topic text not null,
  question_text text not null,
  options text[] not null,
  correct_answer text not null,
  explanation text not null,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.suggestions enable row level security;

-- Policy: Users can insert their own suggestions
create policy "Users can insert suggestions" 
on public.suggestions for insert 
with check (auth.uid() = user_id);
