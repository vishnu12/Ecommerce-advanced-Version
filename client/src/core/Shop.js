import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore'
import CheckBox from './CheckBox'
import { prices } from './fixedPrices'
import RadioBox from './RadioBox'

const Shop = () => {

const [categories, setCategories] = useState([])
const [error, setError] = useState('')
const [limit, setLimit] = useState(6)
const [skip, setSkip] = useState(0)
const [filteredResults, setFilteredResults] = useState([])
const [size, setSize] = useState(0)

const [myFilters, setMyFilters] = useState({
    filters:{category:[],price:[]}
})

const preloadCate=()=>{
    getCategories()
    .then(res=>{
        setCategories(res.data)
    })
    .catch(err=>{
        setError(err.response.data.error)
    })
}


useEffect(()=>{
   preloadCate()
   loadFilteredResults(skip,limit,myFilters.filters)
   
},[])

const handlePrice=(value)=>{
 const data=prices
 let array=[]
 for(let key in data){
     if(data[key]._id===parseInt(value)){
         array=data[key].priceArray
     }
 }
 return array
}

const loadFilteredResults=(newFilters)=>{
     //console.log(newFilters)
     getFilteredProducts(skip,limit,newFilters)
     .then(res=>{
          setFilteredResults(res.data.data)
          setSize(res.data.size)
          setSkip(0)
     })
     .catch(err=>setError(err.response.data.error))
}

const handleFilters=(filters,filterBy)=>{
    //   console.log(filters,filterBy)
    const newFilters={...myFilters}
    newFilters.filters[filterBy]=filters

    if(filterBy=='price'){
        let priceValues=handlePrice(filters)
        newFilters.filters[filterBy]=priceValues
    }
    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters)
}

const loadMore=()=>{
    let toSkip=skip+limit
    getFilteredProducts(toSkip,limit,myFilters.filters)
    .then(res=>{
        setFilteredResults([...filteredResults,...res.data.data])
        setSize(res.data.size)
        setSkip(0)
    })
    .catch(err=>setError(err.response.data.error))
}

const loadMoreButton=()=>{
    return(
        size >0 &&size>=limit &&(
            <button onClick={loadMore} className='btn btn-warning mb-5'>Show More</button>
        )
    )
}


  return (
    <Layout title='Shop Page'
    description='Search and find your Products'
    className='container-fluid'>
<div className='row'>
      <div className='col-4'>
          <h4>Filter by categories</h4>
          <ul>
          <CheckBox categories={categories}
          handleFilters={(filters)=>handleFilters(filters,'category')}/>
          
          </ul>

          <h4>Filter by price</h4>
          <ul>
          <RadioBox prices={prices}
          handleFilters={(filters)=>handleFilters(filters,'price')}/>
          
          </ul>
      </div>
      <div className='col-8'>
         <h2 className='mb-4'>Products</h2>
         <div className='row'>
         {
             filteredResults.map((product,index)=>{
                 return  <div className='col-4 mb-3' key={index}>
                     <Card product={product}/>
                 </div>
             })
         }
         </div>
         <hr/>
      {loadMoreButton()}
      </div>
   
</div>

    </Layout>
  )
}

export default Shop
