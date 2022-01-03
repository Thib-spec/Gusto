const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {

    // Dans ce cas là on a créé un model correspondant à la table de liaison entre fridge et product
    // Normalement il n'est pas nécessaire de le faire car le fait de spécifier dans les modèles les associations permet à sequelize de créer automatiquement ces tables de liaison
    // Cependant , on avit besoin d'ajouter le champ "quantity" dans cette table, on a donc créé un model du même nom que la table de liaison afin de pouvoir la modifier
    // C'est pourquoi dans certain controllers, lorsque le modèle existe, on peut y accéder par Model.["ModelName"] mais sinon on est obligé de passer par les fonctions pré-faite de sequelize afin d'accéder aux données
    // A noter que "id_fridges_products" n'est jamais utilisé mais est nécessaire pour la bonne création du modèle
    class fridges_products extends Model{
    }


    fridges_products.init({

    id_fridges_products:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },

    quantity:{
        type: DataTypes.TINYINT,
        allowNull:false
    },

    }, {
        sequelize,
        modelName: 'fridges_products',
        timestamps: true,

    })

    return fridges_products

}