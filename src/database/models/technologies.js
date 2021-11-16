const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Technologies extends Model{
        static associate(models){

         
        }
    }

    Technologies.init({
    Id_technologies: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Label: {
        type: DataTypes.STRING,
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