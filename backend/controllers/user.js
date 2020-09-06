const User=require('../models/user')
const {Order}=require('../models/order')
exports.findUserById=(req,res,next,id)=>{

     User.findById(id).exec((err,user)=>{
         if(err||!user) return res.status(400)
         .json({err:'No user found'})

         req.profile=user
         next()
     })
     
}

exports.getUser=(req,res)=>{
    req.profile.hashed_password=undefined
    req.profile.salt=undefined
    res.json(req.profile)

}

exports.updateUser=(req,res)=>{
    User.findOneAndUpdate({_id:req.profile._id},
        {$set:req.body},
        {new:true},(err,user)=>{
            if(err||!user) return res.status(400)
            .json({err:'You are not authorised to do this'})

            user.hashed_password=undefined
            user.salt=undefined  
            res.json(user)
    })
}


exports.addOrderToUserHistory=(req,res,next)=>{
    let history=[]

    req.body.products.forEach((item)=>{
        history.push({
            _id:item._id,
            name:item.name,
            description:item.description,
            category:item.category,
            quantity:item.count,
            transaction_id:req.body.transaction_id,
            amount:req.body.amount

        })
    })

    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{history:history}},
        {new:true},
        (err,user)=>{
            if(err) return res.staus(400).json({error:'Could not update purchase history'})
            next()
        }
        )
}

exports.purchaseHistory=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate('user','_id name')
    .sort('-createdAt')
    .exec((err,orders)=>{
        if(err) return res.staus(400).json({error:'Could not get orders'})
        res.json(orders)
    })
}