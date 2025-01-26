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
    //--user/avatar functions--
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
        .then(response => response.json())
        
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
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    editAvatarInfo({ avatar }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
      })
    }   

    //--card functions--

    addNewCard() {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: cardName, // cardName should be your card's name variable
          link: cardLink  // cardLink should be your card's link variable
        })
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
    
}
  
export default Api;