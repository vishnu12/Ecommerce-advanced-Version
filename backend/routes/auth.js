const express=require('express')
const router=express.Router()
const {check,validationResult}=require('express-validator')

const {signUp,signIn,signOut,isSignedIn}=require('../controllers/auth')

router.post('/signup',[
    check('name','name should be atleast 3 chars').isLength({min:3}),
    check('email','email should be a valid email').isEmail(),
    check('password','password should be atleast 3 chars').isLength({min:3})
    ],signUp)

router.post('/signin',signIn)
router.get('/signout',signOut)


// router.get('/hello',isSignedIn,(req,res)=>{
//     res.send('hey there')
// })  //protected route testing

module.exports=router