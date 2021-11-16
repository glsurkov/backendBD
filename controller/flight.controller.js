const Flight = require("../models/Flight")
const Airport = require("../models/Airport")
const Aviacompany = require("../models/Aviacompany")
const _ = require('lodash');


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

            res.json(newFlight);

        } catch (e) {
            console.log(e);
        }

    }

    async getFlights(req, res) {
        try {
            const flight_params = req.query;
            let Flights;
            console.log(flight_params)
            if (Object.keys(flight_params).length === 0) {
                Flights = await Flight.findAll({
                    include: [
                        {
                            model: Airport,
                            required:true,
                            as:'departure_airport',
                            attributes:['airport_name','airport_country']
                        },
                        {
                            model: Airport,
                            required:true,
                            as:'arrival_airport',
                            attributes:['airport_name','airport_country']
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
                                attributes: ['airport_name', 'airport_country']
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country']
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
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country']
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
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country']
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
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country']
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
                                attributes: ['airport_name', 'airport_country'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                if (flight_params.company_name && !flight_params.arrival_airport && flight_params.arrival_country && !flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
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
                if (!flight_params.company_name && flight_params.arrival_airport && !flight_params.arrival_country && flight_params.departure_airport && !flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
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
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airpprt_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_name: flight_params.departure_airport,
                                    airport_country: flight_params.departure_country
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
                if (flight_params.company_name && !flight_params.arrival_airport && flight_params.arrival_country && flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_country: flight_params.departure_country,
                                    airport_name: flight_params.departure_airport
                                }
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
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
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_name: flight_params.departure_airport,
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
                if (flight_params.company_name && flight_params.arrival_airport && flight_params.arrival_country && flight_params.departure_airport && flight_params.departure_country) {
                    Flights = await Flight.findAll({
                        where: _.omit(flight_params, ['company_name', 'departure_airport', 'departure_country', 'arrival_airport', 'arrival_country']),
                        include: [
                            {
                                model: Airport,
                                required: true,
                                as: 'departure_airport',
                                attributes: ['airport_name', 'airport_country'],
                                where: {
                                    airport_name: flight_params.departure_airport,
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
                                attributes: ['airport_name', 'airport_country'],
                            },
                            {
                                model: Airport,
                                required: true,
                                as: 'arrival_airport',
                                attributes: ['airport_name', 'airport_country'],
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

/*    async updateFlight(req, res) {
        try {
            const flight_id = req.params.id;
            const {
                company_id,
                departure_date,
                departure_time,
                departure_airport_id,
                arrival_date,
                arrival_time,
                arrival_airport_id,
                tickets_in_stock,
                ticket_price
            } = req.body;
            const Flight = await db.query('UPDATE flights SET company_id = $1, departure_date = $2, departure_time = $3, departure_airport_id = $4, arrival_date = $5, arrival_time = $6, arrival_airport_id = $7, tickets_in_stock = $8, ticket_price = $9 WHERE flight_id = $10 RETURNING *', [company_id,departure_date,departure_time,departure_airport_id,arrival_date,arrival_time,arrival_airport_id,tickets_in_stock,ticket_price,flight_id]);
            res.json(Flight.rows[0]);
        } catch (e) {
            console.log(e);
        }
    }*/

    async deleteFlight(req, res) {
        try {
            const flight_id = req.params.id;
            const Flight = await Flight.delete({
                where:{
                    flight_id:flight_id
                }
            })
            res.json(Flight);
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports = new FlightController();