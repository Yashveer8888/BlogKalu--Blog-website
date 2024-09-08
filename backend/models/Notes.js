const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        require:true
    },
    description:{
        type: String,
        require:true,
    },
    tag:{
        type: String,
        default:"Generl"
    },
    date:{
        type: String,
        default:Date.now
    },
})


module.exports = mongoose.model('Notes',NotesSchema);