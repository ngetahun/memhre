-- Insert user profile data
insert into user_profiles (id, user_id, content, created_at) values
  ('a10ad737-653c-4e72-8846-c2346cf53c81', 'a10ad737-653c-4e72-8846-c2346cf53c81',
  '{
    "name": "Robert Fox",
    "email": "jackson.graham@example.com",
    "phone": "(704) 555-0127",
    "joined": "2023-11-26T00:00:00Z",
    "location": "Sydney, Australia",
    "company": "SaaS Patterns"
  }',
  '2023-11-26T00:00:00Z');

-- Insert resources data
insert into resources (id, title, description, type, content, created_at) values
  (gen_random_uuid(), 'Dark mode date picker', 'Moved for review', 'chat', 'chat-content-1', '2023-06-22T00:00:00Z'),
  (gen_random_uuid(), 'Mesh Gradient Pack', 'Invited Wade Warren', 'file', 'https://example.com/mesh-gradient-pack', '2023-06-21T00:00:00Z'),
  (gen_random_uuid(), 'Lorem Ipsum',
  		'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
		'link',
		'https://example.com/lorem-ipsum',
		'2023-06-20T00:00:00Z');
