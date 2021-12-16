const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Sales extends Model{
        static associate(models){

            Sales.belongsTo(models.Fridges, {
                foreignKey: {name:'fk_id_fridge', allowNull:false}
            })
            
            Sales.belongsToMany(models.Tags, {
                through: "tags_sales",
                foreignKey: {name:"fk_id_sale", allowNull:false}
            });
            
            Sales.belongsToMany(models.Products, {
                through: "products_sales",
                foreignKey: {name:"fk_id_sale", allowNull:false}
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
        type: DataTypes.STRING(19),
        allowNull: false
    },
    cbemv_amount: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    cbcless_amount: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    lv_amount: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    lv_quantity: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    cash_amount: {
        type: DataTypes.SMALLINT,   
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