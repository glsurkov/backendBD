const Sequelize = require('sequelize');
const db = require('../config/database');
const Hotel = require('./Hotel');
const User = require('./User')

const UserHotel = db.define('users_hotel',{
        user_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            references:{
                model:User,
                key:'user_id'
            }
        },
    hotel_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            references:{
                model:Hotel,
                key:'hotel_id'
            }
        }
    },
    {
        timestamps:false
    })

module.exports = UserHotel