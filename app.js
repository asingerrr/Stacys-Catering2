var http = require('http');
var dotenv = require('dotenv').load();
var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT|| 5000;
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.sendFile('index1.html');
  console.log('nodemailer reading console log..'+ req.url);
});

app.post('/send', function(req, res){
  if(req.body.mail == '' || req.body.subject == ""){
    res.send("error: email and subject must be filled in");
    return false;
  }

var smtTransport = nodemailer.createTransport("SMTP", {
  host: "smtp.gmail.com",
  secureConnection: true,
  port: 465,
    auth: {
      user: 'alisonsinger_2017@depauw.edu',
      pass: process.env.GMAIL_PASSWORD
    }
});
var mailOptions = {
  from: "node emailer - <email@gmail.com>",
  to: req.body.email,
  subject: req.body.subject + "-",
  html: "<b>" + req.body.description+ "<b>"
}

smtTransport.sendMail(mailOptions, function(error, response){
  if(error){
    res.send("Email couldnt be sent" + error);
  } else{
      res.send("Email has been sent");
  }
});
});
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
