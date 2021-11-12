const { Model, DataTypes } = require("sequelize");

class Badges extends Model {
}

Badges.init({
    Id_badge: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fk_Id_client: {
        type: DataTypes.INTEGER,
        allowNull = false,
        references:{
            model : 'Badges',
            key: 'Id_badges'
    },
    fk_Id_user: {
        type: DataTypes.INTEGER,
        allowNull = false,
        references:{
            model : 'Badges',
            key: 'Id_badges'
    }
}
}}, {
    sequelize,
    modelName: 'Badges'
})

Badges.Client = Badges.belongsTo(Client, {
    foreignKey: 'fk_Id_client'
})

Badges.Users = Badges.belongsTo(Users, {
    foreignKey: 'fk_Id_user'
})

module.exports = Badges