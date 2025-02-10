class Api {
    constructor( {baseUrl, headers} ) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getAppInfo() {
      return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }


    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
        })
          .then(this.checkResponse)

    }

    // create more methods(ie: getUserInfo, etc.) for the api with a diff baseUrl
    //--user/avatar functions--

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this.checkResponse)
    }

    editUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about,
        })
      })
      .then(this.checkResponse)
    }

    editAvatarInfo( avatarInput ) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(avatarInput)
    })
      .then(this.checkResponse)
    }
    //--card functions--

    addNewCard({cardName, cardLink}) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: cardName, // cardName should be your card's name variable
          link: cardLink  // cardLink should be your card's link variable
        })
      })
        .then(this.checkResponse)
    }

    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this.checkResponse)
    }

    //---Likes and unlikes--

    likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this.checkResponse)
    }

    unLikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this.checkResponse)
    }
    //--Checking response--
    checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  }

export default Api;