const express = require('express');
const bcrypt = require('bcrypt');
const UserApiRouter = express.Router();
const UserModel = require('../model/users');

//get list user
UserApiRouter.get('/',(req,res) =>{
    UserModel.find({}, (err,users) => {
        if(err) res.json({success: false,err})
        else res.json({success: true,data: users});
    })
})

//Create user
UserApiRouter.post('/',(req,res) =>{
    const {password} = req.body;
    const hashPassword = bcrypt.hashSync(password,12); //ma hoa password bang cach them 1 chuoi ma hoa vao duoi password
    req.body.password= hashPassword;
    UserModel.create(req.body,(err,userCreated) => {
        if(err) res.json({success: false,err})
        else res.json({success: true,data: userCreated});
    })
})
// Update user
UserApiRouter.put('/:id',(req,res) =>{
    const id = req.params.id;
    UserModel.findById(id,(err,userFound) => {
        if(err) res.json({success: false,err})
        else if(!userFound) res.json({success: false,err: 'Not found'})
        else{
            for(let key in req.body) // chay qua tung gia tri cua req.body
            {
                let value = req.body[key];
                if(value !== null) // so sanh ca kieu du lieu
                {
                    userFound[key] = value;
                }
            }
            userFound.save((err,userUpdated) => {
                if(err) res.json({success: false, err})
                else res.json({success: true,data: userUpdated})
            });
        }
    })
})
// Delete user
UserApiRouter.delete('/:id',(req,res) => {
    const id = req.params.id;

    UserModel.findByIdAndDelete(id,(err,userFound) => {
        if(err) res.json({success: false,err})
        else res.json({success:true});
    });
})
module.exports = UserApiRouter;
