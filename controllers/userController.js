const ExcelReader = require('node-excel-stream').ExcelReader;
const Student = require('../models/student');
const Teacher = require('../models/teacher');

module.exports = {

    index: async (req, res) => {
        return res.render('page/usermanage');
    },

    viewStudent: async (req, res) => {
        let student = await Student.find();
        console.log(student);
        return res.render('page/student', {
            studentData: student
        });
    },

    viewTeacher: async (req, res) => {
        let teacher = await Teacher.find();
        console.log(teacher);
        return res.render('page/teacher', {
            teacherData: teacher
        });
    },

    viewDatailTeacher: async (req, res) => {
        let userId = req.params.id;
        let userData = await Teacher.findById(userId);
        res.render('page/teacherDetail', {
            teacherData: userData
        });
    },

    updateTeacher: async (req, res) => {
        let userId = req.body._id;
        console.log(req.body);
        let userData = await Teacher.findById(userId);

        userData.teacher_id = req.body.teacher_id;
        userData.firstname = req.body.firstname;
        userData.lastname = req.body.lastname;

        await userData.save();
        res.flash('<span uk-icon="icon: check"></span> บันทึกข้อมูลสำเร็จ','success');
        return res.redirect('/manageuser/teacher/user/'+userId);

        // res.redirect('/manageuser/student');
    },

    delTeacher: async (req, res) => {
        let userId = req.params.id;
        let userData = await Teacher.findById(userId);
        res.flash('<span uk-icon="icon: check"></span> ลบ '+userData.firstname+' สำเร็จ','success');
        await userData.remove();
        return res.redirect('/manageuser/teacher/');
    },

    viewDatailStudent: async (req, res) => {
        // console.log(req.flash('key'));
        let userId = req.params.id;
        let userData = await Student.findById(userId);
        res.render('page/studentDetail', {
            studentData: userData
        });
    },

    updateStudent: async (req, res) => {
        let userId = req.body._id;
        console.log(req.body);
        let userData = await Student.findById(userId);

        userData.student_id = req.body.student_id;
        userData.firstname = req.body.firstname;
        userData.lastname = req.body.lastname;

        await userData.save();
        res.flash('<span uk-icon="icon: check"></span> บันทึกข้อมูลสำเร็จ','success');


        return res.redirect('/manageuser/student/user/'+userId);
    },

    delStudent: async (req, res) => {
        let userId = req.params.id;
        let userData = await Student.findById(userId);
        res.flash('<span uk-icon="icon: check"></span> ลบ '+userData.firstname+' สำเร็จ','success');
        await userData.remove();
        return res.redirect('/manageuser/student/');
    },

    uploadUser: async (req, res) => {
        console.log("uploading");

        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            console.log(fieldname);

            if (fieldname == "student") {
                let fileStudent = file;
                let reader = new ExcelReader(fileStudent, {
                    sheets: [{
                        name: 'Sheet1',
                        rows: {
                            headerRow: 1,
                            allowedHeaders: [{
                                name: 'student_id',
                                key: 'student_id'
                            }, {
                                name: 'firstname',
                                key: 'firstname'
                            }, {
                                name: 'lastname',
                                key: 'lastname'
                            }]
                        }
                    }]
                })

                console.log('starting parse : ' + fieldname);
                reader.eachRow(async (rowData, rowNum, sheetSchema) => {
                        console.log(rowData);
                        let student = new Student(rowData);

                        await student.save();
                    })
                    .then(() => {
                        console.log('done parsing : ' + fieldname);
                    });
            }

            if (fieldname == "teacher") {
                let fileteacher = file;
                let teacherReader = new ExcelReader(fileteacher, {
                    sheets: [{
                        name: 'Sheet1',
                        rows: {
                            headerRow: 1,
                            allowedHeaders: [{
                                name: 'teacher_id',
                                key: 'teacher_id'
                            }, {
                                name: 'firstname',
                                key: 'firstname'
                            }, {
                                name: 'lastname',
                                key: 'lastname'
                            }]
                        }
                    }]
                })
                console.log('starting parse : ' + fieldname);
                teacherReader.eachRow(async (rowData, rowNum, sheetSchema) => {
                    console.log(rowData);
                    let teacher = new Teacher(rowData);

                    await teacher.save();

                }).then(() => {
                    console.log('done parsing : ' + fieldname);
                })

            }

        });
        res.flash('<span uk-icon="icon: check"></span> อัพโหลดไฟล์สำเร็จ','success');
        res.redirect('/manageuser');
    }
}