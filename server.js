const mysql = require('mysql2'); // для работы с SQL запросами
const express = require('express');//для роутинга
const app = express();
const bodyParser = require('body-parser');//для парсинга в роутинге

const urlencodedParser = bodyParser.urlencoded({extended: false}) //включение парсера
console.log("hello!!!!! how are you ?))))")

//_________start server_________
app.listen(3000, err => {
    if (!err) console.log('Server started on 3000 port');
    else console.error('Server not started');
})

//_____________DB___________
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
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
    res.sendFile("/Users/Mac/Documents/3 course/DB/lab2/index.html")
    res.sendFile("/Users/Mac/Documents/3 course/DB/lab2/script.js")
})


//_________Неактуальный мусор_____________
app.post('/product', urlencodedParser,(req, res)=>{
    if(!req.body) return res.sendStatus(400);
    console.log(req.body)
    //res.send(`${req.body.name} ; ${req.body.model}`)
    var nameToPack = ''+`${req.body.name}`
    var modelToPack = ''+`${req.body.model}`
    var id = 3
    var sql = `INSERT INTO product(name, model) VALUES('${nameToPack}', '${modelToPack}')`
    connection.query(sql, function(err, result){
        if (err) console.log(`there was a error Ediditng😡: ${err}`)
        else console.log(`there is a result🥰: ${result}`)
        res.send("congrats")
    })
});
app.get('/getinfo', urlencodedParser, (req,res)=>{
    console.log('getting info ... 🧾⬆️')
    connection.query('SELECT name FROM  product where id=1;',function(err, result, fields){
        if (err) console.log(`there was a error getting 🧾😡: ${err}`)
        else console.log(`there is a result 🧾🥰: ${req}`)
        // var myRes = JSON.parse(result)
        // for(var k in fields){
        //     console.log(k, fields[k])
        // }
        res.json(result)
    
    })
})






// var query = connection.query("INSERT INTO product(id, name, model) VALUES(1, 'kapuchino', '200ml')", (err,result)=>{
//     if (err) console.log(`there was a error in the editing: ${err}`)
//     else console.log(`there is a result of editing: ${result}`)
// });

// console.log("I will close connection")
// connection.end();
