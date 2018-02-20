var router = require('express').Router();
var sequelize = require('../db.js');
var GameSystem = sequelize.import('../models/game-system.js');
var bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req,res){
    var consoleName = req.body.GameSystem.consoleName;
    // var owner = req.user
    GameSystem.create({
        consoleName: consoleName,
        // owner: user.id
    }).then(
        function createConsoleSucess(console) {
            res.json(console)
        },
        function createConsoleFailure(err){
            res.send('console create failed', err.message)
        }
    )
})

router.get('/', function(req, res) {
    GameSystem.findAll()
    .then(
        function getConsoleSucess(console){
            res.json(console)
        },
        function getConsoleFailure(err){
            res.send('failed to get list', err.message)
        }

    )
})
module.exports = router