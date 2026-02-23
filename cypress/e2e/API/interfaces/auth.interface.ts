export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthErrorResponse {
  errorMessage: string;
}

export type AuthApiResponse = '' | string | AuthErrorResponse;
