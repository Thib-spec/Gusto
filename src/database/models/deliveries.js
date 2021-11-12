const { Model, DataTypes } = require("sequelize");
class Deliveries extends Model {

}
Deliveries.init({
    Id_delivery: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Delivery_timestamp: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    fk_Id_user:{
        type: DataTypes.INTEGER,
        allowNull = false,
        references:{
            model : 'Deliveries',
            key: 'Id_delivery'
        }
    },
    fk_Id_fridge:{
        type: DataTypes.INTEGER,
        allowNull = false,
        references:{
            model : 'Deliveries',
            key: 'Id_delivery'
        }
    }
}, {
    sequelize,
    modelName: 'Deliveries'
})

Deliveries.Users = Deliveries.belongsTo(Users, {
    foreignKey: 'fk_Id_user'
})
Deliveries.Fridges = Deliveries.belongsTo(Fridges, {
    foreignKey: 'fk_Id_fridge'
})

Deliveries.belongsToMany(Tags, {
    through: "tags_deliveries",
    foreignKey: "Id_tag",
});

Tags.belongsToMany(Deliveries, {
  through: "clients_categories",
  foreignKey: "Id_delivery",
});

Deliveries.belongsToMany(Products, {
    through: "products_deliveries",
    foreignKey: "Id_product",
});

Products.belongsToMany(Deliveries, {
    through: "products_deliveries",
    foreignKey: "Id_delivery",
});

module.exports = Deliveries