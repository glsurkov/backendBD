const User = require("../models/User" );
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const {secret} = require("../config/config")

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authContoller {
    async registration(req, res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty())
            {
                return res.status(400).json({message:"Ошибка при регистрации",errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findAll({where:{
                    username:username,
                }});
            if (Object.keys(candidate).length !== 0) {
                return res.status(400).json({message:"Пользователь с таким именем уже существует"});
            }
            const hashPassword = bcrypt.hashSync(password,7);
            await User.create({
                username:username,
                password:hashPassword});
            return res.json({message:"Пользователь успешно создан"});
        }
        catch(e)
        {
            console.log(e);
            res.status(400).json({message:'Registration error'})
        }
    }
    async login(req, res){
        try{
            const {username,password} = req.body;
            const user = await User.findAll({where:{
                    username:username,
                }});
            console.log(user[0].user_id)
            if(Object.keys(user).length === 0)
            {
                return res.status(400).json({message:`Пользователь с ${username} не найден`});
            }
            const validPassword = bcrypt.compareSync(password,user[0].password);
            if (!validPassword)
            {
                return res.status(400).json({message:'Введен неверный пароль'});
            }
            const token = generateAccessToken(user[0].user_id);
            const id = user[0].user_id;
            return res.json({token:token,id:id})

        }catch(e)
        {
            console.log(e);
            res.status(400).json({message:'Login error',e})
        }
    }
        async getUsers(req, res){
            try{
                const Users = await User.findAll()
                res.json(Users);
            }catch(e)
            {
                console.log(e);
                res.status(400).json({message:"Can't get Users"})
            }
        }

        async getUser(req,res){
            try{
                const id = req.query.id;
                const user = await User.findOne({
                    where:
                        {
                          user_id : +id
                        },
                    attributes:['username','contact_number']
                })
                console.log(user);
                res.json(user)
            }catch(e)
            {
                console.log(e);
                res.status(400).json({message:"Can't get User"})
            }
        }
}

module.exports = new authContoller()