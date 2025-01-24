class Api {
    constructor( {baseUrl, headers} ) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getAppInfo() {
      return Promise.all([this.getInitialCards(), this.getUserInfo(), this.editUserInfo()])
    }

  
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers, 
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
          })
          .catch(error => {
            console.log('Error fetching data', error);
          });
    }
  
    // create more methods(ie: getUserInfo, etc.) for the api with a diff baseUrl

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
        .then(response => response.json())
        // .then(data => console.log(data)) --- remove this line
        // .catch(error => console.error('Error:', error)); --- remove this line
    }



    editUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'New Name',
          email: 'newemail@example.com'
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
}
  
export default Api;