const url = "https://restcountries.com/v3.1/all"
const countryTable = document.querySelector("#contentTable");

fetch(url).then((response)=>{
    return response.json();
}).then(data=>{
    data.forEach(function(element) {
        countryTable.insertAdjacentHTML('beforeend', 
            "<tr'><th id='name'>" + element.name.official + "</th>"
            + "<td id='capitals'>" + getCapital(element.capital) + "</td>"
            + "<td id='region'>" + element.region + "</td>"
            + "<td id='languages'>" + getLanguages(element.languages) + "</td>"
            + "<td id='population'>" + element.population + "</td>"
            + "<td id='flag'>" + element.flag + "</td>"
            + "</tr>"
        );
    });
    sortTable();
    onRowClick();
  
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

function sortTable() {
    
    var toggleButton = document.getElementById("btn-toggle-order");
    var order = toggleButton.value;

    if (order == "ASC"){
        order = "ASC";
        toggleButton.innerHTML = "Toggle order to DESC";
        toggleButton.value = "DESC";
    } else {
        order = "DESC";
        toggleButton.innerHTML = "Toggle order to ASC";
        toggleButton.value = "ASC";
    }
    
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
            } else{
                if (x.innerHTML < y.innerHTML) {
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

function rowClicked(country){
    const wikipediaURL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
    var modal = new tingle.modal({
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
    });

    fetch(wikipediaURL+country).then((response)=>{
        return response.json();
    }).then(data=>{
        modal.setContent(data.extract_html);
    }).catch(error=>{
        console.log(error);
    })

    modal.open();
}

function onRowClick() {
    var rows = countryTable.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        countryTable.rows[i].onclick = function (row) {
            return function () {
                var value = row.getElementsByTagName("th")[0].innerHTML;
                rowClicked(value);
            };
        }(countryTable.rows[i]);
    }
};
