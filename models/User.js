const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: false},
    second_name: {type: String, required: false},
    id: {type: Types.ObjectId}
});

module.exports = model('User', schema);