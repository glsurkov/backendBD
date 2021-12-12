const Sequelize = require('sequelize');
const db = require('../config/database');
const Hotel = require('./Hotel');
const User = require('./User')

const UserHotel = db.define('users_hotel',{
    hotel_order:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
            type:Sequelize.INTEGER,
            references:{
                model:User,
                key:'user_id',
                onDelete:'CASCADE'
            },
        },
    hotel_id:{
            type:Sequelize.INTEGER,
            references:{
                model:Hotel,
                key:'hotel_id',
                onDelete:'CASCADE'
            },
        },
    arrival_date:{
            type:Sequelize.DATEONLY,
            allowNull:false
    },
    departure_date:{
            type:Sequelize.DATEONLY,
            allowNull:false
    },
    active:{
            type:Sequelize.INTEGER,
            allowNull:false,
            defaultValue:1,
            max:1,
            min:0
    }
    },
    {
        timestamps:false
    })

module.exports = UserHotel