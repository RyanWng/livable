var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

var minLat = parseFloat(req.query.minLat);
var maxLat = parseFloat(req.query.maxLat);
var minLong = parseFloat(req.query.minLong);
var maxLong = parseFloat(req.query.maxLong);

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

});

module.exports = router;
