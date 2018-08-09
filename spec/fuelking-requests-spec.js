var gmapsService = require('../js/api-requests/gmaps-requests.js');
var fuelStationService = require('../js/api-requests/tankerkoenig-requests.js');


describe("Testing external API request functions", function() {
  describe("Test Google Maps API request function for resolving geocoordinates", function() {
    it("checks function returning coordinates for bottrop city, 46236", function(done) {
      gmapsService.getCoordinatesByZipcode(46236, function(coordinates){
          var bottropLatitude = 51.5267424;
          var bottropLongitude = 6.9243806;

          expect(coordinates).toBeDefined();
          expect(bottropLatitude).toBe(coordinates[0]);
          expect(bottropLongitude).toBe(coordinates[1]);
          done();
        });
     });
  });
  describe("Test Tankerkönig API request function for resolving fuelstation information", function() {
    it("checks JSON object for one fuelstation result", function(done) {
      fuelStationService.getBestFuelStation(51.5267424, 6.9243806, 'all', 'dist', 5, function(fuelStationJSON) {
                expect(fuelStationJSON).toBeDefined();
                expect(fuelStationJSON.name).toBeDefined();
                done();
        });
     });
  });
});
