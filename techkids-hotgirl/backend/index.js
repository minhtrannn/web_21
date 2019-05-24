const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const userApiRouter = require('./routers/userApi');
const postApiRouter = require('./routers/postApi');
const authApiRouter = require('./routers/authApi');

//xuli tat ca o userApi

mongoose.connect('mongodb://localhost/tk-hotgirl-21',(err) => {
    if(err) console.log(err)
    else console.log("DB connect success")
})

app.use(session({
    secret: 'minhdeptraivlll',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge:1000*60*60*24*7
    }
}));

app.use('/api/auth', authApiRouter);

app.use((req,res,next) => {
    console.log(req.session);
    // console.log(req.sessionID);
    // console.log("hello");
    // res.send("hello middleware")
    next();
})

app.use('/api/users', userApiRouter);
app.use('/api/posts',postApiRouter);

app.use('/dangnhap',express.static('frontend'));

app.get("/dangnhap",function(req,res){
    res.sendFile(__dirname+"/frontend/frontend.html");
})

app.listen(6969,(err) => {
    if(err) console.log(err)
    else console.log("Sever start success!")
})