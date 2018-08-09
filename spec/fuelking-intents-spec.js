var fuelkingIntents = require('../js/fuelking-alexa-skill/fuelking-skill-intents.js');

describe("Testing Fuelking Skill Intent delegation", function() {
  describe('Test if createAlexaSpeechResponseByIntent() returns corret object', function() {
    it('checks if JSON template is created correctly by FuelKingTest', function(done) {
      let intentName = 'BestStationInZip';
      let slots = {
          'zipcode': {
            'name': "zipcode",
            'value': "46236"
          },
          "fuelType": {
            "name": "fuelType"
          }
        };
      fuelkingIntents.createAlexaSpeechResponseByIntent(intentName, slots, function (responseJSON) {

            expect(responseJSON).toBeDefined();
            expect(responseJSON.version).toBe('1.0');
            expect(responseJSON.response.outputSpeech.ssml).toBeDefined();
            done();
      });
    });
    it('checks if JSON template is created correctly on BestStationInZipForFuelType Intent', function(done) {
      let intentName = 'BestStationInZipForFuelType';
      let slots = {
          'zipcode': {
            'name': "zipcode",
            'value': "46236"
          },
          "fuelType": {
            "name": "fuelType",
            "value": "diesel"
          }
        };
      fuelkingIntents.createAlexaSpeechResponseByIntent(intentName, slots, function (responseJSON) {

            expect(responseJSON).toBeDefined();
            expect(responseJSON.version).toBe('1.0');
            expect(responseJSON.response.outputSpeech.ssml).toBeDefined();
            //console.log(responseJSON);
            done();
      });
    });
    it('checks if JSON template is created correctly on BestStationInZipForFuelTypeInRadius Intent', function(done) {
      let intentName = 'BestStationInZipForFuelTypeInRadius';
      let slots = {
          'zipcode': {
            'name': "zipcode",
            'value': "46236"
          },
          "fuelType": {
            "name": "fuelType",
            "value": "diesel"
          },
          "radius": {
            "name": "radius",
            "value": "20"
          }
        };
      fuelkingIntents.createAlexaSpeechResponseByIntent(intentName, slots, function (responseJSON) {

            expect(responseJSON).toBeDefined();
            expect(responseJSON.version).toBe('1.0');
            expect(responseJSON.response.outputSpeech.ssml).toBeDefined();
            //console.log(responseJSON);
            done();
      });
    });
  });
  describe('Test if createAlexaSpeechResponseByIntent() catches unknown slots', function() {
    it('checks if JSON template with speech response is created correctly in case of question mark zipcode slot', function(done) {
      let intentName = 'FuelKingTest';
      let slots = {
          'zipcode': {
            'name': "zipcode",
            'value': "?"
          },
          "fuelType": {
            "name": "fuelType"
          }
        };
      fuelkingIntents.createAlexaSpeechResponseByIntent(intentName, slots, function (responseJSON) {

            expect(responseJSON).toBeDefined();
            expect(responseJSON.response.outputSpeech.type).toBe('SSML');
            expect(responseJSON.response.outputSpeech.ssml).toBe('<speak>Ich habe die Postleitzahl nicht verstanden</speak>');
            done();
      });
    });
    it('checks if JSON template with speech response is created correctly in case of question mark fuelType', function(done) {
      let intentName = 'FuelKingTest';
      let slots = {
          'zipcode': {
            'name': "zipcode",
            'value': "?"
          },
          "fuelType": {
            "name": "fuelType",
            'value': "?"
          }
        };
      fuelkingIntents.createAlexaSpeechResponseByIntent(intentName, slots, function (responseJSON) {

            expect(responseJSON).toBeDefined();
            expect(responseJSON.response.outputSpeech.type).toBe('SSML');
            expect(responseJSON.response.outputSpeech.ssml).toBe('<speak>Ich habe den Benzintyp nicht verstanden</speak>');
            done();
      });
    });
    it('checks if JSON template with speech response is created correctly in case of question mark radius', function(done) {
      let intentName = 'FuelKingTest';
      let slots = {
          'zipcode': {
            'name': "zipcode",
            'value': "?"
          },
          "radius": {
            "name": "radius",
            'value': "?"
          }
        };
      fuelkingIntents.createAlexaSpeechResponseByIntent(intentName, slots, function (responseJSON) {

            expect(responseJSON).toBeDefined();
            expect(responseJSON.response.outputSpeech.type).toBe('SSML');
            expect(responseJSON.response.outputSpeech.ssml).toBe('<speak>Ich habe den Radius nicht verstanden</speak>');
            done();
      });
    });
    it('checks returning JSON template for input: too high radius', function(done) {
      let intentName = 'BestStationInZip';
      let slots = {
          'zipcode': {
            'name': "zipcode",
            'value': "?"
          },
          "radius": {
            "name": "radius",
            'value': '30'
          }
        };
      fuelkingIntents.createAlexaSpeechResponseByIntent(intentName, slots, function (responseJSON) {

            expect(responseJSON).toBeDefined();
            expect(responseJSON.response.outputSpeech.type).toBe('SSML');
            expect(responseJSON.response.outputSpeech.ssml).toBe('<speak>Der maximale Radius liegt bei 25 Kilometern</speak>');
            done();
      });
    });
  });
  describe('Test if createAlexaSpeechResponseByIntent() catches unknown Intent name', function() {
    it('checks if JSON template with response is correctly created', function(done) {
      let intentName = 'UnknownTestIntent';
      let slots = {
          'zipcode': {
            'name': "zipcode",
            'value': "?"
          },
          "fuelType": {
            "name": "fuelType"
          }
        };
      fuelkingIntents.createAlexaSpeechResponseByIntent(intentName, slots, function (responseJSON) {

            expect(responseJSON).toBeDefined();
            expect(responseJSON.response.outputSpeech.type).toBe('SSML');
            expect(responseJSON.response.outputSpeech.ssml).toBe('<speak>Ich habe dich nicht verstanden!</speak>');
            done();
      });
    });
  });
});
