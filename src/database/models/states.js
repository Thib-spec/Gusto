const {DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    class State extends Model{
        static associate(models){

            State.belongsToMany(models.Fridges,{
                through: "fridges_states",
                foreignKey:{name:"fk_id_state", allowNull:false}
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
            type:DataTypes.STRING(20),
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