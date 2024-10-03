-- Add user_id column to resources table
ALTER TABLE resources
ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Ensure that the user_id column is not null
ALTER TABLE resources
ALTER COLUMN user_id SET NOT NULL;
