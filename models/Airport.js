const Sequelize = require('sequelize');
const db = require('../config/database')

const Airport = db.define('airport',{
        airport_id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        airport_name:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true
        },
        airport_country:{
            type:Sequelize.STRING,
            allowNull:false,
            references:{
                model:'countries',
                key:'country_name'
            }
        },
        airport_city:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false
    })


module.exports = Airport