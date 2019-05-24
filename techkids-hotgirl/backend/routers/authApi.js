const express = require('express');
const userModel = require('../model/users')
const bcrypt = require('bcrypt');
const authApiRouter = express.Router();


authApiRouter.post('/login',(req,res) => {
    const {username,password} = req.body;

    userModel.findOne({username},(err,user) => {
        if(err) console.log(err);
        else if(!user) res.json({success:false,message: " User not found"});
        else
            if(bcrypt.compareSync(password,user.password))
            {
                req.session.user = {username,id: user._id}; // luu thong tin vao trong session // cho dang nhap khi luu session thong tin
                res.json({success:true,message: "Login success!"})
            } else res.json({success:false,message: "Wrong password"});
    })
})
module.exports = authApiRouter;