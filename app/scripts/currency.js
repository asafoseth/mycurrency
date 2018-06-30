
function loadCurrencies(){
    const url = "https://free.currencyconverterapi.com/api/v5/currencies";

    fetch(url)
    .then((res) => res.json()) //this transforms currency data to json
    .then(data =>{
        const currencies =  data.results;
        for (let currency in currencies){
            const option = document.createElement('option');
            option.innerHTML = currencies[currency].id;
            document.getElementById("fromCurrency").appendChild(option);
        }   
        for (let currency in currencies){
            const option = document.createElement('option');
            option.innerHTML = currencies[currency].id;
            document.getElementById("toCurrency").appendChild(option);
        }     
    })
    .catch(function(error){
        console.log(error);
    });
}





function convertCurrency(amount, fromCurrency, toCurrency) {

  const query = `${fromCurrency}_${toCurrency}`;

  const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;

 
fetch(url)
.then((res) => res.json())
.then(data =>{
    const {val} = data[query];
    console.log(val);
    if (val) {
        const total = val * amount;
      // console.log(`the result is: ${cb(Math.round(total * 100) / 100)}`);
      const result = Math.round(total * 100) / 100;
       document.getElementById("result").value=result;
    }
    else{
        const err = new Error(`Value not found for ${query}`);
        console.log(err);
    }
})
.catch(function(error){
    console.log(error);
});
}

