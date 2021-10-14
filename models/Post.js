const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    tags:{type : Array , "default" : []},
    id:{type: Types.ObjectId},
    author:{type: Types.ObjectId},
    time: {type: String, required: true}
});

module.exports = model('Post', schema);