export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  size?: number;
}

export interface SimpleStats {
  username: string;
  name: string;
  avatar: string;
  repos: number;
  stars: number;
  forks: number;
  followers: number;
  following: number;
  languages: Array<{ name: string; count: number }>;
  accountAge: number;
}

export interface StatsOptions {
  username?: string;
  theme?: string;
  showBorder?: boolean;
  language?: "pt" | "en";
  avatar?: string;
  useCustomAvatar?: boolean;
}

export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  cardBg: string;
}
