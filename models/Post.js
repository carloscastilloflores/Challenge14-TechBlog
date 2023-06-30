const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {}

Post.init( 
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true,

        },
        title: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        content: {
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        date: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING, 
            references: {
                model: 'user', 
                key: 'id'
              }
        }
    },
    {
        // hooks: {
        //     // set up beforeCreate lifecycle hook functionality
        //     async beforeCreate (newUserData) {
        //         newUserData.password = await 
        //         bcrypt.hash(newUserData.password, 10);
        //         return newUserData;
        //     },
        //     async beforeUpdate(updatedUserData) {
        //         updatedUserData.password = await
        //         bcrypt.hash(updatedUserData.password, 10);
        //         return updatedUserData;
        //     }
        // }, 

        sequelize, 
        timestamps: false, 
        freezeTableName: true, 
        underscored: true, 
        modelName: 'post'
    }
);

module.exports = Post; 