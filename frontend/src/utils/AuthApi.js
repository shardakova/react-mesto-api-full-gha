export default class AuthApi {
  constructor ({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo () {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  signIn ({ email, password }) {
    return this._request(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    });
  }

  signUp ({ email, password }) {
    return this._request(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    });
  }

  _request (url, options) {
    return fetch(url, {
      mode: 'cors',
      credentials: 'include',
      ...options
    }).then(this._checkServerResponse);
  }

  _checkServerResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}
