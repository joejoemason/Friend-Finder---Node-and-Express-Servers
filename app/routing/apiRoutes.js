// Pull in required dependencies
var path = require('path');

// Import the list of friend entries
var friends = require('../data/friends');


// Export API routes
module.exports = function (app) {
   
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {
        // Capture the user input object
        var userInput = req.body;
        // console.log('userInput = ' + JSON.stringify(userInput));

        var userResponses = userInput.scores;
        // console.log('userResponses = ' + userResponses);

        var matchName = '';
        var matchImage = '';
        var totalDifference = 10000; // Make the initial value big for comparison

        // Examine all existing friends in the list
        for (var i = 0; i < friends.length; i++) {
            // console.log('friend = ' + JSON.stringify(friends[i]));

            // Compute differenes for each question
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }
            // console.log('diff = ' + diff);

            if (diff < totalDifference) {
  

                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        // Add new user
        friends.push(userInput);

        res.json({
            status: 'OK',
            matchName: matchName,
            matchImage: matchImage,
        });
    });
};