const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Technologies extends Model{
        static associate(models){

         
        }
    }

    Technologies.init({
    id_technologies: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    label: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Technologies',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Technologies

}