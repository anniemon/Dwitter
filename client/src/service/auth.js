export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.fetch(`/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    });
    await this.tokenStorage.setToken(data.token);
    return data;
  }

  async login(username, password) {
    const data = await this.http.fetch(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    await this.tokenStorage.setToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    return await this.http.fetch(`/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    await this.tokenStorage.removeToken();
  }
}
