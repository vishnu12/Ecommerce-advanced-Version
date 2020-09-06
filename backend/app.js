 const express=require('express')
 const app=express()
 require('dotenv').config()
 const mongoose=require('mongoose')
 const cors=require('cors')
 const morgan=require('morgan')
 const cookieParser=require('cookie-parser')
 

 
 
 //routes import
 const authRoute=require('./routes/auth')
 const userRoute=require('./routes/user')
 const categoryRoute=require('./routes/category')
 const productRoute=require('./routes/product')
 const braintreeRoute=require('./routes/braintree')
 const orderRoute=require('./routes/order')

 const uri=process.env.ATLAS_URI;
 mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
 const connection=mongoose.connection;
 connection.once('open',()=>{console.log('mongoDB connection established')})
 

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(cookieParser())


//routes middleware
app.use('/api',authRoute)
app.use('/api',userRoute)
app.use('/api',categoryRoute)
app.use('/api',productRoute)
app.use('/api',braintreeRoute)
app.use('/api',orderRoute)



 const port=process.env.PORT || 3001

 app.listen(port,()=>console.log(`server is running on port ${port}`))