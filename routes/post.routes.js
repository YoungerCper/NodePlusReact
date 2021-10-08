const Post = require('../models/Post'); 
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const config = require('config');
const mongoose = require('mongoose');

const router = Router();

router.post('/create', async(req, res) => {
    try{
        const {title, tags, text, userId} = req.body;
        const tagsArray = tags.split(',');

        const candidate = await User.findOne({id: userId});
        const timestamp = (new mongoose.Types.ObjectId).getTimestamp();
       
        const post = new Post({title, text, tags: tagsArray, author: candidate.name, time: timestamp});
        
        await post.save();
        console.log(post);
        res.status(200).json({message: "Запсиь создана!!!"});
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
});

router.post('/take-all', async(req, res) => {
    try{
        const posts = await Post.find();
        console.log(posts);
        res.json(posts);
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
});

router.get('/:id', async (req, res) =>{
    try{
        const post = await Post.findOne(req.params.id);
        if(!post) return res.status(404).json({message: "Нет такого поста!!!"});
        res.json(post)
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
});

module.exports = router;