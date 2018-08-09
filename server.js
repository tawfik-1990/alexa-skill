
var express = require('express');
var bodyParser = require('body-parser');
var alexaVerifier = require('alexa-verifier');
var fuelkingSkill = require('./js/fuelking-alexa-skill/fuelking-skill.js');
var request = require('request');

var app = express();



function requestVerifier(req, res, next) {
    alexaVerifier(
        req.headers.signaturecertchainurl,
        req.headers.signature,
        req.rawBody,
        function verificationCallback(err) {
            if (err) {
                res.status(401).json({ message: 'Verification Failure', error: err });
            } else {
                next();
            }
        }
    );
}



//configure middleware
 app.use(bodyParser.json({
    verify: function getRawBody(req, res, buf) {
  
        req.rawBody = buf.toString();
    }
}));




app.post('/alexa/skill/fuelking', requestVerifier, function(req,res){
    fuelkingSkill.processAlexaRequest(req, function sendResponseToAmazon(speechResponse){
        res.json(speechResponse);
    });
});


app.get('/', function(req,res){
    fuelkingSkill.processAlexaRequest(req, function sendResponseToAmazon(speechResponse){
        res.status(200).send('OK');
    });
});

app.get('/healthz', function(req,res){
    fuelkingSkill.processAlexaRequest(req, function sendResponseToAmazon(speechResponse){
        res.status(200).send('OK');
    });
});





//listening on cloud port
app.listen(process.env.PORT || 3000, function () {

});
