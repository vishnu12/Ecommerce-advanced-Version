
const {Order,CartItem}=require('../models/order')
const {errorHandler}=require('../helpers/dbErrorHandler')



exports.findOrderById=(req,res,next,id)=>{
  Order.findById(id)
  .populate('products.product','name price')
  .exec((err,order)=>{
      if(err || !order) return res.status(400).json({error:'No order found'})
      req.order=order
      next()
    })
}

exports.createOrder=(req,res)=>{

    req.body.user=req.profile
    const order=new Order(req.body)
    order.save((err,data)=>{
        if(err) return res.status(400).json({error:errorHandler(err)})
        res.json(data)
    })
}

exports.listOrders=(req,res)=>{
    Order.find()
    .populate('user','_id name')
    .sort('-createdAt')
    .exec((err,orders)=>{
        if(err) return res.status(400).json({error:errorHandler(err)})
    res.json(orders)
    
    })
}

exports.getStatus=(req,res)=>{

    res.json(Order.schema.path('status').enumValues)

}

exports.updateOrderStatus=(req,res)=>{
   Order.update({_id:req.body.orderId},{$set:{status:req.body.status}},(err,order)=>{
    if(err) return res.status(400).json({error:'Could not update status'})
    res.json(order)
   })
}