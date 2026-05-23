-- EnTCPrep Phase 2: Daily Circuits Setup

-- 1. Rename columns in users table to match snake_case convention
ALTER TABLE public.users RENAME COLUMN streakcount TO current_streak;
ALTER TABLE public.users RENAME COLUMN lastsolveddate TO last_solved_date;

-- 2. Create the daily_circuits table
create table public.daily_circuits (
  id uuid default gen_random_uuid() primary key,
  date date unique not null,
  image_url text not null,
  question_text text not null,
  correct_answer numeric not null,
  tolerance numeric default 0.0,
  unit text,
  explanation text not null,
  created_at timestamp with time zone default now()
);

-- 3. Enable RLS and create policy for daily_circuits
alter table public.daily_circuits enable row level security;

create policy "Daily circuits are viewable by everyone" 
on public.daily_circuits for select 
using (true);

-- 4. Insert a mock daily circuit for today (using CURRENT_DATE)
insert into public.daily_circuits (date, image_url, question_text, correct_answer, tolerance, unit, explanation)
values (
  CURRENT_DATE,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Voltage_divider.svg/440px-Voltage_divider.svg.png',
  'Given a voltage divider with V_in = 12V, R1 = 10kΩ, and R2 = 5kΩ. What is the output voltage V_out across R2?',
  4.0,
  0.1,
  'V',
  'The voltage divider formula is V_out = V_in * (R2 / (R1 + R2)). Plugging in the values: 12V * (5k / 15k) = 12 * (1/3) = 4.0V.'
)
ON CONFLICT (date) DO NOTHING;
