const User = require("../models/User" );
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const {secret} = require("../config/config")
const sequelize = require("sequelize")

const generateAccessToken = (id,role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, {expiresIn: "12h"})
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
            let role;
            if(username === "admin" && password === "admin")
            {
                role = 'admin';
            }
            const hashPassword = bcrypt.hashSync(password,7);
            await User.create({
                username:username,
                password:hashPassword,
                role:role});
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
            if(Object.keys(user).length === 0)
            {
                return res.status(400).json({message:`Пользователь с ${username} не найден`});
            }
            const validPassword = bcrypt.compareSync(password,user[0].password);
            if (!validPassword)
            {
                return res.status(400).json({message:'Введен неверный пароль'});
            }
            const token = generateAccessToken(user[0].user_id,user[0].role);
            const role = user[0].role;
            return res.json({token:token,role:role})

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
                const id = req.info.id;
                const user = await User.findOne({
                    where:
                        {
                          user_id : +id
                        },
                    attributes:['username','contact_number','role','balance','user_id']
                })
                console.log(user);
                res.json(user)
            }catch(e)
            {
                console.log(e);
                res.status(400).json({message:"Can't get User"})
            }
        }

        async addBalance(req,res){
            try{
                const id = req.info.id;
                const value = req.body.value;
                await User.update({
                    balance : sequelize.literal(`balance + ${value}`)
                },
                    {
                        where:{
                            user_id : id
                        }
                    })

                res.status(200).json({message:"Balance is updated"})

            }catch(e)
            {
                res.status(500).json({message:"ERROR, BALANCE ISN'T UPDATED"})
            }

        }
}

module.exports = new authContoller()