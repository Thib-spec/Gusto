const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class fridges_state extends Model{
    }


fridges_state.init({

id_fridges_state:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
},

    states_timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'fridges_states',
    timestamps: true,

})

return fridges_state

}