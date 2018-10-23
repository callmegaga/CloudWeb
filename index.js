const SOAP = require('soap');
const EXPRESS = require('express');
const WSDL_URL = './skd_wats.wsdl';
const ARGS = {name: 'value'};
const APP = EXPRESS();
let CLIENT;

SOAP.createClient(WSDL_URL, function(err, client) {
    CLIENT = client
});


APP.get('/getCityStatisticsCounter', function (req, res) {
 CLIENT.getCityStatisticsCounter(ARGS, function(err, result) {
        res.send(result);
    });
});

APP.get('/getTotalStatisticsCounter', function (req, res) {
 CLIENT.getTotalStatisticsCounter(ARGS, function(err, result) {
        res.send(result);
    });
});

APP.get('/getCityASSetInfo', function (req, res) {
 CLIENT.getCityASSetInfo(ARGS, function(err, result) {
        res.send(result);
    });
});

APP.get('/getHostOnlineInfo', function (req, res) {
 CLIENT.getHostOnlineInfo(ARGS, function(err, result) {
        res.send(result);
    });
});

APP.get('/getTimeIntervalStatistics', function (req, res) {
 CLIENT.getTimeIntervalStatistics({type:2,count:24}, function(err, result) {
        res.send(result);
    });
});

APP.use(EXPRESS.static('public'));

let SERVER = APP.listen(3000, function () {
    let host = SERVER.address().address;
    let port = SERVER.address().port;
    console.log('Example APP listening at http://%s:%s', host, port);
});



