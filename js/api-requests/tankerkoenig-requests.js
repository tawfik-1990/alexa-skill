var request = require('request');


module.exports.getBestFuelStation = function(lat, long, fuelType, sortType, radius, cb) {
  request('https://creativecommons.tankerkoenig.de/json/list.php?lat='+ lat +'&lng='+ long +'&rad='+radius+'&sort='+sortType+'&type='+fuelType+'&apikey=00000000-0000-0000-0000-000000000002', function (error, response, body) {
    if(error) {
      cb(error);
      return;
    }
    //console.log(body);
    var bodyObj = JSON.parse(body);
    cb(bodyObj.stations[0]);
  });
};


