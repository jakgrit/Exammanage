const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_id :{
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

const Student = mongoose.model('student',studentSchema,'student');

module.exports = Student;