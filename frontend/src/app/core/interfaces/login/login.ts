export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
export interface User {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  fullName: string;
}
