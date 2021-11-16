const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user',{
        user_id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        contact_number:{
            type:Sequelize.STRING,
        },
        username:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false
    })

module.exports = User