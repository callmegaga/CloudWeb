var soap = require('soap');
var express = require('express');
var url = './skd_wats.wsdl';
var args = {name: 'value'};
var app = express();
var Client;

soap.createClient(url, function(err, client) {
    Client = client
});


app.get('/getCityStatisticsCounter', function (req, res) {
 Client.getCityStatisticsCounter(args, function(err, result) {
        res.send(result);
    });
});

app.get('/getTotalStatisticsCounter', function (req, res) {
 Client.getTotalStatisticsCounter(args, function(err, result) {
        res.send(result);
    });
});

app.get('/getCityASSetInfo', function (req, res) {
 Client.getCityASSetInfo(args, function(err, result) {
        res.send(result);
    });
});

app.get('/getHostOnlineInfo', function (req, res) {
 Client.getHostOnlineInfo(args, function(err, result) {
        res.send(result);
    });
});

app.get('/getTimeIntervalStatistics', function (req, res) {
 Client.getTimeIntervalStatistics({type:2,count:24}, function(err, result) {
        res.send(result);
    });
});

app.use(express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});



