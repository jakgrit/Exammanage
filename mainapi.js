const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const busboy = require('connect-busboy');
const back = require('express-back');

const middleWare = require('./middleware/auth');
const flash = require('flash-express');


const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const port = 1669;

mongoose.connect('mongodb://127.0.0.1:27017/exammanage', { useNewUrlParser: true });



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true
}));
app.use(busboy({immediate:true}));
app.use(flash());
app.use(back());
app.use(require('./helpers/ejsLocals'));


app.get('/',(req,res)=>{
    return res.redirect('/login');
});
app.use("/login", require("./routes/login"));

app.use("/manageuser",middleWare.login, require('./routes/users'));
app.use("/exam",middleWare.login, require('./routes/exam'));
app.use("/building",middleWare.login, require('./routes/building'));
app.use("/room",middleWare.login, require('./routes/room'));
app.use("/table",middleWare.login, require('./routes/timetable'));
app.use("/login",middleWare.login, require('./routes/login'));
app.get("/config/ui/:hide",middleWare.login, require('./helpers/Config'));

app.get('/main',middleWare.login, (req,res)=>{
    return res.render('page/main');
});

http.listen(port, function() {
    console.log('Exam Manage Server is running on port '+port+' at '+new Date());
});


