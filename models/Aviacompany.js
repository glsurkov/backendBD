const Sequelize = require('sequelize');
const db = require('../config/database');

const Aviacompany = db.define('aviacompany',{
        company_id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        company_name:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        company_phone:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        company_raiting:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
    },
    {
        timestamps:false
    })

module.exports = Aviacompany