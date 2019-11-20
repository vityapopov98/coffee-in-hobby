
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





function getMenu(){
    fetch('menu.json').then(res => {
        if(res.ok){
            console.log('i get menu');
            return res.json();
        }
        else{
            console.log('er get rooms :(');
            throw new Error ('er');
        }
    }).then(json=>{
        console.log('almost success');
        var cofffeMenu = json.coffee;
        renderMenu(cofffeMenu);
        
    })//.then(json=> usersRoom //наполняем массив инфой с json)

}