const Aviacompany = require("../models/Aviacompany");
const Airport = require("../models/Airport");


class AviacompanyController{
    async createAviacompany(req,res){
        try{
/*            const {company_name,company_phone,company_raiting} = req.body;*/
            const newAviacompany = await Aviacompany.create(req.body);
            res.json(newAviacompany);
        }catch(e)
        {
            console.log(e);
        }
    }

    async getAviacompany(req,res){
        try{
            const Aviacompanies = await Aviacompany.findAll();
            res.json(Aviacompanies)
        }catch(e)
        {
            console.log(e);
        }
    }

    async updateAviacompany(req,res){
        try{
            const company_id = req.query.company_id;
            const newAviacompany = await Aviacompany.update(req.body,
                {
                    where:{
                        company_id: company_id
                    }
                }
            )
            res.status(200).json(newAviacompany);

        }catch(e)
        {
            res.status(500).json({message:e});
            console.log(e);
        }
    }


    async deleteAviacompany(req,res){
        try{
            const aviacompany_id = req.query.company_id;
            if (!aviacompany_id)
            {
                res.status(400).json({message:"Id не указан"});

            }
            await Aviacompany.destroy({where:{
                company_id:aviacompany_id
                }});
            return res.status(200).json({message:"Успешно удалена"})
        }catch(e)
        {
            console.log("error");
            res.status(500).json(e);
        }
    }
}

module.exports = new AviacompanyController();