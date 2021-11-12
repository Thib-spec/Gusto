const { Model, DataTypes } = require("sequelize");

class Tags extends Model {
    getFullName() {
        return [this.firstname, this.lastname].join(' ')
    }
}

Tags.init({
    Id_tags: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Tags'
})

module.exports = Tags