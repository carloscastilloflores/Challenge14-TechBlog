const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

User.init( 
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                len: [6]
            }
        }
        // post_id: {
        //     type: DataTypes.INTEGER, 
        //     references: {
        //       model: 'post', 
        //       key: 'post_id'
        //     }
        //   }

    },
    {

        hooks: {
            // set up beforeCreate lifecycle hook functionality
            async beforeCreate (newUserData) {
                newUserData.password = await 
                bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await
                bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        }, 

        sequelize, 
        timestamps: false, 
        freezeTableName: true, 
        underscored: true, 
        modelName: 'user'
    }
);

module.exports = User; 