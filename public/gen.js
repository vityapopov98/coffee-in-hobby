function renderMenu(coffeeMenu){
    // var innerComponent = '<div id="menu">'
    var coffeePlace = document.querySelector('.coffee');
    console.log('kitchen');
    // place.insertAdjacentHTML('beforeend', openCardDeck);
    console.log(coffeeMenu);
    coffeeMenu.then(data => {
    data.forEach(element => {
        console.log(element)
        // innerComponent += coffeeComponent(element.id, element.name, element.model, element.price);
        coffeePlace.insertAdjacentHTML('beforeend', coffeeComponent(element.id, element.name, element.model, element.price, element.image))
    })});
//    coffeePlace.insertAdjacentHTML('beforeend', innerComponent + "</div>")
}

function cleanPage() {
    var header = document.getElementById('header');
    var content = document.getElementById('menu');
    header.remove();
    content.remove();
}



function loadBuyWindow(productID, name, model, price) {
    var place = document.getElementById('app');
    const buyWindowComponent = `<section id="buy">
    <div class="container">
        <form class="buyWindow" action="/makeOrder" method="post">
          <div class="media-body">
            <h4>Купить</h4>
          </div>
          <hr>

          <div class="media">
          <img src="images/coffee-png-1.png" class="mr-3 smallImg" alt="...">
          <div class="media-body">
            
            <input class="inputBuyHeader" name="name" value="${name}" readonly>
            <input class="inputBuy" name="model" value="${model}" readonly>
            <input class="inputBuy" name="price" value="${price}" readonly>
            <input style="display: none" name="productID" value="${productID}" readonly>
          </div>
          </div>

            <div class="row">
              <div class="col">
                <input type="text" class="form-control" placeholder="Имя" name="fio">
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Телефон" name="phone">
              </div>
            </div>
            <div class="py-2">

              <input type="text" class="form-control" placeholder="Адрес" name="address">
            </div>
            <button type="button" class=" myBtnSecond" onclick="cancel()">Отменить</button>
            <input type="submit" class="myBtn inputBtn mx-1" value="Заказать">
          </form>
    </div>
  </section>`

  place.insertAdjacentHTML('beforeend', buyWindowComponent);
}

function cleanBuyWindow() {
  var content = document.getElementById('buy');
  content.remove();
}





function cancel() {
    
    var content = document.getElementById('buy');
    content.remove();

    var place = document.getElementById('app');
    const startPage = `<section id="header">
    <div class="banner">
        <div class="container">
            <h1>Хотите <br> чашечку кофе ?</h1>
            <p>Мы доставим ее прямо к вам</p>
            <a href="#" class="button">ЗАКАЗАТЬ</a>
        </div>
    </div>
</section>

<section id="menu">
  <div class="container">
    <div class="row pt-5 coffeeHeader">
      <div class="col-md-12">
        <h2 class="text-light">Кофе</h2>
      </div>
    </div>
    <div class="row py-5">
      <div class="coffee">
      
      </div>
      </div>
    </div>
  </section>`

    place.insertAdjacentHTML('beforeend', startPage);
    getMenu();
}
const kapuchino =`<div class="col-md-4">
<div class="card mb-4 box-shadow">
  <img class="card-img-top" src="images/coffee-png-1.png" alt="Card image cap">
  <div class="card-body">
      <h5 class="card-title">Капучино</h5>
    <p class="card-text">150 p</p>
    <div class="d-flex justify-content-between align-items-center">
      <div class="btn-group">
        <button type="button" class=" myBtn btn btn-sm btn-outline-secondary" >Купить</button>
      </div>
      <small class="text-muted">200 ml</small>
    </div>
  </div>
</div>
</div>`


function coffeeComponent(id, name, model, price, image){
    const coffee = `<div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top menuImage" src="images/coffee-png-1.png" alt="Card image cap">
      <div class="card-body">
          <h5 class="card-title">${name}</h5>
        <p class="card-text">${price}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class=" myBtn btn btn-sm btn-outline-secondary" onclick="buy(${id}, '${name}', '${model}', '${price}')">Купить</button>
          </div>
          <small class="text-muted">${model}</small>
        </div>
      </div>
    </div>
    </div>`

    return coffee
}