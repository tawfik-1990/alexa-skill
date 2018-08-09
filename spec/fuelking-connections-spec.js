var fuelkingConnections = require('../js/fuelking-alexa-skill/fuelking-skill-connections.js');

describe("Test Fuelking Skill connections", function() {
  it("checks getting best fuelstation by zipcode (zipcode for bottrop) function", function(done) {
    fuelkingConnections.getBestFuelStationByZipcode(46236, 'all', 'dist', 2, function(fuelStation) {
          expect(fuelStation).toBeDefined();
          expect(fuelStation.name).toBeDefined();
          let bottrop = fuelStation.place;
          bottrop = bottrop.toLowerCase();
          expect(bottrop).toBe('bottrop');
          done();
    });
  });
});
