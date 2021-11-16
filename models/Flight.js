const Sequelize = require('sequelize');
const db = require('../config/database');
const Airport = require('./Airport');
const Aviacompany = require('./Aviacompany')

const Flight = db.define('flight',{
        flight_id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        company_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{
                model:Aviacompany,
                key:'company_id'
            }
        },
        departure_date:{
            type:Sequelize.DATE,
            allowNull:false,
        },
        departure_time:{
            type:Sequelize.TIME,
            allowNull:false,
        },
        departure_airport_id:{
            type:Sequelize.INTEGER,
            references: {
                model:Airport,
                key:'airport_id'
            }
        },
        arrival_date:{
            type:Sequelize.DATE,
            allowNull:false,
        },
        arrival_time:{
            type:Sequelize.TIME,
            allowNull:false,
        },
        arrival_airport_id:{
            type:Sequelize.INTEGER,
            references:{
                model:Airport,
                key:'airport_id'
            }
        },
        tickets_in_stock:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        ticket_price:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
    },
    {
        timestamps:false
    })


module.exports = Flight