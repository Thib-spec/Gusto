const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Orders extends Model{

        static associate(models){

            Orders.belongsTo(models.Users, {
                foreignKey: 'fk_id_user'
            })

            Orders.belongsTo(models.Fridges,{
                foreignKey:{name:"fk_id_fridge", allowNull:false}
            })
            
            Orders.belongsToMany(models.Products, {
                through: "products_orders",
                foreignKey: {name:"fk_id_order", allowNull:true}
            });
            
        }
    }


Orders.init({
    id_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    delivery_date: {
        type: DataTypes.STRING(19),
    },
    expected_delivery_date: {
        type: DataTypes.STRING(19),
    },
}, {
    sequelize,
    modelName: 'Orders',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return Orders

}