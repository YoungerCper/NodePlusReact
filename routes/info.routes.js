const Post = require('../models/Post'); 
const User = require('../models/User'); 
const {Router} = require('express');
const config = require('config');

const router = Router();

router.post('/', async (req, res) =>{
    try{
        const posts = await Post.find();
        const users = await User.find();
        
        console.log({countP : posts.length, countU : users.length});
        res.json({countP : posts.length, countU : users.length});
    }
    catch(e){
        res.status(500).json({message: "Что-то пошло не так((("});
    }
})

module.exports = router;