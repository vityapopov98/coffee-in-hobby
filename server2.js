const mysql = require('mysql2'); // для работы с SQL запросами
const express = require('express');//для роутинга
const app = express();
const bodyParser = require('body-parser');//для парсинга в роутинге

const urlencodedParser = bodyParser.urlencoded({extended: false}) //включение парсера
console.log("hello!!!!! how are you ?))))")

app.use(express.static('public'));

//_________start server_________
app.listen(3000, err => {
    if (!err) console.log('Server started on 3000 port');
    else console.error('Server not started');
})

//_____________DB___________
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:                                                                                                                           ""
})

connection.query("use coffeeInHobby;",function(err, result){
    if (err) {
        console.log(`there was a error: ${err}`)
        console.log(err)
    } 
    else{
        console.log(`there is a result: ${result}`)
        console.log(result)
    } 
    console.log(`there is a result: ${result}`)
});

//___________routes__________
app.get('/', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
    res.sendFile(__dirname + '/index.html')
})

app.get('/getMenu', urlencodedParser, (req, res)=>{
    //выслать меню
    var query = 'SELECT * FROM product';
    connection.query(query, (error, result)=>{
      res.json(result);
    //   console.log(result);  
    })
})

var currentOrder;

//Пользователь оформляет заказ
app.post('/makeOrder', urlencodedParser, (req, res)=>{
    console.log("I get post request")
    console.log(req.body)
    currentOrder = req.body; //инфа с заказа

    //Pack info to SQL 
    //идентифицировать пользователя по телефону (имейл)
    var queryForCustomerID = `SELECT id FROM customer WHERE login = '${currentOrder.phone}'`
    var customerID; 
    connection.query(queryForCustomerID, (error,result)=>{
        console.log("Узнаем пользователя 😳"); 
        console.log(currentOrder.phone);
        console.log(result);
        console.log(result[0].id);
        customerID = result[0].id;
    })
    //создать новый заказ
    connection.query(`INSERT INTO myord(customerID) VALUES (${customerID})`, (error,result)=>{
        console.log("order insertes 😳");
        console.log(`INSERT myord(customerID) VALUES (${customerID})`);
        console.log(result);
        console.log(error);
    })
    //узнать какой заказ содан
    var orderID;
    connection.query('SELECT MAX(id) FROM myord', (error, result)=>{
        console.log("MAX myord 😳"); 
        console.log(result[0]["MAX(id)"]);

        orderID = result[0]["MAX(id)"]
    })
    var productID = currentOrder.productID;

    //пакуем в orderInformation
    connection.query(`INSERT orderInformation(orderID, productID) VALUES (${orderID}, ${productID})`, (error, result)=>{
        console.log("вставка order inf 😳"); 
        console.log(result)
    })

    //содаем доставку
    connection.query(`INSERT delivery(sellerID, departureTime, gettingTime ) VALUES (2, NOW(), NOW())`, (error, result)=>{
        console.log("вставка доставки 😳"); 
        console.log(result)
    })
    //узнаем какую доставку создали
    var deliveryID;
    connection.query(`SELECT MAX(id) FROM delivery`, (error, result)=>{
        console.log("А это вообще работает? 😳"); 
        console.log(result.id)
        deliceryID = result.id;
    });

    //создаем транзакцию
    
    var shopID = 1;
    
    var saveTransaction = `INSERT transaction(orderTime, paymentTime, orderID, customerID, shopID, deliveryID) VALUES (NOW(), NOW(), ${orderID}, ${customerID}, ${shopID}, ${deliveryID})`

    connection.query(saveTransaction, (error, result)=>{
        console.log("Добавление транзакции  🧐"); 
        console.log(result)
    })

    //end packing

    res.sendFile(__dirname + '/transaction.html');//лучше тогда сделать новую страницу для чека
})

app.get('/getTransactionInfo', urlencodedParser, (req, res)=>{
    console.log("getTransact rout"); 
    res.json(currentOrder);  
})






// var query = connection.query("INSERT INTO product(id, name, model) VALUES(1, 'kapuchino', '200ml')", (err,result)=>{
//     if (err) console.log(`there was a error in the editing: ${err}`)
//     else console.log(`there is a result of editing: ${result}`)
// });

console.log("I will close connection")
// connection.end();
