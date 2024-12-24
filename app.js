const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".msg");

const swapBtn = document.querySelector(".fa-arrow-right-arrow-left"); // Select swap icon


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode == "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let ammount = document.querySelector(".amount input");
    let amtVal = ammount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        ammount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let respose = fetch(URL).then(response => response.json()) 
        .then(data => {
            const rates = data.usd; 
            const targetCurrency = toCurr.value.toLowerCase(); 
            const exchangeRate = rates[targetCurrency]; 
            msg.innerText=`1 USD is equal to ${exchangeRate} ${targetCurrency.toUpperCase()}`;
        })
        .catch(error => {
            msg.innerText='Error fetching exchange rates:', error;
        });

});

swapBtn.addEventListener("click", () => {
    const temp = fromCurr.value;
    fromCurr.value = toCurr.value; 
    toCurr.value = temp; 
    updateFlag(fromCurr); 
    updateFlag(toCurr); 
});
