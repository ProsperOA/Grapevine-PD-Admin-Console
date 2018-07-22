const AUTH_TOKEN_NAME = 'grapevinepd_auth_token';

const authTokenService = {
  store: (token: string): void => localStorage.setItem(AUTH_TOKEN_NAME, token),
  retrieve: (): string | null => localStorage.getItem(AUTH_TOKEN_NAME),
  remove: (): void => localStorage.removeItem(AUTH_TOKEN_NAME)
};

export default authTokenService;