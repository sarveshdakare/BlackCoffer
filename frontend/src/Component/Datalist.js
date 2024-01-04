import React, { useEffect } from 'react'
import { useState } from 'react'

import './Datalist.css'

const Datalist = () => {
    const[data,setdata]=useState([]);

    useEffect(() => {
        getdata();
      }, []);

    const getdata=async()=>{
        const result=await fetch('http://localhost:5000/info');
        const confirm=await result.json();

        setdata(confirm.slice(0, 50));
    };
    console.log(data)
    const searchHandle=async(e)=>{
        let key=e.target.value;
        
        if(key){
          let result=await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          })
          result=await result.json()
          if(result){
            setdata(result.slice(0, 100));
          }
        }else{
          getdata()
        }
        
        
          }
  return (
    <div>
          <input type="text" placeholder='search by country,topic,region..' className='search-box' onChange={searchHandle}/>

<div className="product-list">
    <ul>
        <li>Sr. No,</li>
        <li>Intensity</li>
        <li>Likelihood</li>
        <li>Relevance</li>
        {/* <li>Year</li> */}
        <li>Country</li>
        <li>Topics</li>
        <li>Region</li>
        <li>Sector</li>
    </ul>
    {
        data.length>0?data.map((item,index)=>(
            <ul key={item._id}>
   <li>{index+1}</li>
   <li>{item.intensity}</li>
   <li>{item.likelihood}</li>
   <li>{item.relevance}</li>
   {/* <li>{item.year}</li> */}
   <li>{item.country}</li>
   <li>{item.topic}</li>
   <li>{item.region}</li>
   <li>{item.sector}</li>
            </ul>
        )):
        <h1>No Result</h1>
    }
</div>
    </div>
  )
}

export default Datalist