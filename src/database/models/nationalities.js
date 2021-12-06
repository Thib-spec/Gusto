const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Nationalities extends Model{

        static associate(models){

            Nationalities.hasOne(models.Users, {
                foreignKey: 'fk_id_nationality'
            })
            
            Nationalities.belongsToMany(models.Fridges, {
                through: "fridges_nationalities",
                foreignKey: "fk_id_nationality",
            });
            
        }
    }


Nationalities.init({
    id_nationality: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
}, {
    sequelize,
    modelName: 'Nationalities',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return Nationalities

}