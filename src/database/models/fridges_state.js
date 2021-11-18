const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class fridges_state extends Model{
    }


fridges_state.init({

Id_fridges_state:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
},

    Timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'fridges_state',
    timestamps: true,

})

return fridges_state

}