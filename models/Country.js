const Sequelize = require('sequelize');
const db = require('../config/database');

const Country = db.define('country',{
        country_name:{
            type:Sequelize.STRING,
            primaryKey:true,
        },
        population:{
            type:Sequelize.INTEGER,
        },
        capital_city:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false
    })

module.exports = Country