export interface Tournament {
  id: string;
  title: string;
  game: 'BGMI' | 'FREE_FIRE';
  format: 'SOLO' | 'DUO' | 'SQUAD';
  startDate: string;
  endDate: string;
  prizePool: number;
  entryFee: number;
  maxTeams: number;
  registeredTeams: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
  rules: string[];
  schedule: Match[];
}

export interface Match {
  id: string;
  tournamentId: string;
  round: number;
  teams: Team[];
  startTime: string;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED';
  results?: MatchResult[];
}

export interface Team {
  id: string;
  name: string;
  members: Player[];
  totalPoints: number;
  rank?: number;
}

export interface Player {
  id: string;
  username: string;
  gameId: string;
  role: 'CAPTAIN' | 'MEMBER';
  stats: PlayerStats;
}

export interface PlayerStats {
  kills: number;
  deaths: number;
  assists: number;
  matchesPlayed: number;
  wins: number;
}

export interface MatchResult {
  teamId: string;
  position: number;
  kills: number;
  points: number;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  transactions: Transaction[];
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'ENTRY_FEE' | 'PRIZE';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  timestamp: string;
}