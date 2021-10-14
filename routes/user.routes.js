const Post = require('../models/Post'); 
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const config = require('config');
const mongoose = require('mongoose');

const router = Router();

router.get('/:id', async(req, res) => {
    try{
        const id = new mongoose.Types.ObjectId(req.params.id);
        const newName = req.query["name"];
        const newSecondName = req.query["second_name"];

        const candidate = await User.findOne({_id: id});

        if(!candidate){
            return res.status(400).json({message: "Такого пользователя не существует!!!"});
        }

        console.log(id)

        await User.updateOne({_id: id}, {$set: {name: newName, second_name: newSecondName}});
        console.log({userId : id, name: newName, second_name: newSecondName});
        res.json({userId : id, name: newName, second_name: newSecondName});
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
});

module.exports = router;