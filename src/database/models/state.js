const {DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    class State extends Model{
        static associate(models){

            State.belongsToMany(models.Fridges,{
                through: "fridges_state",
                foreignKey:"fk_Id_fridge"
            })
        }
    }

    State.init({                                                 
        Id_state: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Label : {
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName: 'State',
        timestamps: true,
        createdAt: true,
        updatedAt: true
    })

return State

}