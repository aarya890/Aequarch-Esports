/*
  # Tournament Platform Schema

  1. New Tables
    - tournaments
      - Core tournament information and configuration
    - matches
      - Individual matches within tournaments
    - teams
      - Team registration and management
    - players
      - Individual player profiles and stats
    - wallets
      - User wallet management
    - transactions
      - Financial transaction tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Secure financial transactions
*/

-- Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  game text NOT NULL CHECK (game IN ('BGMI', 'FREE_FIRE')),
  format text NOT NULL CHECK (format IN ('SOLO', 'DUO', 'SQUAD')),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  prize_pool numeric NOT NULL DEFAULT 0,
  entry_fee numeric NOT NULL DEFAULT 0,
  max_teams integer NOT NULL,
  registered_teams integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'UPCOMING' CHECK (status IN ('UPCOMING', 'ONGOING', 'COMPLETED')),
  rules jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid NOT NULL REFERENCES tournaments(id),
  round integer NOT NULL,
  start_time timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'LIVE', 'COMPLETED')),
  results jsonb DEFAULT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid NOT NULL REFERENCES tournaments(id),
  name text NOT NULL,
  total_points integer NOT NULL DEFAULT 0,
  rank integer DEFAULT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL REFERENCES teams(id),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  username text NOT NULL,
  game_id text NOT NULL,
  role text NOT NULL DEFAULT 'MEMBER' CHECK (role IN ('CAPTAIN', 'MEMBER')),
  stats jsonb NOT NULL DEFAULT '{
    "kills": 0,
    "deaths": 0,
    "assists": 0,
    "matches_played": 0,
    "wins": 0
  }',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) UNIQUE,
  balance numeric NOT NULL DEFAULT 0,
  kyc_status text NOT NULL DEFAULT 'PENDING' CHECK (kyc_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid NOT NULL REFERENCES wallets(id),
  amount numeric NOT NULL,
  type text NOT NULL CHECK (type IN ('DEPOSIT', 'WITHDRAWAL', 'ENTRY_FEE', 'PRIZE')),
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED')),
  timestamp timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Tournaments: Anyone can view, only admins can modify
CREATE POLICY "Tournaments are viewable by everyone"
  ON tournaments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can modify tournaments"
  ON tournaments
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Matches: Anyone can view, only admins can modify
CREATE POLICY "Matches are viewable by everyone"
  ON matches FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can modify matches"
  ON matches
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Teams: Anyone can view, team members can modify their team
CREATE POLICY "Teams are viewable by everyone"
  ON teams FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Team members can modify their team"
  ON teams
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM players
      WHERE players.team_id = teams.id
      AND players.user_id = auth.uid()
    )
  );

-- Players: Anyone can view, players can modify their own data
CREATE POLICY "Players are viewable by everyone"
  ON players FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Players can modify their own data"
  ON players
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Wallets: Users can only view and modify their own wallet
CREATE POLICY "Users can view their own wallet"
  ON wallets FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can modify their own wallet"
  ON wallets
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Transactions: Users can only view their own transactions
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM wallets
      WHERE wallets.id = transactions.wallet_id
      AND wallets.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments(status);
CREATE INDEX IF NOT EXISTS idx_matches_tournament_id ON matches(tournament_id);
CREATE INDEX IF NOT EXISTS idx_teams_tournament_id ON teams(tournament_id);
CREATE INDEX IF NOT EXISTS idx_players_team_id ON players(team_id);
CREATE INDEX IF NOT EXISTS idx_players_user_id ON players(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_wallet_id ON transactions(wallet_id);