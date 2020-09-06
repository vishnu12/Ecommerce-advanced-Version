const express=require('express')
const router=express.Router()

const {findUserById,getUser,updateUser,purchaseHistory}=require('../controllers/user')
const {isSignedIn,isAdmin,isAuth}=require('../controllers/auth')



router.param('userId',findUserById)

router.get('/secret/:userId',isSignedIn,isAuth,isAdmin,(req,res)=>{
    res.json({user:req.profile})
})

router.get('/user/:userId',isSignedIn,isAuth,getUser)
router.get('/orders/by/user/:userId',isSignedIn,isAuth,purchaseHistory)


router.put('/user/:userId',isSignedIn,isAuth,updateUser)

module.exports=router