const { DataTypes,sequelize } = require("./connexion");
const Client = require('./client')
const Users = require("./users")
const Fridges = require("./fridges")


const Badges = sequelize.define('Badges',{
    Id_badge: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fk_Id_client: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model : 'Badges',
            key: 'Id_badges'
    },
    fk_Id_user: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model : 'Badges',
            key: 'Id_badges'
        }
    }
}})

Badges.Client = Badges.belongsTo(Client, {
    foreignKey: 'fk_Id_client'
})

Badges.Users = Badges.belongsTo(Users, {
    foreignKey: 'fk_Id_user'
})

Fridges.belongsToMany(Badges, {             //association many-to-many (en cas de création de table de liaison)
    through: "fridges_badges",
    foreignKey: "Id_fridge",
  });

Badges.belongsToMany(Fridges, {
  through: "fridges_badges",
  foreignKey: "Id_badge",
});

module.exports = Badges