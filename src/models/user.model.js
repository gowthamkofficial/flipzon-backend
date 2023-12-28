const { sequelize } = require("../configs/database");
const { Op, where } = require("sequelize");
const { DataTypes } = require('sequelize');
const { Failure } = require("../common/response.model");
const { checkNull } = require("../common/common");

const USER = sequelize.define('users', {
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

class UserModel {
    user
    constructor() {
        this.user = USER
    }




    async checkDuplicate(req, res, next) {


        console.log(req.body)
        const { email, mobileNumber } = req.body;

        const existingMobile = await USER.findOne({ where: { mobileNumber } })

        const existingEmail = await USER.findOne({ where: { email } })

        if (!checkNull(existingMobile)) {

            if (!checkNull(existingEmail)) {

                next()

            } else {
                res.status(500).json(new Failure('Email already exists'))
            }


        } else {
            res.status(500).json(new Failure('Mobile already exists'))
        }
    }

}


module.exports = UserModel