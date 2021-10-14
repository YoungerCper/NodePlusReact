const Post = require('../models/Post'); 
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const config = require('config');
const mongoose = require('mongoose');

const router = Router();

router.post('/create', async(req, res) => {
    try{
        console.log(req.body);
        const {title, tags, text, userId} = req.body;
        const tagsArray = tags.split(',');

        const candidate = await User.findOne({_id: userId});
        const timestamp = (new mongoose.Types.ObjectId).getTimestamp();
       
        const post = new Post({title, text, tags: tagsArray, author: new mongoose.Types.ObjectId(userId), time: timestamp});
        
        await post.save();
        res.status(200).json({message: "Запсиь создана!!!"});
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
});

router.post('/take-all', async(req, res) => {
    try{
        const posts = await Post.find();
        const users = await User.find();            
        
        const modPosts = posts.map((post) => {
            let name = "";
            const needUser = users.filter((user) => {
                return user._id.equals(post.author);
            });
            if(needUser.length > 0)
                return ({_id: post._id,  title: post.title, text: post.text, time: post.time, tags : post.tags, authorName : needUser[0].name});
            return {_id: post._id, title: post.title, text: post.text, time: post.time, tags : post.tags, authorName : "----"};
        });
        console.log(modPosts);
        res.json(modPosts);
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
});

router.get('/:id', async (req, res) =>{
    try{
        const post = await Post.findOne({_id: mongoose.Types.ObjectId(req.params.id)});
        const users = await User.find();   

        const needUser = users.filter((user) => {
            return user._id.equals(post.author);
        });

        if(!post) return res.status(404).json({message: "Нет такого поста!!!"});
        res.json({_id: post._id,  title: post.title, text: post.text, time: post.time, tags : post.tags, authorName : needUser[0].name});
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
});

router.get('/tags', async (req, res) =>{
    try{
        const posts = await Post.find();
        const ans = {tags : []};
        posts.map( post => {
            tags.map(tag => {ans.tags.push(tag)});
        });
        res.json(ans);
        console.log(ans);
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
});

module.exports = router;