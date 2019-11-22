window.onload = ()=>{
    getTransactionInfo();
    console.log("trans script working")
}

function getTransactionInfo(params) {
    console.log("requesting info...")
    fetch('/getTransactionInfo').then(res=>{
        if (res.ok) {
            console.log(res)
            var transaction = res.json();
            renderTransactionInfo(transaction);
            //transaction.orderTime, transaction.orderID, transaction.fio, transaction.name, transaction.price
            return transaction;
        }
        else{
            console.log('error getting transaction info');
            throw new Error ('Error transaction info');
        }
    })
}

//orderTime, orderID, customerFio, productName, productPrice
function renderTransactionInfo(transaction) {
    
    var orderTimePlace = document.getElementById('orderTime');
    var orderIdPlace = document.getElementById('orderID');
    var customerFioPlace = document.getElementById('customerFio');
    var productNamePlace = document.getElementById('productName');
    var productModelPlace = document.getElementById('productModel');
    var productPricePlace = document.getElementById('productPrice');
  
    transaction.then(data=>{
        orderTimePlace.innerHTML = data.fio;
        orderIdPlace.innerHTML = data.phone;
        customerFioPlace.innerHTML = data.address;
        productModelPlace.innerHTML = data.model;
        productNamePlace.innerHTML = data.name;
        productPricePlace.innerHTML = data.price;
    })


    console.log("Hey I get there")

  }