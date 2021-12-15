const Flight = require("../models/Flight")
const Airport = require("../models/Airport")
const Aviacompany = require("../models/Aviacompany")
const User = require('../models/User')
const _ = require('lodash');
const db = require("../config/database");
const sequelize = require("sequelize");


class FlightController {

    async createFlight(req, res) {
        try {
              const {
                company_name,
                departure_date,
                departure_time,
                departure_airport_name,
                arrival_date,
                arrival_time,
                arrival_airport_name,
                tickets_in_stock,
                ticket_price
            } = req.body;
              const aviacompany = await Aviacompany.findOne({attributes:['company_id'],where:{
                    company_name:company_name
                }});
            const departure_airport = await Airport.findOne({where:{
                    airport_name:departure_airport_name
                }});
            const arrival_airport = await Airport.findOne({where:{
                    airport_name: arrival_airport_name
                }});

            const newFlight = await Flight.create({
                company_id: aviacompany.company_id,
                departure_date:departure_date,
                departure_time:departure_time,
                departure_airport_id:departure_airport.airport_id,
                arrival_date:arrival_date,
                arrival_time:arrival_time,
                arrival_airport_id:arrival_airport.airport_id,
                tickets_in_stock:tickets_in_stock,
                ticket_price:ticket_price
                }
            )

            res.status(200).json(newFlight);

        } catch (e) {
            res.status(400).json({message:'Error'})
            console.log(e);
        }

    }

    async getFlights(req, res) {
        try {
            const flight_params = req.query;
            for (let prop in flight_params){
                console.log(prop)
                if (flight_params[prop] === '') {
                    delete flight_params[prop];
                }
            }
            let Flights;
            if (Object.keys(flight_params).length === 0) {
                Flights = await Flight.findAll({
                    include: [
                        {
                            model: Airport,
                            required:true,
                            as:'departure_airport',
                            attributes:['airport_name','airport_country','airport_city']
                        },
                        {
                            model: Airport,
                            required:true,
                            as:'arrival_airport',
                            attributes:['airport_name','airport_country','airport_city']
                        },
                        {
                            model:Aviacompany,
                            required:true,
                            attributes:['company_name']
                        }
                        ]
                })
                res.json(Flights);
            } else {
                if (flight_params.company_name && !flight_params.departure_airport && !flight_params.departure_country && !flight_params.arrival_airport && !flight_params.arrival_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city']
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city']
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && flight_params.departure_airport && flight_params.departure_country && !flight_params.arrival_airport && !flight_params.arrival_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city']
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && flight_params.departure_airport && !flight_params.departure_country && !flight_params.arrival_airport && !flight_params.arrival_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city']
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && !flight_params.departure_airport && flight_params.departure_country && !flight_params.arrival_airport && !flight_params.arrival_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city']
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && flight_params.arrival_airport && flight_params.arrival_country && !flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.arrival_airport,
                                    airport_country: flight_params.arrival_country
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && flight_params.arrival_airport && !flight_params.arrival_country && !flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.arrival_airport,
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && !flight_params.arrival_airport && flight_params.arrival_country && !flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && flight_params.arrival_airport && !flight_params.arrival_country && !flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && !flight_params.arrival_airport && flight_params.arrival_country && !flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && !flight_params.arrival_airport && !flight_params.arrival_country && flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && !flight_params.arrival_airport && !flight_params.arrival_country && !flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name','airport_city'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && flight_params.arrival_airport && !flight_params.arrival_country && flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.arrival_aiport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && flight_params.arrival_airport && !flight_params.arrival_country && !flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && !flight_params.arrival_airport && flight_params.arrival_country && flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && !flight_params.arrival_airport && flight_params.arrival_country && !flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && flight_params.arrival_airport && flight_params.arrival_country && !flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country,
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && !flight_params.arrival_airport && !flight_params.arrival_country && flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && flight_params.arrival_airport && !flight_params.arrival_country && flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && !flight_params.arrival_airport && flight_params.arrival_country && !flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && flight_params.arrival_airport && !flight_params.arrival_country && !flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && !flight_params.arrival_airport && flight_params.arrival_country && flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && flight_params.arrival_airport && flight_params.arrival_country && flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country,
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && flight_params.arrival_airport && flight_params.arrival_country && !flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_country: flight_params.arrival_country,
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && flight_params.arrival_airport && !flight_params.arrival_country && flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && !flight_params.arrival_airport && flight_params.arrival_country && flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airpprt_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && flight_params.arrival_airport && flight_params.arrival_country && flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country,
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && flight_params.arrival_airport && flight_params.arrival_country && !flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country,
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && flight_params.arrival_airport && !flight_params.arrival_country && flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && !flight_params.arrival_airport && flight_params.arrival_country && flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.departure_country,
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && flight_params.arrival_airport && flight_params.arrival_country && flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country,
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (flight_params.company_name && flight_params.arrival_airport && flight_params.arrival_country && flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                                where: {
                                    airport_country: flight_params.arrival_country,
                                    airport_name: flight_params.arrival_airport
                                }
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                                where: {
                                    company_name: flight_params.company_name
                                }
                            }
                        ]
                    })
                    res.json(Flights);
                }
                if (!flight_params.company_name && !flight_params.arrival_airport && !flight_params.arrival_country && !flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country','airport_city'],
                            },
                            {
                                model: Aviacompany,
                                required: true,
                                attributes: ['company_name'],
                            }
                        ]
                    })
                    res.json(Flights);
                }
            }
        }catch(e){
            res.json([])
            console.log(e);
        }
    }

