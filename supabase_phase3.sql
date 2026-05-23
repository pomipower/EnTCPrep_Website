-- EnTCPrep Phase 3: Practice Engine Setup

-- 1. Create the questions table
create table public.questions (
  id uuid default gen_random_uuid() primary key,
  topic text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard', 'gate')),
  question_text text not null,
  options text[] not null,
  correct_answer text not null,
  explanation text not null,
  created_at timestamp with time zone default now()
);

-- 2. Enable RLS and create policy
alter table public.questions enable row level security;

create policy "Questions are viewable by everyone" 
on public.questions for select 
using (true);

-- 3. Insert mock data for "analog-electronics"
insert into public.questions (topic, difficulty, question_text, options, correct_answer, explanation) values
('analog-electronics', 'easy', 'Which diode is used as a voltage regulator?', ARRAY['Zener Diode', 'Tunnel Diode', 'Schottky Diode', 'LED'], 'Zener Diode', 'A Zener diode is heavily doped and operates in the breakdown region, maintaining a constant voltage, making it ideal for voltage regulation.'),
('analog-electronics', 'medium', 'In a BJT, the base region is:', ARRAY['Heavily doped and thick', 'Lightly doped and thin', 'Moderately doped and thin', 'Heavily doped and thin'], 'Lightly doped and thin', 'The base of a BJT is made very thin and lightly doped so that most of the injected carriers pass through it to the collector without recombining.'),
('analog-electronics', 'hard', 'For an ideal op-app, the input impedance and output impedance respectively are:', ARRAY['Zero, Infinity', 'Infinity, Infinity', 'Infinity, Zero', 'Zero, Zero'], 'Infinity, Zero', 'An ideal operational amplifier has infinite input impedance (drawing no current) and zero output impedance (able to supply any amount of current).'),
('analog-electronics', 'medium', 'Which configuration of BJT provides high voltage and current gain?', ARRAY['Common Base', 'Common Emitter', 'Common Collector', 'None of the above'], 'Common Emitter', 'The Common Emitter (CE) configuration is the most widely used because it provides both voltage and current gain, resulting in high power gain.'),
('analog-electronics', 'easy', 'The ripple factor of a full-wave rectifier is approximately:', ARRAY['1.21', '0.48', '0.812', '1.11'], '0.48', 'The ripple factor (γ) for a full-wave rectifier is derived mathematically as √( (Irms/Idc)^2 - 1 ) ≈ 0.482.');

-- 4. Insert mock data for "digital-logic"
insert into public.questions (topic, difficulty, question_text, options, correct_answer, explanation) values
('digital-logic', 'easy', 'Which logic gate is known as the universal gate?', ARRAY['AND', 'OR', 'NAND', 'XOR'], 'NAND', 'NAND and NOR gates are universal gates because any boolean function can be implemented using only NAND or only NOR gates.'),
('digital-logic', 'medium', 'De Morgan''s first theorem states that (A + B)'' is equal to:', ARRAY['A'' + B''', 'A'' . B''', 'A . B', 'A + B'], 'A'' . B''', 'De Morgan''s theorem states that the complement of a sum of variables is equal to the product of the complements of the variables.'),
('digital-logic', 'hard', 'How many flip-flops are required to construct a MOD-10 counter?', ARRAY['2', '3', '4', '5'], '4', 'To count up to N states, we need n flip-flops such that 2^n >= N. For MOD-10, 2^3 = 8 is not enough, so we need 2^4 = 16, which requires 4 flip-flops.'),
('digital-logic', 'medium', 'A multiplexer with 4 select lines can have how many data inputs?', ARRAY['4', '8', '16', '32'], '16', 'In an n-to-2^n multiplexer, the number of select lines (n) determines the data inputs. Here n=4, so 2^4 = 16 inputs.'),
('digital-logic', 'easy', 'In Boolean algebra, A + A.B is equivalent to:', ARRAY['A', 'B', 'A + B', '1'], 'A', 'By absorption law: A + AB = A(1 + B). Since 1 + B = 1, it simplifies to A(1) = A.');
