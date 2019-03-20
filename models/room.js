const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    row :{
        type: Number,
        required : true
    },
    col :{
        type: Number,
        required : true
    },
    building : {
        type:Schema.Types.ObjectId,
        ref:'building'
    }

}, { 
	timestamps: { 
		createdAt: 'create_at' ,
		updatedAt: 'update_at'
	}
});

const Room = mongoose.model('room',roomSchema,'room');

module.exports = Room;