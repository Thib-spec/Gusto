const {DataTypes, Model} = require("sequelize");


// Cette table existe uniquement pour assurer le bon foctionnement de notre login et logout

module.exports = (sequelize) => {
    class Sessions extends Model{
        static associate(models){

            Sessions.belongsTo(models.Users, {                   
                foreignKey: {name:'fk_id_user', allowNull:false},
                targetKey:"id_user"
            })
        }
    }

    Sessions.init({                                                 
        id_session: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
}, {
    sequelize,
    modelName: 'Sessions',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Sessions

}