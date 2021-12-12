const Airport = require("../models/Airport" )

class AirportController{

    async createAirport(req,res){
        try{
/*            const {airport_name,airport_country,airport_city} = req.body;*/
            console.log(req.body);
            const newAirport = await Airport.create(req.body);
            res.json(newAirport);
        }catch(e)
        {
            console.log(e);
        }
    }

    async getAirports(req,res){
        try{
            const Airports = await Airport.findAll();
            res.json(Airports)
        }catch(e)
        {
            console.log(e);
        }
    }
    async updateAirport(req,res){
        try{
            const airport_id = req.query.airport_id;
            const newAirport = await Airport.update(req.body,
                {
                where:{
                    airport_id: airport_id
                }
                }
            )
            res.status(200).json(newAirport);

        }catch(e)
        {
            res.status(500).json({message:e});
            console.log(e);
        }
    }


    async deleteAirport(req,res){
        try{
            const airport_id = req.query.airport_id;
            if (!airport_id)
            {
                res.status(400).json({message:"Id не указан"});

            }
            await Airport.destroy({where:{
                airport_id:airport_id
                }});
            return res.status(200);
        }catch(e)
        {
            console.log("error");
            res.status(500).json(e);
        }
    }
}

module.exports = new AirportController()