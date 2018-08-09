var request = require('request');

module.exports.getCoordinatesByZipcode = function(zipcode, cb) {
  request('http://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode + '&sensor=false&components=country:DE', function (error, response, body) {
    if(error) {
      cb(error);
      return;
    }

    var geocode = JSON.parse(body);
    var lat = geocode.results[0].geometry.location.lat
    var lng = geocode.results[0].geometry.location.lng
    cb([lat, lng])
  });
};




