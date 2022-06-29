const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const PORT = 3000;

let db, 
    dbConnectionString = process.env.DB_STRING,
    dbName = 'budget-db';

MongoClient.connect(dbConnectionString, {useUnifiedTopology: true})
.then(client=>{
    console.log(`connected to ${dbName} Database`)
    db = client.db(dbName);
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.get('/expenses',(req,res)=>{
    res.render('expenses.ejs');
})

app.post('/addBudget',(req,res)=>{
    console.log(req.body)
    db.collection('budget').insertOne({budget:req.body.budget})
    .then(result=>{
        console.log('Added budget');
        res.json('Added budget')
    })
})

app.put('/addExpense',(req,res)=>{
    db.collection('budget').insertOne({expenses:req.body.expense})
    .then(result=>{
        console.log("inserted expense");
        res.json('Added expense')
    })
})

app.listen(process.env.PORT || PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

