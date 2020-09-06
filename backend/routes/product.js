const express=require('express')
const router=express.Router()

const {findUserById}=require('../controllers/user')
const {isSignedIn,isAdmin,isAuth}=require('../controllers/auth')
const {findCateById,createCategory}=require('../controllers/category')
const {createProduct,getProductById,getAProduct,
       removeProduct,updateProduct,getAllProducts,
        relatedProducts,listCategories,
        listBySearch,getPhoto,listSearch}=require('../controllers/product')

router.param('categoryId',findCateById)
router.param('userId',findUserById)
router.param('productId',getProductById)


router.get('/product/:productId',getAProduct)
router.get('/products/search', listSearch);
router.get('/products',getAllProducts)
router.get('/products/related/:productId',relatedProducts)
router.get('/products/categories',listCategories)
router.get('/product/photo/:productId',getPhoto)


router.post('/product/create/:userId',isSignedIn,isAuth,isAdmin,createProduct)
router.post("/products/by/search", listBySearch);

router.delete('/product/:productId/:userId',isSignedIn,isAuth,isAdmin,removeProduct)

router.put('/product/:productId/:userId',isSignedIn,isAuth,isAdmin,updateProduct)




module.exports=router