const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Tech extends Model{
        static associate(models){

            Tags.belongsTo(models.Products, {
                foreignKey: 'fk_Id_product'
            })

            Tags.belongsToMany(models.Deliveries,{
                through:"tags_deliveries",
                foreignKey:"fk_Id_delivery"
            })

            Tags.belongsToMany(models.Sales,{       // liaison belongstomany avec sales
                through:"tag_sales",
                foreignKey:"fk_Id_sale"
            })
        }
    }

    Tech.init({
    Id_tech: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Label: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Tech',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Tech

}