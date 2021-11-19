const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    class Deliveries extends Model{
        static associate(models){
        
            Deliveries.belongsTo(models.Users, {
                foreignKey: 'fk_id_user'
            })
            Deliveries.belongsTo(models.Fridges, {
                foreignKey: 'fk_id_fridge'
            })
            
            Deliveries.belongsToMany(models.Tags, {     
                through: "tags_deliveries",
                foreignKey: "fk_id_tag",
            });
            
       
            Deliveries.belongsToMany(models.Products, { 
                through: "products_deliveries",
                foreignKey: "fk_id_product",
            });
            
        }
    }

Deliveries.init({
    id_delivery: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    delivery_timestamp: {
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
