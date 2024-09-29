create table user_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  content jsonb not null,
  created_at timestamp with time zone default timezone('utc', now())
);
