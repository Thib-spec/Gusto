const { Model, DataTypes } = require("sequelize");
const Users = require("./Users");

class Sessions extends Model {
}

Sessions.init({                                                 //définition du modèle  
    fk_Id_user:{                                                //définition des attributs (clés primaires, étrangères)
        type: DataTypes.INTEGER,
        allowNull = false,
        references:{
            model : 'Users',
            key: 'Id_user'
        }
    }
}, {
    sequelize,
    modelName: 'Sessions'
})

Sessions.Users = Sessions.belongsTo(Users, {                    //association Users-Sessions
    foreignKey: 'fk_Id_user'
})

module.exports = Sessions


// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Session extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here

//      // ---------- Session relation ---------- //
     
//       this.belongsTo(models.User, {
//         as: 'user',
//         foreignKey: {
//           name: "userId",
//           allowNull: false
//         },
//         targetKey: 'id',
//                 onDelete: "cascade"
//       })
//     }
//   };
//   Session.init({
    
//   }, {
//     sequelize,
//     modelName: 'Session',
//   });
//   return Session;
// };