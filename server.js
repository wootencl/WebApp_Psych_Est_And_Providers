// NOTES:
// - Pretty much the same idea as homework 1b. Difference being two API calls instead of
// one and GETs instead of POST.

var express = require('express');
var PokitDok = require('pokitdok-nodejs');
var app = express();

var clientId = "ZAMbYSfPeMNOpzYlbyga";
var clientSecret = "iVpBaxfCDXfBR40iVf5Z2QzjnMKx8omaRfxworkY";

var pokitdok = new PokitDok(clientId, clientSecret);

app.use(express.static(__dirname + '/public'));

app.get('/index.html', function (req, res) {
  res.sendFile( __dirname+"/"+"index.html");
});

app.get("/cash", function(req, res) {
  pokitdok.cashPrices({
        zip_code: '29401',
        cpt_code: '90791'
    }, function (err, result) {
    if (err) {
        return console.log(err, result.statusCode);
    }
    return res.send(result.data);
  });
});

app.get("/providers", function(req, res) {
  pokitdok.providers({
    zipcode: 29401,
    specialty: 'psychology',
    radius: '20mi',
    sort: 'distance'
  }, function(err, result){
      if(err) {
          return console.log(err, result.statusCode);
      }
      res.send(result.data);
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});