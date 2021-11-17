const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    class Deliveries extends Model{
        static associate(models){
        
            Deliveries.belongsTo(models.Users, {
                foreignKey: 'fk_Id_user'
            })
            Deliveries.belongsTo(models.Fridges, {
                foreignKey: 'fk_Id_fridge'
            })
            
            Deliveries.belongsToMany(models.Tags, {     
                through: "tags_deliveries",
                foreignKey: "fk_Id_tag",
            });
            
       
            Deliveries.belongsToMany(models.Products, { 
                through: "products_deliveries",
                foreignKey: "fk_Id_product",
            });
            
        }
    }

Deliveries.init({
    Id_delivery: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Delivery_timestamp: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
}, {
    sequelize,
    modelName: 'Deliveries',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Deliveries
}
