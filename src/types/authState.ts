type authState = {
  hasInitialized: boolean;
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
};
export type { authState };
