const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {

class Categories extends Model{

    static associate(models){
        
       Categories.belongsTo(models.Client,{
           foreignKey:{ name: 'fk_id_client', allowNull:false }             
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
        type: DataTypes.STRING(20),
        allowNull:false
    },
    image: {
        type: DataTypes.STRING(50),
    },
    description: {
        type: DataTypes.STRING(200),
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



