/*
  # User Profiles and Achievements Schema

  1. New Tables
    - profiles
      - User profile information and stats
    - achievements
      - User achievements and badges
    - user_achievements
      - Junction table for user-achievement relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) UNIQUE,
  username text NOT NULL UNIQUE,
  avatar_url text,
  total_tournaments integer NOT NULL DEFAULT 0,
  total_winnings numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create user_achievements junction table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  achievement_id uuid NOT NULL REFERENCES achievements(id),
  earned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles: Public read, owner write
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Achievements: Public read
CREATE POLICY "Achievements are viewable by everyone"
  ON achievements FOR SELECT
  TO public
  USING (true);

-- User Achievements: Public read, system write
CREATE POLICY "User achievements are viewable by everyone"
  ON user_achievements FOR SELECT
  TO public
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- Insert default achievements
INSERT INTO achievements (title, description, icon) VALUES
  ('Tournament Victor', 'Won first place in a tournament', 'trophy'),
  ('Rising Star', 'Participated in 10 tournaments', 'star'),
  ('Sharpshooter', 'Achieved 100+ kills in tournaments', 'award'),
  ('Team Leader', 'Led team to victory', 'medal');