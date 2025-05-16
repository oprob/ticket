/*
  # Create matches table with admin-only modifications

  1. New Tables
    - `matches` table for storing sports event information
      - Basic match details (teams, date, location)
      - Sport-specific information
      - Status flags (trending, sold_out)
      - Timestamps

  2. Security
    - Enable RLS on matches table
    - Public read access
    - Admin-only write operations
*/

CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teams text NOT NULL,
  team1 text NOT NULL,
  team2 text NOT NULL,
  team1_logo text NOT NULL,
  team2_logo text NOT NULL,
  date timestamptz NOT NULL,
  time text NOT NULL,
  stadium text NOT NULL,
  location text NOT NULL,
  sport text NOT NULL,
  trending boolean DEFAULT false,
  sold_out boolean DEFAULT false,
  duration text NOT NULL,
  ticket_info text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view matches"
  ON matches
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert matches"
  ON matches
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' IN (
    SELECT email FROM auth.users 
    WHERE raw_user_meta_data->>'isAdmin' = 'true'
  ));

CREATE POLICY "Only admins can update matches"
  ON matches
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (
    SELECT email FROM auth.users 
    WHERE raw_user_meta_data->>'isAdmin' = 'true'
  ))
  WITH CHECK (auth.jwt() ->> 'email' IN (
    SELECT email FROM auth.users 
    WHERE raw_user_meta_data->>'isAdmin' = 'true'
  ));

CREATE POLICY "Only admins can delete matches"
  ON matches
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (
    SELECT email FROM auth.users 
    WHERE raw_user_meta_data->>'isAdmin' = 'true'
  ));