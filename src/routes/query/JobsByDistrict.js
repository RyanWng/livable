var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

var str = `https://api.tmsandbox.co.nz/v1/Search/Jobs.JSON`;

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
   // console.log("Not an error");
    var info = JSON.parse(body);
    console.log(info);

    var districts = {};

 //  console.log(info);
  for(var i in info.List) {
  
      var item = info.List[i];
  
      console.log(item);
    if(districts[item.Suburb]){
       districts[item.Suburb]++;
    } else {
       districts[item.Suburb]=1;
    }
  }
    
  console.log(districts);
    res.send(JSON.stringify(districts));
  } else {
    console.log(error + response.statusCode);
    res.send('JSON stringify error');
  }
});
});

module.exports = router;
