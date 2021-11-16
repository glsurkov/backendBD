const Hotel = require("../models/Hotel");


class HotelController{
    async createHotel(req,res){
        try{
            const newHotel = await Hotel.create(req.body)
            res.json(newHotel);
        }catch(e)
        {
            console.log(e);
        }
    }

    async getHotels(req, res) {
        try {
            const hotel_params = req.query;
            let Hotels;
            console.log(hotel_params);
            if(Object.keys(hotel_params).length === 0)
            {
                Hotels = await Hotel.findAll()

                res.json(Hotels);
            }else
            {
                Hotels = await Hotel.findAll({
                    where:hotel_params
                    }
                )
                res.json(Hotels);
            }
        } catch (e) {
            res.json([])
            console.log(e);
        }
    }

 /*   async updateHotel(req,res){
        try{
            const hotel_id = req.params.id;
            const {hotel_name,hotel_country,hotel_city,room_price,rooms_in_stock} = req.body;
            const Hotel = await db.query(`UPDATE hotels SET hotel_name = $1, hotel_country = $2, hotel_city = $3, room_price = $4, rooms_in_stock = $5 WHERE hotel_id = $6`,[hotel_name,hotel_country,hotel_city,room_price,rooms_in_stock,hotel_id]);
            res.json(Hotel.rows[0]);
        }catch(e)
        {
            console.log(e);
        }
    }
*/

    async deleteHotel(req,res){
        try{
            const hotel_id = req.params.id;
            if (!hotel_id)
            {
                res.status(400).json({message:"Id не указан"});

            }
            const Hotel = await Hotel.delete({where:{
                hotel_id:hotel_id
                }})
            return res.json(Hotel);
        }catch(e) {
            console.log("error");
            res.status(500).json(e);
        }
    }
}

module.exports = new HotelController();