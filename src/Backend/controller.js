
const jwt = require("jsonwebtoken")
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
const checkPassword = async(password,hashpass)=>{
    try {
        const passwordhash =await bcrypt.compare(password,hashpass);
        return passwordhash;
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const authUser = (req,res)=>{
    const user_data=req.body
    LoginModel.findOne({email:user_data.email})
    .then(user=>{
        if(user){
            if(checkPassword(user_data.password,user.password)){
                const accessToken = jwt.sign({email:user_data.email},'jwt-access-token-secret-key',{expiresIn:'1m'})
                const refreshToken = jwt.sign({email:user_data.email},'jwt-refresh-token-secret-key',{expiresIn:'5m'})
                res.cookie('accessToken',accessToken,{maxAge:60000})
                res.cookie('refreshToken',refreshToken,{maxAge:300000,httpOnly:true,secure:true,sameSite:'strict'})
                return res.json({Login:true})
            }
        }
        else{
            return res.json({Login:true})
        }
    })
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

const verifyUser = (req,res,next)=>{
    const accessToken = req.cookies.accessToken
    if(!accessToken){
        if (renewToken(req,res)) {
            return res.json({valid:true,message:'valid token'})
        }
    }else{
        jwt.verify(accessToken,'jwt-access-token-secret-key',(err,decoded)=>{
            if (err){
            return res.json({valid:false,message:'invalid token'})
            }else{
                req.email = decoded.email
                return res.json({valid:true,message:'valid token'})
            }
        })
    }
}
const renewToken = (req,res)=>{
    const refreshToken = req.cookies.refreshToken
    exist = false;
    if(!refreshToken){
        res.json({valid:false,message:'no refresh token'})
    }else{
        jwt.verify(refreshToken,'jwt-refresh-token-secret-key',(err)=>{
            if (err){
            res.json({valid:false,message:'invalid token'})
            }else{
                const accessToken = jwt.sign({email:user_data.email},'jwt-accesss-token-secret-key',{expiresIn:'1m'})
                res.cookie('accessToken',accessToken,{maxAge:60000})
                exist =true
            }
        })
    }
    return exist
}
module.exports = {registerUser,authUser,verifyUser}