export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    let data;
    try {
      data = await res.json();
    } catch (err) {
      console.error(err);
    }
    if (res.statusCode > 299 || res.statusCode < 200) {
      const message = data && data.message ? data.message : "error";
      throw new Error(message);
    }
    return data;
  }
}
