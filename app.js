const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


let fname = "";
let lname = "";
let goldItems = [{name: 'Sitting Ganesh 22K Gold Coin', price: 57635}, {name: 'Om Motif 22K 10 Gram Gold Coin', price: 65600}, {name: 'Goddess Lakshmi Gold Coin', price: 49923}];
let rings = [{name: 'White Rose Engagement Rings', price: 87999}, {name: 'Topaz Ring with embeded Diamonds', price: 105000}, {name: 'Modern floral Diamond Ring', price: 49923}]
let pendants = [{name: 'Radiant Pendants', price: 45000}, {name: 'Ethereal Charms', price: 56733}, {name: 'Exquisite Emblems', price: 100000}]
let cartGold = [];
let cartItem = [];
let totalPrice = 0;
let count = 0;

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    fname = req.body.fname;
    lname = req.body.lname;
    res.redirect("/success");
})

app.get("/success", (req, res) => {
    myName = fname + lname;
    res.render("success", {Name: myName});
})

app.get("/about", (req, res) => {
    res.render("about");
})


app.get("/gold-coins", (req , res) => {
    res.render("gold");
}); 


app.post("/gold-coins", (req, res) => {
    if (req.body.demo == "Coin1"){
        cartGold.push(goldItems[0]);
        res.redirect("/cart");
    }else{
        if (req.body.demo == "Coin2"){
            cartGold.push(goldItems[1]);
            res.redirect("/cart");
        }   
    }
    if (req.body.demo == "Coin3") {
        cartGold.push(goldItems[2]);
        res.redirect("/cart");
    }
});

app.get("/cart", (req, res) => {
    cartItem = cartGold
    res.render("cart", {cartGold: cartItem, totalPrice: cartItem[0].price});
})


app.post("/redeem", (req, res) => {

    if(req.body.code == 'NONA50'){
        totalPrice = cartGold[0].price - 5000;
        console.log(totalPrice);
        res.redirect("/promo"); 
    }else{
        res.render("paymentFailure")
    } 
})

app.get("/promo", (req, res) => {
    
    res.render("promo", {cartGold: cartGold, totalPrice: totalPrice});
})

app.post("/cart", (req, res) => {
    res.render("paymentSuccess")
})

app.get("/pendants", (req, res) => {
    res.render("pendant");
})

app.get("/rings", (req, res) => {
    res.render("rings");
})

app.post("/rings", (req, res) => {
    if (req.body.demo == "Coin1"){
        cartGold.push(rings[0]);
        res.redirect("/cart");
    }else{
        if (req.body.demo == "Coin2"){
            cartGold.push(rings[1]);
            res.redirect("/cart");
        }   
    }
    if (req.body.demo == "Coin3") {
        cartGold.push(rings[2]);
        res.redirect("/cart");
    }
});

app.get("/pendants", (req, res) => {
    res.render("pendant");
})

app.post("/pendants", (req, res) => {
    if (req.body.demo == "Coin1"){
        cartGold.push(pendants[0]);
        res.redirect("/cart");
    }else{
        if (req.body.demo == "Coin2"){
            cartGold.push(pendants[1]);
            res.redirect("/cart");
        }   
    }
    if (req.body.demo == "Coin3") {
        cartGold.push(pendants[2]);
        res.redirect("/cart");
    }
});

app.listen(9999);