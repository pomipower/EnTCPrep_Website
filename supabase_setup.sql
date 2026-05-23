-- EnTCPrep Supabase SQL Setup

-- 1. Create a public.users table that matches our schema
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  displayName text,
  streakCount integer default 0,
  lastSolvedDate date,
  stats jsonb default '{"totalSolved": 0, "correctAnswers": 0, "topicScores": {"analog": 0, "digital": 0, "signals": 0, "control": 0, "network": 0, "em": 0}}'::jsonb
);

-- 2. Enable Row Level Security (RLS) on public.users
alter table public.users enable row level security;

-- 3. Create RLS policies for public.users
-- Users can read their own profile
create policy "Users can view their own profile" 
on public.users for select 
using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update their own profile" 
on public.users for update 
using (auth.uid() = id);

-- 4. Create a trigger to automatically create a public.users row when a new user signs up
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, displayName)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
