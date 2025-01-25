class Api {
    constructor( {baseUrl, headers} ) {
      this._baseUrl = baseUrl;
      this._headers = headers;
      this.userName = profileName;
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
        
    }



    editUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.userName,
          email: this.userEmail;
        })
      })
        .then(response => response.json())
        //.then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
}
  
export default Api;