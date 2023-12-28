const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");
const statesJson = require("./states");

class MasterModels {

    constructor() { }



    Districts = sequelize.define('districts', {
        districtId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        stateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        district: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        state: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    })


    States = sequelize.define('states', {
        stateId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })


    async statesAndDistricts() {

        statesJson.states.forEach(async ele => {

            const result1 = await this.States.create({ state: ele.state })

            const stateId = result1.dataValues?.stateId;

            if (stateId) {

                ele.districts.forEach(async ele2 => {
                    const result2 = await this.Districts.create({ stateId: stateId, district: ele2, state: ele.state })

                    
                })
            }
        })
    }
}

module.exports = MasterModels