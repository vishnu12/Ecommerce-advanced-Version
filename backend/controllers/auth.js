
const User=require('../models/user')
const {errorHandler} =require('../helpers/dbErrorHandler')
const {validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')
exports.signUp=(req,res)=>{

const errors=validationResult(req)

if(!errors.isEmpty()) return res.status(422)
.json({error:errors.array()[0].msg})

   const user=new User(req.body)
   user.save((err,savedUser)=>{
       if(err) return res.status(400).json({error:errorHandler(err)})
       
       user.salt=undefined
       user.hashed_password=undefined
       res.json({user:user})
   })
}

exports.signIn=(req,res)=>{
    const {email,password} =req.body
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(422)
      .json({error:errors.array()[0].msg})
    
      User.findOne({email},(error,user)=>{
        if(error || !user) return res.status(400).json({error:'User email not found'})
        if(!user.authenticate(password)) return res.status(401)
        .json({error:'Email or password do not match'})

        const token=jwt.sign({_id:user._id},process.env.SECRET)
        res.cookie('token',token,{expire:new Date()+9999})
        //send res to front end
        const {_id,name,email,role}=user;
        return res.json({token,user:{_id,name,email,role}})
      
        })
}


exports.signOut=(req,res)=>{
    res.clearCookie('token')
    res.json({message:'User signed out successfully'})
}

exports.isSignedIn=expressJwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
  });


  exports.isAuth=(req,res,next)=>{
    let user=req.profile && req.auth && req.profile._id == req.auth._id
    if(!user) return res.status(403).json({error:'Not authenticated'})
    next()
  }


  exports.isAdmin=(req,res,next)=>{
     if(req.profile.role===0) return res.status(403).json({error:'Access denied'})
     next()
  }