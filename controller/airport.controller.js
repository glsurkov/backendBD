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

/*    async updateAirport(req,res){
        try{
            const airport_id = req.params.id;
            const {airport_name,airport_country,airport_city} = req.body;
            const Airport = await db.query(`UPDATE airports SET airport_name = $1, airport_country = $2, airport_city = $3 WHERE airport_id = $4`,[airport_name,airport_country,airport_city,airport_id]);
            res.json(Airport.rows[0]);
        }catch(e)
        {
            console.log(e);
        }
    }*/


    async deleteAirport(req,res){
        try{
            const airport_id = req.params.id;
            if (!airport_id)
            {
                res.status(400).json({message:"Id не указан"});

            }
            const Airport = await Airport.delete({where:{
                airport_id:airport_id
                }});
            return res.json(Airport);
        }catch(e)
        {
            console.log("error");
            res.status(500).json(e);
        }
    }
}

module.exports = new AirportController()