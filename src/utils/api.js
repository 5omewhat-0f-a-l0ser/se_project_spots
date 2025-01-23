class Api {
    constructor( {baseUrl, headers} ) {
      this._baseUrl = baseUrl;
      this._headers = headers;
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
  
    // other methods for working with the API
}
  
export default Api;