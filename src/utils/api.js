class Api {
    constructor( {baseUrl, headers} ) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getAppInfo() {
      return Promise.all([this.getInitialCards()])
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
  
    // create more methods(ie: getUserInfo, etc.) for the api with a diff baseUrrrrrrrl
}
  
export default Api;