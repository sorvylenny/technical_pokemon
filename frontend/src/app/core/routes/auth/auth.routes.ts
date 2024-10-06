import { environment } from "@/environments/environments";

export const AUTH_ROUTES = {
  login: `${environment.api}/auth/login`,
  register: `${environment.api}/auth/register`,
}
