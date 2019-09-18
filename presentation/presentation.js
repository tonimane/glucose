function Presentation() {
  this.business = new BusinessLayer();
  var body = $("body")
  var wrapper = $("<div>").css({
    width: "70%",
    margin: "0 auto",
    background:"url('512x512bb.jpg')",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
    backgroundPosition:"center"
    
  })
  body.append(wrapper);
  var div1 = $("<div>").addClass("div1").css({
    width: "75%",
    margin: "0 auto 25"
  });
  var div2 = $("<div>").addClass("div2").css({
    width: "75%",
    margin: "0 auto 25"
  });
  var div3 = $("<div>").addClass("div2").css({
    width: "75%",
    margin: "0 auto 25"
  });
  var div4 = $("<div>").addClass("div2").css({
    width: "75%",
    margin: "0 auto 25"
  });
  
  
  wrapper.append(div1);
  wrapper.append(div2);
  wrapper.append(div3);
  wrapper.append(div4);

  this.glikemija = () => {

    this.glikemijaVrednosti = [];
    
    
    
    var input1 = $("<input type = text ; placeholder = prosek-glikemija >").css({
      width: "200px",
      height: "40px",
      border: "2px solid black",
      color: "black"
    });
    var button1 = $("<button>").addClass("button1").text("prosek").css({
      width: "100px",
      height: "37px",
      border: "2px solid black",
      color: "white",
      backgroundColor:"blue",
      marginLeft:"10px"
    });
    var input2 = $("<input type = text ; placeholder = HBA1C >").css({
      width: "200px",
      height: "40px",
      border: "2px solid black",
      color: "black"
    });
    var button2 = $("<button>").addClass("button1").text("HBA1C").css({
      width: "100px",
      height: "37px",
      border: "2px solid black",
      color: "white",
      backgroundColor:"blue",
      marginLeft:"10px"
    });
    var input3 = $("<input type = text ; placeholder = vnesi-glikemija >").css({
      width: "200px",
      height: "40px",
      border: "2px solid black",
      color: "black"
    });
    var button3 = $("<button>").addClass("button1").text("vnesi").css({
      width: "100px",
      height: "37px",
      border: "2px solid black",
      color: "white",
      backgroundColor:"blue",
      marginLeft:"10px"
    });
    div1.append(input1);
    div1.append(button1);
    
    div2.append(input2);
    div2.append(button2);

    div3.append(input3);
    div3.append(button3);
    
    button3.on("click", () => {
      let vrednost = input3.val();
      input3.val("");

      if (isNaN(vrednost) || vrednost.length == 0) {
        alert("brojka")
      }
      else {
        const vreme = new Date();
        const vremeNaMerenje = vreme.toLocaleString();
        this.glikemijaVrednosti.push({
          vrednost: vrednost,
          vreme: vremeNaMerenje
        });
        //console.log(vremeNaMerenje);

        localStorage.setItem("vrednost", JSON.stringify(this.glikemijaVrednosti));
      }
      // console.log(this.glikemijaVrednosti)

      var odLocalStorage = JSON.parse(localStorage.getItem("vrednost"));
      //console.log(odLocalStorage);
      var suma = 0;
      for (let i = 0; i < odLocalStorage.length; i++) {
        var vrednosti = parseFloat(odLocalStorage[i].vrednost)
        suma += vrednosti;

      }
      button1.on("click", () => {
        input1.val(prosek);
      })
      console.log(suma);
      var prosek = suma / odLocalStorage.length;
      //console.log(prosek);
      var hba1cCalc = 2.59 + prosek;
      //console.log(hba1cCalc)
      var hba1c = hba1cCalc/1.59;
     // console.log(hba1c);
      button2.on("click", () => {
        input2.val(hba1c);
      })

      var times = [];
      var values = [];
      //console.log(odLocalStorage);
      for (let i = 0; i < odLocalStorage.length; i++) {
        values.push(odLocalStorage[i].vrednost).toString();
        times.push(odLocalStorage[i].vreme.toString());
      }
      localStorage.setItem("time", JSON.stringify(times));
      localStorage.setItem("value", JSON.stringify(values));

      var tim = JSON.parse(localStorage.getItem("time"));
      var valu = JSON.parse(localStorage.getItem("value"));



      //console.log(times);


      var data = {
        labels: tim,
        datasets: [{
          label: "Glucose",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: valu,
        }]
      };

      var options = {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      };

      Chart.Bar('chart', {
        options: options,
        data: data
      });








    })


  };
  
  this.displayInput = () => {
    
    var searchInput = $("<input>").attr("placeholder", "Search").attr("class","food-search").css({
      width: "200px",
      height: "40px",
      border: "2px solid black",
      color: "black",
      marginRight:"10px",
      marginBottom:"50px"
    });
    //var wordsDiv = $("<div>").hide();
    
    div4.append(searchInput);
    
    //body.append(wordsDiv);
    var carbVrednostField = $("<input>").attr("placeholder", "carbs-on-100-gr").css({
      width: "200px",
      height: "40px",
      border: "2px solid black",
      color: "black"
    });
    div4.append(carbVrednostField);
    $(window).on("keypress", async (event) => {

      if (event.which === 13) {
        const searchInputValue = $('.food-search').val();

        //console.log(searchInputValue)
        var data = await this.business.resolveHrana(searchInputValue)
        console.log(data);
        // var carbVrednost = $("<input>").val(data);
        // body.append(carbVrednost);
        carbVrednostField.val(data + " gr carbs on 100gr product");
        //searchInput.reset();

      }


    })

  }

}

