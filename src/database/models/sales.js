const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Sales extends Model{
        static associate(models){

            Sales.belongsTo(models.Fridges, {
                foreignKey: 'fk_id_fridge'
            })
            
            Sales.belongsToMany(models.Tags, {
                through: "tags_sales",
                foreignKey: "fk_id_tag",
            });
            
            Sales.belongsToMany(models.Products, {
                through: "products_sales",
                foreignKey: "fk_id_product",
            });
        }
    }


    Sales.init({
    id_sale: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    sales_timestamp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cbemv_amount: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    cbcless_amount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lv_amount: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    lv_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cash_amount: {
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