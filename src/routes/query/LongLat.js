var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

var minLat = parseInt(req.query.minLat);
var maxLat = parseInt(req.query.maxLat);
var minLong = parseInt(req.query.minLong);
var maxLong = parseInt(req.query.maxLong);

var halfLat = (minLat + maxLat) / 2;
var halfLong = (minLong + maxLong) / 2;

var accounting = [];
var employees = {};

for(var i in someData) {

    var item = someData[i];

   accounting.push({ 
        "firstName" : item.firstName,
        "lastName"  : item.lastName,
        "age"       : item.age 
    });
}

employees.accounting = accounting;

res.send(JSON.stringify({Coordinates: {Latitude: halfLat, Longitude: halfLong}}));



// var str = "https://api.tmsandbox.co.nz/v1/Search/Property/Rental.JSON?latitude_max=" + maxLat;

// var options = {
//   url: str,
//   headers: {
//     'Authorization': 'OAuth oauth_consumer_key="A852C195374C7A2F70500DA81ED7357C",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1503717980",oauth_nonce="75uMw4kz6mS",oauth_version="1.0",oauth_signature="zmyL3sLeSQiyMs40kyPh5ABbSfc%3D"'
//   }
// };
//
// console.log("a");
//
// function callback(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log("Not an error");
//     var info = JSON.parse(body);
//     console.log(info);
//     res.send("We received the response");
//   } else {
//     console.log(error + response.statusCode);
//     res.send('JSON stringify error');
//   }
// }
//
// request(options, callback);

});

module.exports = router;
