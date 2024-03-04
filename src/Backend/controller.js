const express = require("express");
const LoginModel = require("./loginModel")
const bcrypt = require("bcryptjs")

const securePassword = async(password)=>{
    try {
        const passwordhash =await bcrypt.hash(password,10);
        return passwordhash;
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const authUser = (req,res)=>{
    const user_data=req.body
    

}
const registerUser = async (req,res)=>{
    const user_data=req.body
    const finduser= await LoginModel.findOne({email:user_data.email})
    if(finduser){
        res.status(200).send({success:false,message:"Email Already Exists"})
    }else{
        try{
            const spass = await securePassword(user_data.password)
            const user = new LoginModel({
                username:user_data.username,
                email:user_data.email,
                password:spass
        })
        await user.save();
    }catch(err){
        res.status(400).send(err.message)
    }
    }
    
}
module.exports = {registerUser,authUser}