const {DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    class State extends Model{
        static associate(models){

            State.belongsToMany(models.Fridges,{
                through: "fridges_state",
                foreignKey:"fk_id_fridge"
            })
        }
    }

    State.init({                                                 
        id_state: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        label : {
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