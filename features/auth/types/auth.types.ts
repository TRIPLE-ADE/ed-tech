export interface AppwriteError extends Error {
  message: string;
  code: number;
  type: string;
  version: string;
}

type AuthCredentials = {
  email: string;
  password: string;
};

export interface CreateUserRequest extends AuthCredentials {
  name: string;
}

export type LoginUserRequest = AuthCredentials;

export type AuthLoadingKey =
  | "initial"
  | "login"
  | "register"
  | "logout"
  | "googleOAuth";
