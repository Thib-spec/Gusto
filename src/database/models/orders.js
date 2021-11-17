const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Orders extends Model{

        static associate(models){

            Orders.belongsTo(models.Users, {
                foreignKey: 'fk_Id_user'
            })

            Orders.belongsTo(models.Fridges,{
                foreignKey:"fk_Id_fridge"
            })
            
            Orders.belongsToMany(models.Products, {
                through: models.products_orders,
                foreignKey: "fk_Id_product",
            });
            
        }
    }


Orders.init({
    Id_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Delivery_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Expected_delivery_date: {
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