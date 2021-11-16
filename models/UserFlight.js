const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./User')
const Flight = require('./Flight')

const UserFlight = db.define('users_flight',{
        user_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            references:{
                model:User,
                key:'user_id'
            }
        },
        flight_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
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