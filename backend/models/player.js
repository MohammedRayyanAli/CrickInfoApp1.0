let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Player Model Definition
let playerSchema = Schema({
    player_name: {
        type: String,
        required: true,
    },
    player_dob: {
        type: Date,
        required: true
    },
    player_team: {
        type: String,
        required: true
    },
    player_matches: {
        type: String,
        required: true
    },
    player_runs: {
        type: String,
        required: true
    },
    player_avg: {
        type: String,
        required: true
    }
});

module.exports = Player = mongoose.model('player', playerSchema);
