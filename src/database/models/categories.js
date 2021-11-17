const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {

class Categories extends Model{

    static associate(models){
        
       Categories.belongsToMany(models.Client,{
           through: 'clients_categories',
           foreignKey: 'fk_Id_client'               // à tester
       })
    }
}

Categories.init({

    Id_categories: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Image: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING(150),
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Categories',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Categories

}



