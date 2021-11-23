const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Assortment extends Model{

        static associate(models){
            
            Assortment.belongsToMany(models.Menus, {
                through: "assortment_menus",
                foreignKey: "fk_id_menu",
            });

            Assortment.belongsToMany(models.Products,{
                through:"assortment_products",
                foreignKey:"fk_id_product"
            })

            Assortment.hasOne(models.Fridges,{
                foreignKey:"fk_id_assortment"
            })
            
        }
    }


    Assortment.init({
    id_assortment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    label: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
    sequelize,
    modelName: 'Assortment',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return Assortment

}