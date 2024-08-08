import React from 'react'
import Navbar from '../components/Navbar'
import Slide from "../components/Slide"
import Categorie from '../components/Categorie'
import Listings from '../components/Listings.jsx'
import Footer from "../components/Footer";

function HomePage() {
  return (
   <>
   <Navbar/>
   <Slide/>
   <Categorie/>
   <Listings/>
    <Footer/>
   </>
  )
}

export default HomePage