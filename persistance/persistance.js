function Persistace() {
  

  this.getHranaNbdno = (nbdno) => {
    return new Promise((resolve, reject) => {
      // kreirame promise
      $.ajax({
        url:
          "https://api.nal.usda.gov/ndb/V2/reports?ndbno="+nbdno+"&type=f&format=json&api_key=DCcng0oNwC4caZ6TZHgpDENtcUMVxDag8nRFoXDP",
        //link do APIto
        type: "GET",
        success: function(data) {
          //ako uspesno sme dobile response od APIto praime resolve na Promise
          resolve(data);
        },
        error: function(error) {
          reject(error);
        }
      });
    });
  };


  

  this.getSearchHrana = (hrana) => {
    return new Promise((resolve, reject) => {
      // kreirame promise
      $.ajax({
        url:
          "https://api.nal.usda.gov/ndb/search/?format=json&q="+hrana+"&sort=n&max=25&offset=0&api_key=DCcng0oNwC4caZ6TZHgpDENtcUMVxDag8nRFoXDP",
        //link do APIto
        type: "GET",
        success: function(data) {
          //ako uspesno sme dobile response od APIto praime resolve na Promise
          resolve(data);
        },
        error: function(error) {
          reject(error);
        }
      });
    });
  };

}
//var nbdno = list.item[0].nbdno
