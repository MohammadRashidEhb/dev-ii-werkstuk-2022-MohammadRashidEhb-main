"use strict";

const app = {
  items: [],
  init() {
      //Fetch Data
      this.getData();
      //Filter Data
      this.search();
      //Sort Data
      this.sort();
      //Render stuff
      this.render();

  },
  getData() {
      fetch('https://valorant-api.com/v1/agents')
          .then(
              function (response) {
                  if (response.status !== 200) {
                      console.log('Error ' +
                          response.status);
                      return;
                  }

                  response.json()
                      .then(function (data) {
                          console.log(data.data);
                      });
              }
          )
          .catch(function (err) {
              console.log('Fetch Error :-S', err);
          });

  },
  search() {

  },
  sort() {

  },

  render() {

  }

};
app.init();