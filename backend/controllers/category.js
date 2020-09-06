
const Category =require('../models/category')
const {errorHandler} =require('../helpers/dbErrorHandler')

exports.findCateById=(req,res,next,id)=>{
   Category.findById(id).exec((err,category)=>{
    if(err) return res.status(400).json({error:'Category does not exists'})
    req.cate=category

    next()
   })
}

exports.createCategory=(req,res)=>{
  
    const category=new Category(req.body)
    category.save((err,cate)=>{
        if(err) return res.status(400).json({error:errorHandler(err)})
        res.json({category:cate})

 })
}

exports.getACategory=(req,res)=>{
    res.json(req.cate)
}

exports.updateCategory=(req,res)=>{
  const category=req.cate
  category.name=req.body.name
  category.save((err,data)=>{
      if(err) return res.status(400)
      .json({error:errorHandler(err)})

      res.json(data)
  })
}

exports.removeCategory=(req,res)=>{
   
    const category=req.cate
    
    category.remove((err,data)=>{
      if(err) return res.status(400)
      .json({error:errorHandler(err)})

      res.json({message:'Category deleted'})
  })
}

exports.getAllCategories=(req,res)=>{

  Category.find().exec((err,data)=>{
    if(err) return res.status(400)
    .json({error:errorHandler(err)})

    res.json(data)
  })
}