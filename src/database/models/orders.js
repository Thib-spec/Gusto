const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Orders extends Model{

        static associate(models){

            Orders.belongsTo(models.Users, {
                foreignKey: 'fk_id_user'
            })

            Orders.belongsTo(models.Fridges,{
                foreignKey:"fk_id_fridge"
            })
            
            Orders.belongsToMany(models.Products, {
                through: "products_orders",
                foreignKey: "fk_id_order",
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
        type: DataTypes.STRING,
        allowNull: false
    },
    expected_delivery_date: {
        type: DataTypes.STRING,
        allowNull: false
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