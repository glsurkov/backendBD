const Aviacompany = require("../models/Aviacompany");


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

/*    async updateAviacompany(req,res){
        try{
            const aviacompany_id = req.params.id;
            const {company_name,company_phone,company_raiting} = req.body;
            const Company = await db.query(`UPDATE aviacompanies SET company_name = $1, company_phone = $2, company_raiting = $3 WHERE country_name = $4`,[company_name,company_phone,company_raiting,aviacompany_id]);
            res.json(Company.rows[0]);
        }catch(e)
        {
            console.log(e);
        }
    }*/


    async deleteAviacompany(req,res){
        try{
            const aviacompany_id = req.params.id;
            if (!aviacompany_id)
            {
                res.status(400).json({message:"Id не указан"});

            }
            const Company = await Aviacompany.delete({where:{
                company_id:aviacompany_id
                }});
            return res.json(Company);
        }catch(e)
        {
            console.log("error");
            res.status(500).json(e);
        }
    }
}

module.exports = new AviacompanyController();