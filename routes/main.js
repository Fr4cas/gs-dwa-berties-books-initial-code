// Create a new router
const express = require("express");
const router = express.Router();

// Define our data
var shopData = {shopName: "Bertie's Books"}

// Handle our routes
router.get('/',function(req,res){
    res.render('index.ejs', shopData)
});

router.get('/about',function(req,res){
    res.render('about.ejs', shopData);
});

// Code for search page
router.get('/search',function(req,res){
    res.render("search.ejs", shopData);
});

router.get('/search-result', function (req, res) {
    //searching in the database
    res.send("You searched for: " + req.query.keyword);
});

// Code for register page
router.get('/register', function (req,res) {
    res.render('register.ejs', shopData);                                                                     
});        

router.post('/registered', function (req,res) {
    // saving data in database
    res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                              
}); 

// Code for list page
router.get('/list', function (req, res) {
    let sqlquery = "SELECT * FROM books"; 
    // Executes sqlquery
    db.query(sqlquery,(err, result) => {
        if (err){
            res.redirect('./');
        }
        let newData = Object.assign({}, shopData, {availableBooks:result});
            console.log(newData)
            res.render("list.ejs", newData)
    });
});

// Code for adding books
router.get('/addbook',function(req,res){
    res.render('addbook.ejs', shopData);
}); 

router.post('/bookadded', function (req,res) {
    // saving data in database
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";

    // execute sql query
    let newrecord = [req.body.name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            return console.error(err.message);
        }
        else {
            res.send(' This book is added to database, name: '+ req.body.name + ' price '+ req.body.price);
        }
    });
});

// Code for bargain books page
router.get('/bargainbooks', function (req, res) {
    let sqlquery = "SELECT name, price FROM books WHERE price<20"; 
    // Executes sqlquery
    db.query(sqlquery,(err, result) => {
        if (err){
            res.redirect('./');
        }
        let newData = Object.assign({}, shopData, {availableBooks:result});
            console.log(newData)
            res.render("bargainbooks.ejs", newData)
    });
});

// Export the router object so index.js can access it
module.exports = router;