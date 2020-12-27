const mongoose = require('mongoose')
const {Schema} = mongoose

const fieldNames = {
    todo:String,
    isCompleted:Boolean
}

const schema = new Schema({
    ...fieldNames
})

const Todos = mongoose.model('Todos', schema);

module.exports = Todos
module.exports.fieldNames = fieldNames