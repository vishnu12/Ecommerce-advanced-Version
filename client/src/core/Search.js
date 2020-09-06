import React,{useState,useEffect} from 'react'
import { getProducts, getCategories, listProd } from './apiCore'
import Card from './Card'


const Search = () => {

    const [data, setData] = useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false
    })
const {categories,category,search,results,searched}=data

const loadCategories=()=>{
    getCategories()
    .then(res=>{
        setData({
            ...data,
            categories:res.data
        })
    })
    .catch(err=>console.log(err))
}

useEffect(()=>{
    loadCategories()
},[])

const handleChange=e=>{
   const {name,value}=e.target
   setData({
       ...data,
       [name]:value,
       searched:false
   })
}

const searchData=()=>{
    if(search){
        listProd({ search: search || undefined, category: category })
        .then(res=>{
            setData({
                ...data,
                results:res.data,
                searched:true
            })
        })
        .catch(err=>console.log(err))
    }
}

const searchMessage=(searched,results)=>{
  if(searched && results.length>0){
   return `Found ${results.length} products`
  }

  if(searched && results.length <1){
    return `No products found`
   }
}

const searchedProducts=(results=[])=>{
   return (
       <>
       <div>
           <h2 className='mt-4 mb-4'>
               {searchMessage(searched,results)}
           </h2>
       </div>
       <div className="row">
       {
           results.map((product,k)=>{
               return <Card key={k} product={product}/>
           })
       }
     </div>
     </>
   )
}

const submit=e=>{
  e.preventDefault()
   searchData()
}

const searchForm=()=>{
    return <form onSubmit={submit}>
      <span className="input-group-text">
          <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                  <select name="category" className="btn mr-2" onChange={handleChange}>
                <option value='All'>All</option>
               {
                   categories.map((cate,key)=>{
                   return <option key={key} value={cate._id}>{cate.name}</option>
                   })
               }
                  </select>
              </div>
          <input type='search' className='form-control' name='search'
           value={search} onChange={handleChange} placeholder='search by name'/>
          </div>
          <div className="btn input-group-append" style={{border:'none'}}>
           <button className="input-group-text" type='submit'>
               Search
               </button>   
          </div>
      </span>
    </form>
}


  return (
    <div className='row'>
     <div className="container mb-3">
         {searchForm()}
        
        <div className="container-fluid mb-3">
           {searchedProducts(results)}
        </div>
     </div>
    </div>
  )
  }

export default Search
