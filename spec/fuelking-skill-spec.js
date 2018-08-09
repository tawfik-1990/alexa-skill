var fuelkingSkill = require('../js/fuelking-alexa-skill/fuelking-skill.js');

var simpleIntentRequest = { "body": {
    "session": {
      "sessionId": "SessionId.7cd87411-433c-4fd0-9122-bfd7b3d2d19f",
      "application": {
        "applicationId": "amzn1.ask.skill.35e00a89-643b-4868-891e-62263d3e5196"
      },
      "attributes": {},
      "user": {
        "userId": "amzn1.ask.account.AGAVH7INLZ666RYHLESYHNZBIWLGEOG6FVTSBTBQPOUVOVQ4TOFZPJ2PX646LGT4CTGUMMZZFGQQMICVNXGXUMCHTQ6RLD2H5QPGC3AWKZ6MHKH47UZYHW34N6OI63BZ65UO4RI3GQMV36YWJHQNBRS4P4V4TFLYVW42BKZ52HCDU6ZJNSTRLMTDEOXFXVOG67GLYQAKYICVCMA"
      },
      "new": true
      },
      "request": {
      "type": "IntentRequest",
      "requestId": "EdwRequestId.f77c5a8d-1cb0-4e2c-bc78-369acbbe2560",
      "locale": "de-DE",
      "timestamp": "2017-05-28T10:24:18Z",
      "intent": {
        "name": "FuelKingTest",
        "slots": {
          "zipcode": {
            "name": "zipcode",
            "value": "46236"
          },
          "fuelType": {
            "name": "fuelType"
          }
        }
      }
    },
    "version": "1.0"
  }
};


describe('Test if processAlexaRequest() of fuelking-skill works as expected', function() {
  it('checks returning JSON with speech response for zipcode slot', function(done) {

    fuelkingSkill.processAlexaRequest(simpleIntentRequest, function (speechResponse){
          //expect(speechResponse.version).toBe('1.0');
          //expect(speechResponse.response.outputSpeech.ssml).toBeDefined();
          done();
    });
  });
});

describe('Test RequestType dellegation of processAlexaRequest()', function() {
  it('checks for returning speech response on LaunchRequest', function(done) {
    simpleIntentRequest.body.request.type = 'LaunchRequest';


    fuelkingSkill.processAlexaRequest(simpleIntentRequest, function (speechResponse){
          expect(speechResponse.version).toBe('1.0');
          expect(speechResponse.response.outputSpeech.ssml).toBeDefined();
          expect(speechResponse.response.outputSpeech.ssml).toBe('<speak>Fuel King sagt dir wo es den günstigsten Sprit gibt!</speak>');
          done();
    });
  });
  it('checks for returning speech response on unknown request type', function(done) {
    simpleIntentRequest.body.request.type = 'UnknownRequestTypeTest';


    fuelkingSkill.processAlexaRequest(simpleIntentRequest, function(speechResponse){
          expect(speechResponse.version).toBe('1.0');
          expect(speechResponse.response.outputSpeech.ssml).toBeDefined();
          expect(speechResponse.response.outputSpeech.ssml).toBe('<speak>Irgendetwas lief bei deiner Anfrage schief!</speak>');
          done();
    });
  });
});
