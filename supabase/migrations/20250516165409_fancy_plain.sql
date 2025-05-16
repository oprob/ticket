/*
  # Create matches table

  1. New Tables
    - `matches`
      - `id` (uuid, primary key)
      - `teams` (text)
      - `team1` (text)
      - `team2` (text)
      - `team1_logo` (text)
      - `team2_logo` (text)
      - `date` (timestamptz)
      - `time` (text)
      - `stadium` (text)
      - `location` (text)
      - `sport` (text)
      - `trending` (boolean)
      - `sold_out` (boolean)
      - `duration` (text)
      - `ticket_info` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `matches` table
    - Add policies for:
      - Authenticated users can read all matches
      - Only admin users can insert/update/delete matches
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
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM auth.users WHERE auth.users.raw_user_meta_data->>'isAdmin' = 'true'));

CREATE POLICY "Only admins can update matches"
  ON matches
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM auth.users WHERE auth.users.raw_user_meta_data->>'isAdmin' = 'true'));

CREATE POLICY "Only admins can delete matches"
  ON matches
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM auth.users WHERE auth.users.raw_user_meta_data->>'isAdmin' = 'true'));