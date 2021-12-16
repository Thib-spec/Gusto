const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Tags extends Model{
        static associate(models){

            Tags.belongsTo(models.Products, {
                foreignKey: 'fk_id_product'
            })

            Tags.belongsToMany(models.Deliveries,{
                through:"tags_deliveries",
                foreignKey:{name:"fk_id_tag", allowNull:false}
            })

            Tags.belongsToMany(models.Sales,{       // liaison belongstomany avec sales
                through:"tags_sales",
                foreignKey:{name:"fk_id_tag", allowNull:false}
            })

            Tags.belongsTo(models.Client,{
                foreignKey:"fk_id_client"
            })
        }
    }

    Tags.init({
    id_tag: {
        type: DataTypes.STRING,
        primaryKey: true,
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


