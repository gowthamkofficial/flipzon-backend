const { sequelize } = require("../configs/database");

const { DataTypes } = require('sequelize')

class UserModel {

    constructor() { }

    user = sequelize.define('users', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    })

}
 

module.exports = UserModel