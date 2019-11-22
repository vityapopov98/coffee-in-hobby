
var cartLabel

window.onload = function(){
    this.getMenu()

    cartLabel = document.getElementById('cart');
    // cartLabel.innerHTML = this.cart.length
    
}

var cart = []

function buy(id, name, model, price) {
    console.log("i buy")
    console.log(id)
    cart.push(id)
    cartLabel.innerHTML = "Корзина (" + cart.length +")";
    cleanPage();
    loadBuyWindow(id, name, model, price);
}

function makeOrder() {
    console.log("i'll make order")
    alert('what s going on?')
    // cleanBuyWindow();
    // printTransaction();
}


function getMenu(){
    fetch('/getMenu').then(res => {
        if(res.ok){
            var coffie = res.json();
            renderMenu(coffie);
            return coffie;
        }
        else{
            console.log('er get rooms :(');
            throw new Error ('er');
        }
    })

}

