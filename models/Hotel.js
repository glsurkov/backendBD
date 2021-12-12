const Sequelize = require('sequelize');
const db = require('../config/database');
const Country = require('../models/Country')

const Hotel = db.define('hotel',{
        hotel_id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        hotel_country:{
            type:Sequelize.STRING,
            references:{
                model:Country,
                key:'country_name'
            },
            allowNull:false
        },
        room_price:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        rooms_in_stock:{
            type:Sequelize.INTEGER,
            allowNull:false,
            validate:{
                min:0
            }
        },
        hotel_name:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true
        },
        hotel_city:{
            type:Sequelize.STRING,
            allowNull:false
        },
        available:{
            type:Sequelize.INTEGER,
            allowNull:false,
            defaultValue:1,
            validate:{
                min:0,
                max:1
            }
        }
    },
    {
        timestamps:false
    })

module.exports = Hotel