export type User = {
  uid: string;
  email: string | null;
  displayName?: string | null;
};
export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  setUser: (user: User | null) => void;
  name?: string,
  address?: string,
  phoneno?: string,
};
export type ProfileData = {
  name?: string;
  address?: string;
  phoneno?: string;
}