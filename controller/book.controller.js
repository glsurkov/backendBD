const db = require('../config/database')
const sequelize = require('sequelize')
const Flight = require('../models/Flight')
const User = require('../models/User')
const UserFlight = require('../models/UserFlight')
const Hotel = require('../models/Hotel')
const UserHotel = require('../models/UserHotel')

class BookController{

   async bookFlight(req,res){

       const user = req.info.id;
       const flight = req.body.flight_id;
       const price = req.body.ticket_price;

       let transaction;

        try{
            transaction = await db.transaction();

            await Flight.update(
                {
                    tickets_in_stock: sequelize.literal('tickets_in_stock - 1')
                },
                {
                    where:{
                        flight_id: flight
                    },
                    transaction
                }
            );

            await User.update(
                {
                    balance: sequelize.literal(`balance - ${price}`)
                },
                {
                    where:{
                        user_id: user
                    },
                    transaction
                }
            );

            await UserFlight.create(
                {
                    user_id:user,
                    flight_id:flight
                },
                {
                    transaction
                }
            )

            await transaction.commit();
            res.status(200).json({message:"Успешно забронирован"})

        }catch(e)
        {
            res.status(500).json({message: e})
            if (transaction) await transaction.rollback();
        }
    }

    async bookHotel(req,res){

        const user = req.info.id;
        const hotel = req.body.hotel_id;
        const price = req.body.room_price;
        const arrival = req.body.arrival_date;
        const arrival_date = new Date(arrival);
        const departure = req.body.departure_date
        const departure_date = new Date(departure);
        const payment = price*(departure_date-arrival_date)/86400000;

        console.log(payment);

        let transaction;

        try{
            transaction = await db.transaction();

            await Hotel.update(
                {
                    rooms_in_stock: sequelize.literal('rooms_in_stock - 1')
                },
                {
                    where:{
                        hotel_id:hotel
                    },
                    transaction
                }
            );

            await User.update(
                {
                    balance: sequelize.literal(`balance - ${payment}`)
                },
                {
                    where:{
                        user_id: user
                    },
                    transaction
                }
            );

            await UserHotel.create(
                {
                    user_id:user,
                    hotel_id:hotel,
                    arrival_date:arrival,
                    departure_date:departure
                },
                {
                    transaction
                }
            )

            await transaction.commit();
            res.status(200).json({message:"Успешно забронирован"})

        }catch(e)
        {
            res.status(500).json({message:`${e}`})
            if (transaction) await transaction.rollback();
        }
    }




}

module.exports = new BookController();