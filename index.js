const express = require('express');
const db = require('./config/database');
const airportRouter = require('./routes/airport.routes')
const flightRouter = require('./routes/flight.routes')
const authRouter = require('./routes/auth.routes')
const hotelRouter = require('./routes/hotel.routes')
const aviacompanyRouter = require('./routes/aviacompany.routes')
const countryRouter = require('./routes/country.routes')
const bookRouter = require('./routes/book.routes')
const Airport = require('./models/Airport')
const Aviacompany = require('./models/Aviacompany')
const Flight = require('./models/Flight')
const Country = require('./models/Country')
const Hotel = require ('./models/Hotel')
const UserFlight = require("./models/UserFlight")
const UserHotel = require("./models/UserHotel")
const {Op} = require('sequelize');
const User = require('./models/User')
const path = require('path')
const Image = require('./models/Image')
const sequelize = require('sequelize')



const PORT = process.env.PORT || 8080;
const app = express();

// test db
db.authenticate()
    .then(() => console.log('Database connected ... '))
    .catch(err => console.log('Error: ' + err))

Airport.hasMany(Flight, {
    foreignKey: 'departure_airport_id',
    sourceKey: 'airport_id',
    onDelete:'cascade',
    onUpdate:'CASCADE'
})
Flight.belongsTo(Airport, {
    foreignKey: 'departure_airport_id',
    sourceKey: 'flight_id',
    as:'departure_airport',
    onDelete:'cascade',
    onUpdate:'CASCADE'
})
Flight.belongsTo(Airport, {
    foreignKey: 'arrival_airport_id',
    sourceKey: 'flight_id',
    as:'arrival_airport',
    onDelete:'cascade',
    onUpdate:'CASCADE'
})

Aviacompany.hasMany(Flight, {
    foreignKey: 'company_id',
    sourceKey: 'company_id',
    onDelete:'cascade',
    onUpdate:'CASCADE'
})
Flight.belongsTo(Aviacompany, {
    foreignKey: 'company_id',
    sourceKey: 'flight_id',
    onDelete:'cascade',
    onUpdate:'CASCADE'
})

Country.hasMany(Airport,{
    foreignKey:'airport_country',
    sourceKey:"country_name",
    onDelete:'cascade',
    onUpdate:'CASCADE'
})

Airport.belongsTo(Country,{
    foreignKey:'airport_country',
    sourceKey:'airport_country',
    onDelete:'cascade',
    onUpdate:'CASCADE'
})

Country.hasMany(Hotel,{
    foreignKey:'hotel_country',
    sourceKey:'country_name',
    onDelete:'cascade',
    onUpdate:'CASCADE'
})

Hotel.belongsTo(Country,{
    foreignKey:'hotel_country',
    sourceKey:'hotel_country',
    onDelete:'cascade',
    onUpdate:'CASCADE'
})
Hotel.hasMany(Image,{
    foreignKey:'hotel_id',
    sourceKey:'hotel_id',
    onDelete: 'cascade',
    onUpdate:'CASCADE'
})
Image.belongsTo(Hotel,{
    foreignKey:'hotel_id',
    sourceKey:'hotel_id',
    onDelete:'cascade',
    onUpdate:'CASCADE'
})

User.belongsToMany(Hotel,{through:{model:UserHotel,unique:false},foreignKey:"user_id",onDelete: 'CASCADE',onUpdate:'CASCADE'});
Hotel.belongsToMany(User,{through:{model:UserHotel,unique:false},foreignKey:"hotel_id",onDelete: 'CASCADE',onUpdate:'CASCADE'});
UserHotel.belongsTo(Hotel,{foreignKey:"hotel_id",onDelete:'CASCADE',onUpdate:'CASCADE'})
UserHotel.belongsTo(User,{foreignKey:"user_id",onDelete:'CASCADE',onUpdate:'CASCADE'})
User.hasMany(UserHotel,{foreignKey:"user_id",onDelete:'CASCADE',onUpdate:'CASCADE'})
Hotel.hasMany(UserHotel,{foreignKey:"hotel_id",onDelete:'CASCADE',onUpdate:'CASCADE'})

User.belongsToMany(Flight,{through:{model:UserFlight,unique:false},foreignKey:"user_id",onDelete: 'CASCADE',onUpdate:'CASCADE'});
Flight.belongsToMany(User,{through:{model:UserFlight,unique:false},foreignKey:"flight_id",onDelete: 'CASCADE',onUpdate:'CASCADE'});
UserFlight.belongsTo(Flight,{foreignKey:"flight_id"})
UserFlight.belongsTo(User,{foreignKey:"user_id"})


const isActive = setInterval(async () => {
    const date = new Date();
    let month = date.getMonth() + 1;
    if(month < 10)
    {
        month = '0'+ month;
    }
    let day = date.getDate();
    if(day < 10)
    {
        day = '0'+ day;
    }
    let hours = date.getHours();
    if(hours < 10)
    {
        hours = '0'+ hours;
    }
    let minutes = date.getMinutes();
    if(minutes < 10)
    {
        minutes = '0'+ minutes;
    }
    await Flight.update({
        active:0
    },
        {where:{
            [Op.or]: {
                departure_date: {
                    [Op.lt]: `${date.getFullYear()}-${month}-${day}`
                },
                [Op.and]: {
                    departure_time: {
                        [Op.lte]: `${hours}:${minutes}:00`
                    },
                    departure_date: `${date.getFullYear()}-${month}-${day}`

                }
            }
    }})

    await Hotel.update({
        available:0
    },
        {
            where:{
                rooms_in_stock:0
            }
        })
    await Hotel.update({
            available:1
        },
        {
            where:{
                rooms_in_stock: {
                    [Op.gt]:0
                }
            }
        })

    let transaction;
    try {
        transaction = await db.transaction();

        const response = await UserHotel.update({
                active: 0
            },
            {
                where: {
                    departure_date: {
                        [Op.lt]: `${date.getFullYear()}-${month}-${day}`
                    },
                    active:1
                },
                returning:true,
                transaction
            })

        for(const order of response[1]) {
            await Hotel.update({
                    rooms_in_stock: sequelize.literal('rooms_in_stock + 1')
                },
                {
                    where:{
                        hotel_id:order.hotel_id
                    },
                    transaction
                })
        }

        await transaction.commit();
    }catch(e)
    {
        if (transaction) await transaction.rollback();
    }

    console.log('Обновление актуальности перелетов')
},60000)



app.use(express.json());
app.use('/hotelimages',express.static(path.join(__dirname,'hotelimages')))
app.use('/bookings',bookRouter);
app.use('/countries',countryRouter);
app.use('/aviacompanies',aviacompanyRouter);
app.use('/hotels',hotelRouter);
app.use('/flights',flightRouter)
app.use('/airports',airportRouter);
app.use('/auth',authRouter);


db.sync({alter:true})
    .then(() => app.listen(PORT, () => console.log('Server started')))
    .catch(err => console.log(err))

