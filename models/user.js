//user model created using sequelize
//talks to the table user

module.exports = function(sequelize, DataTypes){
    return sequelize.define('user', {
            username:{ 
                type:DataTypes.STRING,
                
                    unique:true
                
            },
            passwordhash: DataTypes.STRING,
            email: {
                type:DataTypes.STRING,
                allowNull: false,
                validate:{
                    isEmail: true
                }
            },
            modal: DataTypes.BOOLEAN
    })
};
