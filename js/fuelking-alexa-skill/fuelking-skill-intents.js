var fuelkingHelper = require('./fuelking-skill-helper.js');
var fuelkingConnections = require('./fuelking-skill-connections.js');

/*

*/
module.exports.createAlexaSpeechResponseByIntent = function(intentName, slots, returnResponse) {
  var responseSpeechJSON;

    /*
     If this switch contains more than five items, it should be implemented
     using a lookup table or a hash table/ list.
     This means that all items get the same access time,
     compared to a list of if-else where the last item takes
     much more time to reach as it has to evaluate every previous condition first..
    */
      switch(intentName) {
        case 'BestStationInZip': //Welche Tankstelle ist allgemein in {PLZ} am günstigsten ?
          var errorSpeechResponse = fuelkingHelper.validateFuelKingSlots(slots);
          if(errorSpeechResponse) {
            returnResponse(fuelkingHelper.createAlexaSpeechJSON(true, errorSpeechResponse));
            return;
          }
          var zipcode = slots.zipcode.value;

          //if fueltype set to 'all' sort has to be set to 'dist' or left away
            fuelkingConnections.getBestFuelStationByZipcode(zipcode, 'all', 'dist', 2, function(fuelStation) {
              //In "City - Mitte" ist die günstigste Tankstelle die fuelStation.Name auf der fuelStation.address.
            responseSpeechJSON = fuelkingHelper.createAlexaSpeechJSON(true, 'Test name ' + fuelStation.name);
            returnResponse(responseSpeechJSON);
          });
          break;
        case 'BestStationInZipForFuelType': //Wo ist {fuelType} in {zipcode} am günstigsten ?
          var errorSpeechResponse = fuelkingHelper.validateFuelKingSlots(slots);
          if(errorSpeechResponse) {
            returnResponse(fuelkingHelper.createAlexaSpeechJSON(true, errorSpeechResponse));
            return;
          }
          var zipcode = slots.zipcode.value;
          var fuelType = slots.fuelType.value;
            fuelType = fuelkingHelper.getFuelTypeDataFormat(fuelType);
            fuelkingConnections.getBestFuelStationByZipcode(zipcode, fuelType, 'dist', 2, function(fuelStation) {
            //Den günstigsten Preis für "fuelType" habe ich bei der fuelStation.name auf der fuelStation.address gefunden.
            //Diesel kostet hier fuelStation.price 
            responseSpeechJSON = fuelkingHelper.createAlexaSpeechJSON(true, 'Test name ' + fuelStation.name);
            returnResponse(responseSpeechJSON);
          });
          break;
     case 'BestStationInZipForFuelTypeInRadius': //Wo ist {fuelType} in {zipcode} im Umkreis von {radius} Kilometern am günstigsten?
          var errorSpeechResponse = fuelkingHelper.validateFuelKingSlots(slots);
          if(errorSpeechResponse) {
            returnResponse(fuelkingHelper.createAlexaSpeechJSON(true, errorSpeechResponse));
            return;
          }
          var zipcode = slots.zipcode.value;
          var fuelType = slots.fuelType.value;
          var radius = slots.radius.value;
            fuelType = fuelkingHelper.getFuelTypeDataFormat(fuelType);
            fuelkingConnections.getBestFuelStationByZipcode(zipcode, fuelType, 'dist', 2, function(fuelStation) {
            responseSpeechJSON = fuelkingHelper.createAlexaSpeechJSON(true, 'Test name ' + fuelStation.name);
            returnResponse(responseSpeechJSON);
          });
          break;
        default:
          responseSpeechJSON = fuelkingHelper.createAlexaSpeechJSON(true, 'Ich habe dich nicht verstanden!');
          returnResponse(responseSpeechJSON);
      }
}
