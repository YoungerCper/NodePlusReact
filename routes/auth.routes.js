const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const config = require('config');

const router = Router();

router.post('/register', async(req, res) => {
    try{
        const {login, password} = req.body;
        //console.log(req.body);
        const candidate = await User.findOne({login});

        if(candidate){
            return res.status(400).json({message: "Пользователь с таким логином существует!!!"});
        }

        const user = new User({login, password, name: "undefined", second_name: "undefined"});
        await user.save();

        res.status(200).json({message: "Пользователь зарегистрирован"});
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
});

router.post('/login', async(req, res) => {
    try{
        const {login, password} = req.body;
        const candidate = await User.findOne({login});

        if(!candidate) return res.status(400).json({message: "Неверный логин или пароль"});
        if(candidate.password != password) return res.status(400).json({message: "Неверный логин или пароль"});

        const token = jwt.sign({userId: candidate._id}, config.get("jwtSecret"), {expiresIn: '1h'});

        res.json({token, userId: candidate._id, name: candidate.name, second_name: candidate.second_name});
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
});

module.exports = router;