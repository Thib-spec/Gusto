const {DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    class Sessions extends Model{
        static associate(models){

            Sessions.belongsTo(models.Users, {                   
                foreignKey: 'fk_Id_user',
                targetKey:"Id_user"
            })
        }
    }

    Sessions.init({                                                 
        Id_session: {
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