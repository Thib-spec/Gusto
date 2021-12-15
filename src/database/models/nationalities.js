const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Nationalities extends Model{

        static associate(models){
            
            Nationalities.belongsToMany(models.Fridges, {
                through: "fridges_nationalities",
                foreignKey: {name:"fk_id_nationality", allowNull:false}
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
        type: DataTypes.STRING(10),
        allowNull: false
    },

    image: {
        type:DataTypes.STRING(50),
    }
    
}, {
    sequelize,
    modelName: 'Nationalities',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return Nationalities

}