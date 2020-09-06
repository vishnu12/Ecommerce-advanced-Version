import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getSingleProduct, relatedProducts} from './apiCore'
import Card from './Card'


const Product = (props) => {

    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)

const loadSingleProduct=(productId)=>{
    getSingleProduct(productId)
    .then(res=>{
        setProduct(res.data)
        //get related products
        relatedProducts(res.data._id)
        .then(response=>{
         setRelatedProduct(response.data)
        })
        .catch(err=>setError(err.response.data))
    })
    .catch(err=>{
        setError(err.response.data)
    })
}

useEffect(()=>{
   const productId=props.match.params.productId
   loadSingleProduct(productId)
},[props])

console.log(product)
  return (
    <Layout title={product && product.name}
    description={product && product.description && product.description.substring(0,100)}
    className='container'>

<div className='row'>
<div className='col-8'>
{
    product && product.description && <Card product={product} 
    viewButton={false}/>
}
</div>
<div className='col-4'>
<h4>Related products</h4>
{
   
  relatedProduct.map((p,i)=>{
       return <div className='mb-3' key={i}>
       <Card product={p}/>
       </div>
    })
}
</div>
</div>
    </Layout>
  )
}

export default Product
