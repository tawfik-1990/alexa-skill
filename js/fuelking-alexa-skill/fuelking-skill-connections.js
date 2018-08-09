var fuelStationService = require('../../js/api-requests/tankerkoenig-requests.js');
var gmapsService = require('../../js/api-requests/gmaps-requests.js');

module.exports.getBestFuelStationByZipcode = function(zipcode, fuelType, sortType, radius, done) {
    gmapsService.getCoordinatesByZipcode(zipcode, function(coordinates) {
      fuelStationService.getBestFuelStation(coordinates[0], coordinates[1], fuelType, sortType, radius, function(fuelStationJSON) {
          done(fuelStationJSON);
        });
    });
};


