const Hotel = require("../models/Hotel");
const User = require("../models/User");
const Flight = require("../models/Flight");
const Aviacompany = require("../models/Aviacompany");
const Image = require('../models/Image')
const path = require("path");
const fs = require('fs')
const {Op} = require("sequelize");
const UserHotel = require("../models/UserHotel");
const sequelize = require("sequelize");
const Airport = require("../models/Airport");


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
            let Hotels;
            const hotel_params = req.query;
            for (let prop in hotel_params){
                console.log(prop)
                if (hotel_params[prop] === '') {
                    delete hotel_params[prop];
                }
            }
            if(Object.keys(hotel_params).length === 0)
            {
                Hotels = await Hotel.findAll()

                res.json(Hotels);
            }else
            {
                Hotels = await Hotel.findAll({
                        where: hotel_params
                    }
                )
                res.json(Hotels);
            }
        } catch (e) {
            res.json([])
            console.log(e);
        }
    }

    async updateHotels(req,res){
        try{
            const hotel_id = req.query.hotel_id;
            const newHotel = await Hotel.update(req.body,
                {
                    where:{
                        hotel_id: hotel_id
                    }
                }
            )
            res.status(200).json(newHotel);

        }catch(e)
        {
            res.status(500).json({message:e});
            console.log(e);
        }
    }

    async getHotel(req,res){
        try{
            const user_id = req.info.id;
            const hotel_id = req.query.hotel_id;
            const Hotel = await User.findOne({
                where:{
                    user_id:user_id
                },
                include:[
                    {
                        model:Hotel,
                        required:true,
                        as:'hotels',
                        where:{
                            hotel_id:hotel_id
                        }
                    }],
                raw:true
            })
            res.status(200).json(Hotel);
        }catch(e)
        {
            console.log(e);
        }
    }


    async fetchUserHotels(req,res){
        try{
            const state = req.query.active;
            const id = req.info.id;
            const Hotels = await User.findAll({
                    where:{
                        user_id:id,
                    },
                    include: [
                        {
                            model: Hotel,
                            required: true,
                            as: 'hotels',
                            through:{
                              where:{active:state}
                            }
                        }],
                    raw:true
                }
            )

            res.json(Hotels);
        }catch(e)
        {
            console.log(e);
            res.status(500).json(e)
        }
    }

    async uploadImage(req,res){
        try{
            const hotel_id = req.query.hotel_id;

            if(req.file){
                await Image.create({
                    hotel_id:hotel_id,
                    image:req.file.filename
                })
                res.json(req.file)
            }

        }catch(e)
        {
            console.log(e);
            res.status(500).json(e)
        }
    }

    async getImages(req,res){
        try{
            const hotel_id = req.query.hotel_id;
            const Images = await Image.findAll({
                where:{
                    hotel_id:hotel_id
                }
            })
           res.json(Images);

        }catch(e)
        {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async getImage(req,res){
        try{
            const path2 = req.query.image;
            res.sendFile((path.join(__dirname, `../hotelimages/${path2}`)));
        }catch(e)
        {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async deleteImage(req,res){
        try{
        const path2 = req.query.image;

        await Image.destroy({where:{
            image:path2
            }})
            if(fs.existsSync(path.join(__dirname, `../hotelimages/${path2}`)))
            {
                fs.unlinkSync(path.join(__dirname, `../hotelimages/${path2}`));
            }
            else
            {
                console.log('Файл не найден!');
            }
            res.status(200).json({message:'Файл удален'})

        }catch(e)
        {
            res.status(500).json({message:"Error"})
        }
    }

    async deleteHotel(req,res){
        try{
            const hotel_id = req.query.hotel_id;
            if (!hotel_id)
            {
                res.status(400).json({message:"Id не указан"});

            }
            await Hotel.destroy({where:{
                hotel_id:hotel_id
                }})
            res.status(200).json({message:"Успешно удален"});
        }catch(e) {
            console.log("error");
            res.status(500).json(e);
        }
    }

    async updateHotel(req,res){
        try {
            const date = new Date();
            let month = date.getMonth() + 1;
            if(month < 10)
            {
                month = '0'+ month;
            }
            let day = date.getDate();
            if(day < 10)
            {
                day = '0'+ day;
            }
            const response = await UserHotel.update({
                    active: 0
                },
                {
                    where: {
                        departure_date: {
                            [Op.lt]: `${date.getFullYear()}-${month}-${day}`
                        },
                        active:1
                    },
                    returning:true
                })
            for (const order of response[1])
            {
                console.log(order.hotel_order)
            }
            res.json(response)

        }catch(e){
            console.log("error");
            res.status(500).json(e);
        }
    }

/*    async update2Hotel(req,res){
        try{
            const response = await Hotel.update({
                    rooms_in_stock: sequelize.literal('rooms_in_stock + 1')
                },
                {
                    where:{
                      hotel_id: 1
                    },
                    include: [
                        {
                            model: UserHotel,
                            required: true,
                            attributes: ['hotel_order'],
                            where: {
                                hotel_order: 3
                            }
                        }
                    ]
                })
            console.log(response)
            res.status(200).json(response)
        }catch(e)
        {
            console.log(e);
            res.status(500).json(e);
        }
    }*/
}

module.exports = new HotelController();