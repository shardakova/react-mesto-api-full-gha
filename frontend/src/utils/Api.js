export default class Api {
  constructor ({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo () {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }

  getInitialCards () {
    return this._request(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    });
  }

  setUserInfo ({ name, about }) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    });
  }

  addCard ({ name, link }) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    });
  }

  deleteCard (cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  setLike (cardId, isDelete) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: isDelete ? 'DELETE' : 'PUT',
      headers: this._headers
    });
  }

  updateAvatar (avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
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
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }
}
