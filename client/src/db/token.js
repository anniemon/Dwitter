export default class TokenStorage {
  tokenKey = "TOKEN";

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token) {
    console.log(token);
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    localStorage.clear(this.tokenKey);
  }
}
