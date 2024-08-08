import React, { useState,useEffect } from 'react';
import { categories } from '/src/Data.js';
import "../Style/Listing.css";
import ListingCard from './ListingCard';
import Loader from  './Loader.jsx'
import {useDispatch, useSelector} from "react-redux"
import {setListings} from '../redux/state.js'


function Listings() {
    const dispatch=useDispatch()
    const [Loading,setLoading]=useState(true)
    const [selectedCategory, setSelectedCategory] = useState("All");
    const listings=useSelector((state)=> state.listings)
    const getFeedListings = async () => {
        try {
          const response = await fetch(
            selectedCategory !== "All"
              ? `http://localhost:3000/properties?category=${selectedCategory}`
              : "http://localhost:3000/properties",
            {
              method: "GET",
            }
          );
    
          const data = await response.json();
          dispatch(setListings({ listings: data }));
          setLoading(false);
        } catch (err) {
          console.log("Fetch Listings Failed", err.message);
        }
      };
      useEffect(() => {
        getFeedListings();
      }, [selectedCategory]);
    

  return (
    <>
    <div className='category-list'>
      {categories && categories.length > 0 ? (
        categories.map((category, index) => (
          <div className={`category ${category.label === selectedCategory ? "selected" : ""}`} key={index} onClick={()=>setSelectedCategory(category.label)}>
            <div className='category_icon'>{React.createElement(category.icon)}</div>
            <p>{category.label}</p>
          </div>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
    {Loading ? <Loader/>:(
        <div className='listings'>
        {listings.map(( {_id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking=false
})=>(<ListingCard 
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />))}</div>
    )}
    </>
  );
}

export default Listings;
