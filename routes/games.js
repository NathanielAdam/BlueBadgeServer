var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js')
var Game = sequelize.import('../models/game');


router.post('/', function(req,res){
    var title = req.body.game.title;//error here, get help |Cannot read property 'title' of undefined 
    var genre = req.body.game.genre;
    var gameImg = req.body.game.gameImg;
    var owner = req.user.id

    Game.create({
        title: title,
        genre:genre,
        gameImg:gameImg,
        owner: owner
        
    }).then(
        //Sequelize is going to retrun the object it created from the db.
        function createGameSucess(Game){
           
            // successful get this
            res.json({
                Game:Game,
                message:"Fine whatever"
            });
        },
        function createError(err){
            res.send(req.user);
        }
    );
})



router.get('/', function(req, res) {
    var owner = req.user.id;
     Game.findAll({where: {owner:owner}})
    .then(
        function getGameSucess(Game){
            res.json({
                Game:Game,
                message: "game list printed"
            });
        },
        function getGameFailure(err){
            res.send(501, err.message);
        }
    )
})


router.delete('/', function(req, res) {
    let data = req.body.game.id
    Game.destroy({
        where:{ id: data}
    }).then(
        function deleteGameSucess(data) {
            res.send("Game removed")
        },
        function deleteGameFailure(err) {
            res.send(502, err.message)
        }
    )
})

router.put('/',function(req,res){
     
    Game.update(
        {
            title:req.body.game.title,
            genre:req.body.game.genre,
            gameImg:req.body.game.gameImg
        },
        {where:{id:req.body.game.gameId} }
    ).then(
        function updateGameSuccess(updateGame){
            res.send(updateGame)
        },
        function updateGameFailure(err){
            res.send(500, err.message)
        }
    )
})
module.exports = router;