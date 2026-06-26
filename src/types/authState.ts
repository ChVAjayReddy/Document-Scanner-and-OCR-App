type User = {
  sub: string; // Unique identifier for the user
  name?: string; // Full name
  givenName?: string; // First name
  familyName?: string; // Last name
  nickname?: string; // Nickname or username
  picture?: string; // URL to the profile picture
  email?: string; // Email address
  emailVerified?: boolean; // Status of email verification
  updatedAt?: string; // Last profile update timestamp
  [key: string]: any;
};
type authState = {
  hasInitialized: boolean;
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  userDetails: User | null;
};

export type { authState };
