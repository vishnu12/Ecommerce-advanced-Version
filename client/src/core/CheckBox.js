import React,{useState,useEffect} from 'react'

const CheckBox = ({categories,handleFilters}) => {

    const [checked, setChecked] = useState([])

    const handleToggle=c=>{
       const currentCateId=checked.indexOf(c)
       const newCheckedCateId=[...checked]
       if(currentCateId===-1){
           newCheckedCateId.push(c)
       }else{
           newCheckedCateId.splice(currentCateId,1)
       }
       setChecked(newCheckedCateId)
       handleFilters(newCheckedCateId)
    }


  return categories.map((cate,key)=>{
      return <li className='list-unstyled' key={key}>
          <input type='checkbox' className='form-check-input'
          onChange={()=>handleToggle(cate._id)} value={checked.indexOf(cate._id===-1)}/>
  <label className='form-check-label'>{cate.name}</label>
      </li>
  })
}

export default CheckBox
