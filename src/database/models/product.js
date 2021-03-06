const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Products extends Model{
        static associate(models){

            Products.belongsTo(models.Categories, {
                foreignKey: 'fk_id_category'
            })
            
            Products.belongsToMany(models.Sales, {   
                through: "products_sales",
                foreignKey: "fk_id_sale",
            });
            
            Products.belongsToMany(models.Deliveries, {
                through: "products_deliveries",
                foreignKey: "fk_id_delivery",
            });

            Products.belongsToMany(models.Menus, {      
                through: "menus_products",
                foreignKey: "fk_id_menu",
            });

            Products.belongsToMany(models.Orders, {
                through: "products_orders",
                foreignKey: "fk_id_order",
            });

            Products.belongsToMany(models.MenusPresets,{
                through:"menusPresets_products",
                foreignKey:"fk_id_menu_preset"
            })
        }
    }

    Products.init({
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity_min: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity_max: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
   
    ubd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
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