
const express=require('express')
const router=express.Router()

const {isSignedIn,isAuth, isAdmin}=require('../controllers/auth')
const {findUserById,addOrderToUserHistory}=require('../controllers/user')
const {createOrder,listOrders,getStatus,updateOrderStatus,findOrderById}=require('../controllers/order')
const {decreaseQuantity} =require('../controllers/product')


router.param('userId',findUserById)
router.param('orderId',findOrderById)

router.get('/order/list/:userId',isSignedIn,isAuth,isAdmin,listOrders)

router.get('/order/status/:userId',isSignedIn,isAuth,isAdmin,getStatus)

router.put('/order/:orderId/status/:userId',isSignedIn,isAuth,isAdmin,updateOrderStatus)

router.post('/order/create/:userId',isSignedIn,isAuth,addOrderToUserHistory,decreaseQuantity,createOrder)



module.exports=router