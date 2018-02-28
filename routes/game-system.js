var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js')
var GameSystem = sequelize.import('../models/game-system.js');



router.post('/', function(req,res){
    var consoleName = req.body.GameSystem.consoleName;
    var consoleImg = req.body.GameSystem.consoleImg
    var owner = req.user.id
    GameSystem.create({
        consoleName: consoleName,
        consoleImg: consoleImg,
        owner: owner
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
    var owner = req.user.id
    GameSystem.findAll({where:{owner:owner}})
    .then(
        function getConsoleSucess(console){
            res.json(console)
        },
        function getConsoleFailure(err){
            res.send('failed to get list', err.message)
        }

    )
})
router.delete('/', function(req, res) {
    let data = req.body.id
    GameSystem.destroy({
        where:{id: data}
    }).then(
        function deleteConsoleSucess(data) {
            res.send("console removed")
        },
        function deleteConsoleFailure(err) {
            res.send(502, err.message)
        }
    )
})
module.exports = router