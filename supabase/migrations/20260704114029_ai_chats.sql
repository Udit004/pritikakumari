-- Create the ai_chats table
CREATE TABLE ai_chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL
);

-- Turn on Row Level Security (RLS)
ALTER TABLE ai_chats ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to insert rows (since the AI chat is public)
CREATE POLICY "Allow public inserts for AI chats" ON ai_chats
  FOR INSERT
  WITH CHECK (true);
