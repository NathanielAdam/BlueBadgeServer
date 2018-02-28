module.exports = function(sequelize, DataTypes){
    return sequelize.define('GameSystem', {
            consoleName:DataTypes.STRING,
            consoleImg:DataTypes.STRING,
            owner:DataTypes.INTEGER
    })
    
};
