const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    teacher_id :{
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    firstname :{
        type : String,
        required : true,
        lowercase : true
    },
    lastname :{
        type: String,
        required : true,
        lowercase : true
    }
}, { 
	timestamps: { 
		createdAt: 'create_at' ,
		updatedAt: 'update_at'
	}
});

const Teacher = mongoose.model('teacher',teacherSchema,'teacher');

module.exports = Teacher;