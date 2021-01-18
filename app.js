const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const ejs = require("ejs");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

var titles = [];

app.get("/", function(req, res){
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  let today1 = today.toLocaleDateString("en-US", options);


  let title1 = [];
  let desc = [];
  let img1 = [];
  let url1 = [];
  let dates = [];
  let publication = [];
  let pubURL = [];
  const lang = "en";
  const country = "in";
  const key = "XXXXXXXXXXX";    //replace the Xs with your GNews API key
  const url = "https://gnews.io/api/v4/top-headlines?lang=" + lang + "&country=" + country + "&max=10&token=" + key;
  request(url, {json:true}, (err, resp, body) =>{
    if(err){
      console.log("Err"+err);
    }
    else{
      const data = JSON.stringify(body);
      const newsData = JSON.parse(data);
      for (var i=0; i<10; i++){
        title1.push(newsData.articles[i].title);
        img1.push(newsData.articles[i].image);
        url1.push(newsData.articles[i].url);
        let date1 = newsData.articles[i].publishedAt;
        date1 = date1.slice(0, 10);
        dates.push(date1);
        publication.push(newsData.articles[i].source.name);
        pubURL.push(newsData.articles[i].source.url)
        desc.push(newsData.articles[i].description)
      }
      res.render("index", {img:img1, url:url1, title: title1, date: dates, puburl: pubURL, pub: publication, desc: desc, today: today1});
    }
    
  });
});

app.post("/tags", function(req, res){
  let title1 = [];
  let desc = [];
  let img1 = [];
  let url1 = [];
  let dates = [];
  let publication = [];
  let pubURL = [];
  const tag = req.body.tag;
  const lang = "en";
  const country = "in";
  const key = "81f87ab5588216686ae5a927fef40e3c#";
  const url = "https://gnews.io/api/v4/top-headlines?lang=" + lang + "&country=" + country + "&max=10&topic=" + tag + "&token=" + key;
  request(url, {json:true}, (err, resp, body) =>{
    if(err){
      console.log("Err"+err);
    }
    else{
      const data = JSON.stringify(body);
      const newsData = JSON.parse(data);
      for (var i=0; i<10; i++){
        title1.push(newsData.articles[i].title);
        img1.push(newsData.articles[i].image);
        url1.push(newsData.articles[i].url);
        let date1 = newsData.articles[i].publishedAt;
        date1 = date1.slice(0, 10);
        dates.push(date1);
        publication.push(newsData.articles[i].source.name);
        pubURL.push(newsData.articles[i].source.url)
        desc.push(newsData.articles[i].description)
      }
      res.render("tags", {img:img1, url:url1, title: title1, date: dates, puburl: pubURL, pub: publication, desc: desc});
    }
    
  });
});

app.listen(3000, function(){
  console.log("Server started at port 3000");
});
