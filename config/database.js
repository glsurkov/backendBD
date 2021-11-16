const Sequelize = require('sequelize');
module.exports = new Sequelize('airbook3','postgres','12345678',{
    host:'localhost',
    dialect:'postgres',
    operatorsAliases:false,
    pool: {
        max: 10,
        min: 0,
        acquire:30000,
        idle:10000
    },
})
