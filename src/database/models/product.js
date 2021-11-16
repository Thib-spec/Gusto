const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Products extends Model{
        static associate(models){

            Products.belongsTo(models.Categories, {
                foreignKey: 'fk_Id_category'
            })
            
            Products.belongsToMany(model.Sales, {   // faire la même en sale
                through: "products_sales",
                foreignKey: "fk_Id_sale",
            });
            
            Products.belongsToMany(models.Deliveries, {
                through: "products_deliveries",
                foreignKey: "Id_delivery",
            });

            Products.belongsToMany(models.Menus, {      
                through: "menus_products",
                foreignKey: "Id_menu",
            });
        }
    }

    Products.init({
    Id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Image: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    Price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quantity_min: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quantity_max: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Ubd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    
}, {
    sequelize,
    modelName: 'Products',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Products
}