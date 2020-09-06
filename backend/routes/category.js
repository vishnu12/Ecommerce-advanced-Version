const express=require('express')
const router=express.Router()

const {findUserById}=require('../controllers/user')
const {isSignedIn,isAdmin,isAuth}=require('../controllers/auth')
const {findCateById,createCategory,getACategory,updateCategory,removeCategory,getAllCategories}=require('../controllers/category')


router.param('categoryId',findCateById)
router.param('userId',findUserById)

router.post('/category/create/:userId',isSignedIn,isAuth,isAdmin,createCategory)

router.get('/category/:categoryId',getACategory)

router.put('/category/:categoryId/:userId',isSignedIn,isAuth,isAdmin,updateCategory)

router.delete('/category/:categoryId/:userId',isSignedIn,isAuth,isAdmin,removeCategory)

router.get('/categories',getAllCategories)


module.exports=router