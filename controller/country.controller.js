const Country = require("../models/Country");
const Hotel = require("../models/Hotel");


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


    async getCountries(req,res){
        try{
            const Countries = await Country.findAll();
            res.json(Countries);
        }catch(e)
        {
            res.status(500).json(e);
            console.log(e);
        }
    }

    async updateCountries(req,res){
        try{
            const country_name = req.body.country_name;
            const newCountry = await Country.update(req.body,
                {
                    where:{
                        country_name:country_name
                    }
                }
            )
            res.status(200).json(newCountry);

        }catch(e)
        {
            res.status(500).json({message:e});
            console.log(e);
        }
    }


    async deleteCountry(req,res){
        try{
            const country_name = req.query.country_name;
            if (!country_name)
            {
                res.status(400).json({message:"Id не указан"});

            }
            await Country.destroy({where:
                    {
                        country_name: country_name
                    }})
            return res.status(200).json({message:"Успешно удален"});
        }catch(e)
        {
            console.log("error");
            res.status(500).json(e);
        }
    }
}

module.exports = new CountryController();