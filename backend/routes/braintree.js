
const express=require('express')
const router=express.Router()

const {isSignedIn,isAuth}=require('../controllers/auth')
const {findUserById}=require('../controllers/user')
const {generateToken,processPayment}=require('../controllers/braintree')

router.param('userId',findUserById)


router.get('/braintree/getToken/:userId',isSignedIn,isAuth,generateToken)

router.post('/braintree/payment/:userId',isSignedIn,isAuth,processPayment)




module.exports=router