var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

var minLat = parseInt(req.query.minLat);
var maxLat = parseInt(req.query.maxLat);
var minLong = parseInt(req.query.minLong);
var maxLong = parseInt(req.query.maxLong);

// console.log(minLat + " " + maxLat);
// var halfLat = (minLat + maxLat) / 2;
// var halfLong = (minLong + maxLong) / 2;

// console.log(halfLat);

// res.send(JSON.stringify({Coordinates: {Latitude: halfLat, Longitude: halfLong}}));



var str = `https://api.tmsandbox.co.nz/v1/Search/Property/Rental.JSON?latitude_min=${minLat}&latitude_max=${maxLong}&longitude_min=${minLong}&longitude_max=${maxLong}`;

// OAuth1.0 - 3-legged server side flow (Twitter example)
// step 1
var qs = require('querystring')
  , oauth =
    { consumer_key: "A852C195374C7A2F70500DA81ED7357C"
    , consumer_secret: "F0CD5FBD696A8EC484F2C293040DF790"
    }
  , url = str
  ;
request.get({url:url, oauth:oauth}, function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("Not an error");
    var info = JSON.parse(body);

 //  console.log(info);
    var listing = [];
    
    for(var i in info.List) {

        var item = info.List[i];

        console.log(item);

        listing.push({
            "latitude"          : item.GeographicLocation.Latitude,
            "longitude"         : item.GeographicLocation.Longitude,
            "price_display"     : item.PriceDisplay,
            "image"             : item.PictureHref,
            "address"           : item.Address,   
            "suburb"            : item.Suburb,
            "district"          : item.District,
            "bedrooms"          : item.Bedrooms,
            "description"       : item.ShortDescription,
            "rent_per_week"     : item.RentPerWeek,
        });
    }
    
    res.send(JSON.stringify(listing));
  } else {
    console.log(error + response.statusCode);
    res.send('JSON stringify error');
  }
});
  // Ideally, you would take the body in the response
  // and construct a URL that a user clicks on (like a sign in button).
  // The verifier is only available in the response after a user has
  // verified with twitter that they are authorizing your app.








// var options = {
//   url: str,
//   headers: {
//     'Authorization': 'OAuth oauth_consumer_key="A852C195374C7A2F70500DA81ED7357C",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1503717980",oauth_nonce="75uMw4kz6mS",oauth_version="1.0",oauth_signature="zmyL3sLeSQiyMs40kyPh5ABbSfc%3D"'
//   }
// };
//
// console.log("a");
//

//
// request(options, callback);

});

module.exports = router;
