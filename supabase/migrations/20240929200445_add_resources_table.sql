create table resources (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  type text check (type in ('chat', 'file', 'link')) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc', now())
);
