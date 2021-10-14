const express = require('express');
const config  = require('config');
const mongoos = require('mongoose');

const app = express();
const PORT = config.get("port") || 3000;

app.use( express.json({extended : true}));

app.use('/auth', require('./routes/auth.routes'));
app.use('/post', require('./routes/post.routes'));
app.use('/user', require('./routes/user.routes'));
app.use('/info', require('./routes/info.routes'));

async function start(){
    try{
        await mongoos.connect(config.get("mongoURI"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log("Server started!!!");
        });
    }
    catch(e){
        console.log("Some Error", e.message);
        process.exit();
    }
}

start();

