const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./User')
const Flight = require('./Flight')

const UserFlight = db.define('users_flight',{
        flight_order:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        user_id:{
            type:Sequelize.INTEGER,
            references:{
                model:User,
                key:'user_id'
            }
        },
        flight_id:{
            type:Sequelize.INTEGER,
            references:{
                model:Flight,
                key:'flight_id'
            }
        }
    },
    {
        timestamps:false
    })

module.exports = UserFlight