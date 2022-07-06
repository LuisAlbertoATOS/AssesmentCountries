const url = "https://restcountries.com/v3.1/all"
const countryTable = document.querySelector("#contentTable");

fetch(url).then((response)=>{
    return response.json();
}).then(data=>{

    console.log(data);
    data.forEach(function(element) {
        countryTable.insertAdjacentHTML('beforeend', 
            "<tr><th>" + element.name.official + "</th>"
            + "<td id='capitals'>" + getCapital(element.capital) + "</td>"
            + "<td id='region'>" + element.region + "</td>"
            + "<td id='languages'>" + getLanguages(element.languages) + "</td>"
            + "<td id='population'>" + element.population + "</td>"
            + "<td id='flag'>" + element.flag + "</td>"
            + "</tr>"
        );
    });
  
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