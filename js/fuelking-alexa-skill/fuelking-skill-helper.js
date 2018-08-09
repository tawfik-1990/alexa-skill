var e5 = ["e5","super","benzin","sprit"];
var e10 = ["e10", "super e10","benzin e10"];

module.exports.getFuelTypeDataFormat = function(slot){
  var fuelType = '';
  if (e5.includes(slot)){
      fuelType = 'e5';
    } else if(e10.includes(slot)) {
        fuelType = 'e10';
    } else if (slot =='diesel'){
        fuelType = 'diesel';
    }
  return fuelType;
}


module.exports.createAlexaSpeechJSON = function(shouldEndSession, toSpeak) {
    speechObj = {
      'version': '1.0',
      'response': {
        'shouldEndSession': shouldEndSession,
        'outputSpeech': {
          'type': 'SSML',
          'ssml': '<speak>'+toSpeak+'</speak>'
        }
      }
    };
 return speechObj;
};


module.exports.validateFuelKingSlots = function(slots) {
  var errorSpeechResponse = ''; //Final response
  var errorCount = 0; // Count all invalid Slots/Params
  var invalidParams = ''; // Create a string with listed invalid Slots/Params
  var maxRadius = ''; // Set a string when the radius is to large
  
  if(slots.zipcode) {
    if(!slots.zipcode.value || slots.zipcode.value == '?' ) {
       invalidParams = 'die Postleitzahl ';
       errorCount++;
    }
  }
  
  if(slots.fuelType) {
    console.log(this.getFuelTypeDataFormat(slots.fuelType.value));
    if(!slots.fuelType.value || this.getFuelTypeDataFormat(slots.fuelType.value) === '') {
      if (errorCount > 0){
         invalidParams += 'und ';
      }
      invalidParams += 'den Benzintyp ';
      errorCount++;
    }
  }
  
  if(slots.radius) {
    if(!slots.radius.value || slots.radius.value == '?' ) {
      if (errorCount > 0){
         invalidParams += 'und ';
      }
      invalidParams += 'den Radius ';
      errorCount++;
      
    } else if (slots.radius.value > 25 ) {
      //maximum radius reached
      maxRadius = ' Der maximale Radius liegt bei 25 Kilometern';

    }
    
  }
  
  if (errorCount > 0){
    errorSpeechResponse = 'Ich habe '+ invalidParams + 'nicht verstanden.';
  } 
    errorSpeechResponse += maxRadius;
  
  //Ich habe  den Benzintyp, den Radius  nicht verstanden
  return errorSpeechResponse;
};
