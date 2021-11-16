const Country = require("../models/Country");


class CountryController{
    async createCountry(req,res){
        try{
            const {country_name,population,capital_city} = req.body;
            const newCountry = await Country.create(req.body)
            res.json(newCountry);
        }catch(e)
        {
            res.status(500).json(e);
            console.log(e);
        }
    }

/*
    async updateCountry(req,res){
        try{
            const country_name = req.params.id;
            const {population,capital_city} = req.body;
            const Country = await db.query(`UPDATE countries SET population = $1, capital_city = $2 WHERE country_name = $3`,[population,capital_city,country_name]);
            res.json(Country.rows[0]);
        }catch(e)
        {
            console.log(e);
        }
    }
*/


    async deleteCountry(req,res){
        try{
            const country_name = req.params.id;
            if (!country_name)
            {
                res.status(400).json({message:"Id не указан"});

            }
            const Country = await Country.delete({where:
                    {
                        country_name: country_name
                    }})
            return res.json(Country);
        }catch(e)
        {
            console.log("error");
            res.status(500).json(e);
        }
    }
}

module.exports = new CountryController();