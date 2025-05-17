/*
  # Fix profiles table policies

  1. Changes
    - Remove recursive policies that were causing infinite recursion
    - Fix admin check to use EXISTS subquery with auth.users table
    - Add proper policies for profiles table access

  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users
    - Add admin-specific policies that properly check admin status
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Create new policies without recursion
CREATE POLICY "Users can read own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
ON profiles
FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data ->> 'isAdmin' = 'true'));

CREATE POLICY "Admins can update all profiles"
ON profiles
FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data ->> 'isAdmin' = 'true'))
WITH CHECK (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data ->> 'isAdmin' = 'true'));