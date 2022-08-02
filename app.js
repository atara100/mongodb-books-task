const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./modules/mongoDb');
const chalk=require('chalk')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

const path = require("path");
const { log } = require("console");
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

const viewsPath = path.join(__dirname,'./views') 
app.set('views', viewsPath)

//Middleware
app.use(function(req, res, next) {
    if(req.method==='GET'){
    console.log(chalk.red(`Middleware Method: ${req.method}`));
    }else{
        console.log(chalk.green(`Middleware Method: ${req.method}`));
    }
    console.log(chalk.yellow(`Middleware url: ${req.url}`));
    next();
});

app.get("" , (req, res) => {    
    res.render("index");
});


//endpoint books/:number
app.get("/books/:number" ,async (req, res) => {
    let result = await mongoose.find({pageCount: {$gt: req.params.number}});
    let resArr=[]
    result.forEach(book=>{ 
       resArr.push({bookName:book.title,pageCount:book.pageCount}) 
    })
    res.send(resArr);
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}🎯`);
});