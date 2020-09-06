import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'
import Card from './Card'
import Search from './Search'


const Home = () => {

const [productsBySell, setProductsBySell] = useState([])
const [productsByArrival, setProductsByArrival] = useState([])
const [error, setError] = useState(false)

const loadProdBySell=()=>{
 return getProducts('sold')
  .then(res=>{
    setProductsBySell(res.data)
  })
  .catch(err=>{
    setError(err.response.data.error)
  })
}


const loadProdByArrival=()=>{
 return getProducts('createdAt')
  .then(res=>{
    setProductsByArrival(res.data)
  })
  .catch(err=>{
    setError(err.response.data.error)
  })
}

useEffect(()=>{
  loadProdByArrival()
  loadProdBySell()
},[])

console.log(productsBySell)
return (
    <Layout title='Home Page' description='E-Commerce Application' 
    className='container-fluid'>

<Search />

<h2 className='mb-4'>New Arrivals</h2>
<div className='row'>
{
  productsByArrival.map((product,k)=>{
    return <div className='col-4 mb-3' key={k}>
    <Card product={product}/>
    </div>
  })
}
</div>
<h2 className='mb-4'>Best Sellers</h2>
<div className='row'>
{
  productsBySell.map((product,k)=>{
    return <div className='col-4 mb-3' key={k}>
    <Card product={product}/>
    </div>
  })
}
</div>

    </Layout>
  )
}

export default Home
