const express = require('express');
const db = require('./config/database');
const airportRouter = require('./routes/airport.routes')
const flightRouter = require('./routes/flight.routes')
const authRouter = require('./routes/auth.routes')
const hotelRouter = require('./routes/hotel.routes')
const aviacompanyRouter = require('./routes/aviacompany.routes')
const countryRouter = require('./routes/country.routes')
const Airport = require('./models/Airport')
const Aviacompany = require('./models/Aviacompany')
const Flight = require('./models/Flight')
const Country = require('./models/Country')
const UserFlight = require("./models/UserFlight")
const UserHotel = require("./models/UserHotel")



const PORT = process.env.PORT || 8080;
const app = express();

// test db
db.authenticate()
    .then(() => console.log('Database connected ... '))
    .catch(err => console.log('Error: ' + err))

Airport.hasMany(Flight, {
    foreignKey: 'departure_airport_id',
    sourceKey: 'airport_id',
})
Flight.belongsTo(Airport, {
    foreignKey: 'departure_airport_id',
    sourceKey: 'flight_id',
    as:'departure_airport'
})
Flight.belongsTo(Airport, {
    foreignKey: 'arrival_airport_id',
    sourceKey: 'flight_id',
    as:'arrival_airport'
})

Aviacompany.hasMany(Flight, {
    foreignKey: 'company_id',
    sourceKey: 'company_id',
})
Flight.belongsTo(Aviacompany, {
    foreignKey: 'company_id',
    sourceKey: 'flight_id',
})



app.use(express.json());
app.use('/countries',countryRouter);
app.use('/aviacompanies',aviacompanyRouter);
app.use('/hotels',hotelRouter);
app.use('/flights',flightRouter)
app.use('/airports',airportRouter);
app.use('/auth',authRouter);


db.sync({alter:true})
    .then(() => app.listen(PORT, () => console.log('Server started')))
    .catch(err => console.log(err))

