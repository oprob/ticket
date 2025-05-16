/*
  # Add users table policies

  1. Security
    - Enable RLS on auth.users table
    - Add policies for users to read and update their own data
    - Add policy for admins to read all users
*/

-- Enable RLS on auth.users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
CREATE POLICY "Users can read own data"
  ON auth.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update own data"
  ON auth.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow admins to read all users
CREATE POLICY "Admins can read all users"
  ON auth.users
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      SELECT email FROM auth.users 
      WHERE raw_user_meta_data->>'isAdmin' = 'true'
    )
  );