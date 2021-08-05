const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync('src/json/accounts.json', {encoding:'utf8'});
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync('src/json/users.json', {encoding:'utf8'});
const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render("index", { title: 'Account Summary', accounts: accounts });
});

app.get('/savings', (req, res) => {
    res.render("account", { title: 'Savings Summary', account: accounts.savings });
});

app.get('/checking', (req, res) => {
    res.render("account", { title: 'Checking Summary', account: accounts.checking });
});

app.get('/credit', (req, res) => {
    res.render("account", { title: 'Credit Summary', account: accounts.credit });
});

app.get('/transfer', (req, res) => {
    res.render("transfer");
});

app.get('/profile', (req, res) => {
    res.render("profile", { title: 'Profile', user: users[0] });
});

app.post('/transfer', (req, res) => {
    res.render("balance", { account: accounts["savings"].balance });
});


const port = 3000;

app.listen(port, () => {
    console.log(`PS Project Running on ${port}!`)
});