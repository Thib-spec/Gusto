const { Model, DataTypes } = require("sequelize");
const Tags = require("./tags");

class Sales extends Model {

}
Sales.init({
    Id_sale: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Sales_timestamp: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    Cbemv_amount: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    Cbcless_amount: {
        type: DataTypes.CHAR,
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
    fk_Id_frige:{
        type: DataTypes.INTEGER,
        allowNull = false,
        references:{
            model : 'Fridges',
            key: 'Id_fridge'
        }
    }
}, {
    sequelize,
    modelName: 'Sales'
})

Sales.Fridges = Sales.belongsTo(Fridges, {
    foreignKey: 'fk_Id_fridge'
})

Sales.belongsToMany(Tags, {
    through: "tags_sales",
    foreignKey: "Id_tag",
});

Tags.belongsToMany(Sales, {
    through: "tags_sales",
    foreignKey: "Id_sale",
});

module.exports = Sales