const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const PORT = 3000;

let db,
  dbConnectionString = process.env.DB_STRING,
  dbName = "budget-db";

MongoClient.connect(dbConnectionString, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/expenses", (req, res) => {
  let cursor1 = db.collection("expenses").find().toArray();
  let cursor2 = db.collection("budget").find().toArray();
  let cursor3 = db.collection("expenses").find().toArray();

  Promise.all([cursor1, cursor2]).then((data) => {
    let sum = 0;
    //console.log(data[1][0].budget)
    //console.log(data[0])
    data[0].forEach((obj) => {
      sum += Number(obj.cost);
    });
    console.log(data);
    let remaining = data[1][0].budget - sum;
    res.render("expenses.ejs", { info: data, spent: sum, remaining });
  });
});

app.post("/addBudget", (req, res) => {
  console.log(req.body);
  db.collection("budget")
    .insertOne({ budget: req.body.budget })
    .then((result) => {
      console.log("Added budget");
      res.json("Added budget");
    });
});

app.post("/addExpense", (req, res) => {
  console.log(req.body);
  db.collection("expenses")
    .insertOne({ expense: req.body.expense, cost: req.body.cost })
    .then((result) => {
      console.log("Expense added");
      res.redirect("/expenses");
    });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
