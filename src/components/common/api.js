const rootUrl = 'http://192.168.1.153:8080/api/v1';

module.exports = {
  authenticate: function(params){
    let ep = `${rootUrl}/authenticate`;

    return fetch(ep, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then((response) => {
      return response.json();
    });
  },

  registration: function(params){
    let ep = `${rootUrl}/registration`;

    return fetch(ep, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then((response) => {
      return response.json();
    });
  }
}
