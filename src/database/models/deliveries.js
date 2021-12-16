const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    class Deliveries extends Model{
        static associate(models){
        
            Deliveries.belongsTo(models.Users, {
                foreignKey: {name:'fk_id_user', allowNull:false}
            })
            Deliveries.belongsTo(models.Fridges, {
                foreignKey: {name:'fk_id_fridge',allowNull:false}
            })
            
            Deliveries.belongsToMany(models.Tags, {     
                through: "tags_deliveries",
                foreignKey: {name:"fk_id_delivery", allowNull:false}
            });
            
       
            Deliveries.belongsToMany(models.Products, {
                through: "products_deliveries",
                foreignKey: {name:"fk_id_delivery", allowNull:false}
            });

            Deliveries.belongsTo(models.Orders,{
                foreignKey:{name:"fk_id_order", allowNull:false}
            })
            
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
        type: DataTypes.STRING(19),
    },

    planned_date:{
        type:DataTypes.STRING(19),
    },

    creation_date:{
        type:DataTypes.STRING(19),
        allowNull:false
    }
   
}, {
    sequelize,
    modelName: 'Deliveries',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Deliveries
}
