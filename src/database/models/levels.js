const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Levels extends Model{
        static associate(models){
            Levels.hasMany(models.Users, {
            foreignKey: 'fk_id_level'
          }) 
        }
    }

Levels.init({
    id_level: {
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
    modelName: 'Levels',
    timestamps: true,
    createdAt: true,
    updatedAt: true


    })
    return Levels
}

