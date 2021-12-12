const Sequelize = require('sequelize');
const db = require('../config/database');
const Hotel = require('../models/Hotel')


const Image = db.define('image',{
    image_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    hotel_id:{
        type:Sequelize.INTEGER,
        references:{
            model:Hotel,
            key:'hotel_id'
        },
        allowNull:false
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    }
},
    {
        timestamps:false
    })

module.exports = Image