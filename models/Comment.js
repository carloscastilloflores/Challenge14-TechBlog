const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {}

Comment.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'user',
            key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'post',
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
        modelName: 'comment'
    }
);

module.exports = Comment; 