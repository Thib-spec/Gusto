const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Products extends Model{
        static associate(models){

            Products.belongsTo(models.Categories, {
                foreignKey: {name:'fk_id_category', allowNull:false}
            })
            
            Products.belongsToMany(models.Sales, {   
                through: "products_sales",
                foreignKey: {name:"fk_id_product", allowNull:false}
            });
            
            Products.belongsToMany(models.Deliveries, {
                through: "products_deliveries",
                foreignKey: {name:"fk_id_product", allowNull:false}
            });

            Products.belongsToMany(models.Menus, {      
                through: "menus_products",
                foreignKey: {name:"fk_id_product", allowNull:false}
            });

            Products.belongsToMany(models.Orders, {
                through: "products_orders",
                foreignKey: {name:"fk_id_product", allowNull:false}
            });

            Products.belongsToMany(models.FridgePresets,{
                through:"fridgePresets_products",
                foreignKey:{name:"fk_id_product", allowNull:false}
            })

            
            Products.belongsToMany(models.Fridges,{
                through:"fridges_products",
                foreignKey:{name:"fk_id_product", allowNull:false}
                
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
        type: DataTypes.STRING(20),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(50),
    },
    price: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
   
    ubd: {
        type: DataTypes.TINYINT,
    },
    description: {
        type: DataTypes.STRING(200),
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