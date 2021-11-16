const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Sales extends Model{
        static associate(models){

            Sales.belongsTo(models.Fridges, {
                foreignKey: 'fk_Id_fridge'
            })
            
            Sales.belongsToMany(models.Tags, {
                through: "tags_sales",
                foreignKey: "fk_Id_tag",
            });
            
            Sales.belongsToMany(models.Products, {
                through: "product_sales",
                foreignKey: "fk_Id_product",
            });
        }
    }


    Sales.init({
    Id_sale: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Sales_timestamp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Cbemv_amount: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    Cbcless_amount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Lv_amount: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    Lv_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Cash_amount: {
        type: DataTypes.DECIMAL(5,2),   
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Sales',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Sales

}