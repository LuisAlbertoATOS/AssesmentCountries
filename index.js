const url = "https://restcountries.com/v3.1/all"
const countryTable = document.querySelector("#contentTable");

fetch(url).then((response)=>{
    return response.json();
}).then(data=>{

    // console.log(data);
    data.forEach(function(element) {
        countryTable.insertAdjacentHTML('beforeend', 
            "<tr><th id='name'>" + element.name.official + "</th>"
            + "<td id='capitals'>" + getCapital(element.capital) + "</td>"
            + "<td id='region'>" + element.region + "</td>"
            + "<td id='languages'>" + getLanguages(element.languages) + "</td>"
            + "<td id='population'>" + element.population + "</td>"
            + "<td id='flag'>" + element.flag + "</td>"
            + "</tr>"
        );
    });
    sortTable("ASC");
  
}).catch(error=>{
    console.log(error);
})

function getLanguages(languages){
    if (languages){
        return Object.values(languages);
    } else {
        return "No language to display";
    }
}

function getCapital(capital){
    if (capital){
        return capital;
    } else {
        return "No capital";
    }   
}

function sortTable(){
    var rows = countryTable.rows;
    for (var i = 0; i < rows.length-1; i++){
        var rowOne = rows[i];
        var rowTwo = rows[i+1];
        console.log(rowOne);
    }
}

function sortTable(order) {
    var switching, x, y, shouldSwitch;
    
    switching = true;

    while (switching) {
      switching = false;
      var rows = countryTable.rows;
 
      for (var i = 0; i < rows.length-1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("th")[0];
        y = rows[i+1].getElementsByTagName("th")[0];    

        if(order == "ASC"){
            if (x.innerHTML > y.innerHTML) {
                shouldSwitch = true;
                break;
            }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
        switching = true;
      }
    }
  }