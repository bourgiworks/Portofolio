const mongoose = require('mongoose')

const CommentSchema= mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true,
        autoIncrement: true
    },
    like:{
        type:Number,
        required: false,
        autoIncrement: true
    }

    
})
module.exports = mongoose.model('comments', CommentSchema);