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
            unique:true
        },
        company_phone:{
            type:Sequelize.STRING,
            allowNull:false,
        }
    },
    {
        timestamps:false
    })

module.exports = Aviacompany