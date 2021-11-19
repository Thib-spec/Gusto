const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Tags extends Model{
        static associate(models){

            Tags.belongsTo(models.Products, {
                foreignKey: 'fk_id_product'
            })

            Tags.belongsToMany(models.Deliveries,{
                through:"tags_deliveries",
                foreignKey:"fk_id_delivery"
            })

            Tags.belongsToMany(models.Sales,{       // liaison belongstomany avec sales
                through:"tags_sales",
                foreignKey:"fk_id_sale"
            })
        }
    }

    Tags.init({
    id_tag: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
}, {
    sequelize,
    modelName: 'Tags',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Tags
}


