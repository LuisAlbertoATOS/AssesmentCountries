const url = "https://restcountries.com/v3.1/all"
const divList = document.querySelector("#app");

fetch(url).then((response)=>{
    return response.json();
}).then(data=>{
  
    // console.log(data);
    data.forEach(function(element) {
        // console.log(element.name.common);
        divList.insertAdjacentHTML('beforeend', "<li>" + element.name.common + " </li>");
    });
  
}).catch(error=>{
    console.log(error);
})