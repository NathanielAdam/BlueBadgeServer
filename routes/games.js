var router = require('express').Router();
var sequelize = require('../db.js');
var Game = sequelize.import('../models/games.js');


router.post('/', function(req,res){
    var title = req.body.game.title;
    var genre = req.body.game.genre;
    var gameImg = req.body.game.gameImg;
    var userId = req.body.user.id;

    Game.create({
        title: title,
        genre:genre,
        gameImg:gameImg,
        owner: userId

    }).then(
        //Sequelize is going to retrun the object it created from the db.
        function createGameSucess(Game){
           
            // successful get this
            res.json({
                Game:Game,
                message: "game received"
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
})



router.get('/', function(req, res) {
    Game.findAll({where: {owner:userId}})
    .then(
        function getGameSucess(Game){
            res.json({
                Game:Game,
                message: "game list printed"
            });
        },
        function getGameFailure(err){
            res.send(500, err.message);
        }
    )
})




module.exports = router;