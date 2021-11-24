const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {

class Categories extends Model{

    static associate(models){
        
       Categories.belongsTo(models.Client,{
           foreignKey: 'fk_id_client'               // à tester
       })
    }
}

Categories.init({

    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    label: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING(150),
    },
    description: {
        type: DataTypes.STRING(150),
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



