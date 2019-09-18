function DataLayer() {
  
  this.nbdnoResult = {};
  this.searchResult = {};
  this.persistanceObject = new Persistace();

  


  this.populateSearchResult = async (hrana) => {
    this.searchResult = await this.persistanceObject.getSearchHrana(hrana);
    
    return this.searchResult;
  }
  this.getSearchResult = () => {    
    return this.searchResult;
  };

this.populateNbdnoResult = async (nbdno) => {
 this.nbdnoResult = await this.persistanceObject.getHranaNbdno(nbdno);
 return this.nbdnoResult;
}
this.getnbdnoResult = ()=> {
 return this.nbdnoResult;
}


}
