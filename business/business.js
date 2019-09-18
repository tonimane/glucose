function BusinessLayer() {
  this.dataObject = new DataLayer();

  this.resolveHrana = async (search) => {
    await this.dataObject.populateSearchResult(search);
    var data = this.dataObject.getSearchResult();
     
     var ndbno = data.list.item[0].ndbno;
    //console.log(ndbno);
     return await this.resolveNbdno(ndbno);
    //pravime logika za da kreirame objekt so podatoci koj sto ni trebaat na nas, za da ne ja predavame celata data od APIto vo presentaion layerot

    
    
  };
  
  this.resolveNbdno = async(nbdno) => {
    await this.dataObject.populateNbdnoResult(nbdno);
    var data = this.dataObject.getnbdnoResult();
    //console.log(data);
    var carbs = data.foods[0].food.nutrients[3].value;
    console.log(carbs);
   return carbs;
    
  }
  

  // this.getAndResolveSearchResult = async (hrana)=>{
  // var searchData =  await this.dataObject.populateSearchResult(hrana); 
  //var keyMatches = [];
  // for(var i = 0 ; i < searchData.results.albummatches.album.length; i++){
  //   keyMatches.push(searchData.results.albummatches.album[i].name);
  // }
  //   var smilarWords = {
  //     keyWords: keyMatches
  //   }

  //   return searchData;
  // }

}
