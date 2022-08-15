export default class TweetService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getTweets(username) {
    const headers = await this.getHeaders();
    let query = username ? `?username=${username}` : "";
    return await this.http.fetch(`/tweets${query}`, {
      method: "GET",
      headers: headers,
    });
  }

  async postTweet(text) {
    const headers = this.getHeaders();
    return await this.http.fetch(`/tweets`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        text,
      }),
    });
  }

  async deleteTweet(tweetId) {
    const headers = this.getHeaders();
    return await this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: headers,
    });
  }

  async updateTweet(tweetId, text) {
    const headers = this.getHeaders();
    return await this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({ text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: "Bearer " + token,
    };
  }
}