/*
    async getOneFlight(req, res) {
        try {
            const id = req.params.id;
            const Flight = await db.query(`SELECT * FROM flights WHERE flight_id = $1`, [id]);
            res.json(Flight.rows[0]);
        } catch (e) {
            console.log(e);
        }
    }
*/

    async updateFlight(req, res) {
        try {
            const flight_id = req.query.flight_id;
            const {
                company_name,
                departure_date,
                departure_time,
                departure_airport,
                arrival_date,
                arrival_time,
                arrival_airport,
                tickets_in_stock,
                ticket_price
            } = req.body;

            let transaction;
            try {
                transaction = await db.transaction();

                const response1 = await Aviacompany.findOne(
                    {
                        where: {
                            company_name:company_name
                        },
                        transaction
                    })

                const response2 = await Airport.findOne(
                    {
                        where:{
                            airport_name:departure_airport
                        },
                        transaction
                    }
                )

                const response3 = await Airport.findOne(
                    {
                        where:{
                            airport_name:arrival_airport
                        },
                        transaction
                    })
                await Flight.update({
                    departure_date:departure_date,
                    departure_time:departure_time,
                    arrival_date:arrival_date,
                    arrival_time:arrival_time,
                    tickets_in_stock:tickets_in_stock,
                    ticket_price:ticket_price,
                    company_id:response1.company_id,
                    departure_airport_id:response2.airport_id,
                    arrival_airport_id:response3.airport_id,
                },{
                    where:{
                        flight_id:flight_id
                    },
                    transaction
                })
                await transaction.commit();
                res.status(200).json({message:"ok"})
            }catch(e)
            {
                if (transaction) await transaction.rollback();
                res.status(500).json({message:e})
            }
        } catch (e) {
            console.log(e);
        }
    }

    async fetchUserFlights(req,res){
        try{
            const state = req.query.active;
            const id = req.info.id;
            const Flights = await User.findAll({
                where:{
                    user_id:id
                },
                    include: [
                        {
                            model: Flight,
                            required: true,
                            as: 'flights',
                            where:{
                                active : state
                            },
                            include:[
                                {
                                    model:Aviacompany,
                                    required:true,
                                }]

                        }],
                raw:true
                }
            )

            res.json(Flights);
        }catch(e)
        {
            console.log(e);
            res.status(500).json(e)
        }
    }


    async deleteFlight(req, res) {
        try {
            const flight_id = req.query.flight_id;
            await Flight.destroy({
                where:{
                    flight_id:flight_id
                }
            })
            res.status(200);
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports = new FlightController();