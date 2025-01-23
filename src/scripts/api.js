// scrpits/api.js

class Api {
    constructor(options) {
      
    }
  
    getInitialCards() {
        return fetch("https://around-api.en.tripleten-services.com/v1", {
          headers: {
            authorization: "5b40f66f-c611-4855-8659-c2085a4f3c96"
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
          });
    }
  
    // other methods for working with the API
}
  
export default Api;