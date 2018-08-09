var fuelkingIntents = require('./fuelking-skill-intents.js');
var fuelkingHelper = require('./fuelking-skill-helper.js');


module.exports.processAlexaRequest = function(req, done) {
  var alexaRequestType = req.body.request.type;
  var speechToResponse;
  //validate activity by request type
    switch(alexaRequestType) {
        case 'LaunchRequest':
          //session starting request
          speechToResponse = fuelkingHelper.createAlexaSpeechJSON(false, 'Fuel King sagt dir wo es den günstigsten Sprit gibt!');
          done(speechToResponse);
          break;
  /*      case 'SessionEndedRequest':
          //session ending request

          break; */
        case 'IntentRequest':
          //session ending request
          fuelkingIntents.createAlexaSpeechResponseByIntent(req.body.request.intent.name, req.body.request.intent.slots, function (responseJSON) {
                speechToResponse = responseJSON;
                done(speechToResponse);
          });
          break;
      default:
          //default operation
          speechToResponse = fuelkingHelper.createAlexaSpeechJSON(true, 'Irgendetwas lief bei deiner Anfrage schief!');
          done(speechToResponse);
  }
};
