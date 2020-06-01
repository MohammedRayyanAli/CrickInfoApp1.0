const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

// Load Player model
const Player = require('../../models/Player');

//  Get all players
router.get('/', (req, res) => {
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(404).json({ noplayersfound: 'No Players found' }));
});

// Get single player by id
router.get('/:id', (req, res) => {
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(err => res.status(404).json({ noplayerfound: 'No player found' }));
});


//  save player
router.post('/', (req, res) => {
  Player.create(req.body)
    .then(player => res.json({ msg: 'player added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this player' }));
});

// Delete player by id
router.delete('/:id', (req, res) => {
  Player.findByIdAndRemove(req.params.id, req.body)
    .then(player => res.json({ mgs: 'Player entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a player' }));
});

module.exports = router;
