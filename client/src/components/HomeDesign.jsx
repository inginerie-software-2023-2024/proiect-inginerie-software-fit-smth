import React from 'react'
import Homeimage from "../assets/images/Home.png"
import Servicesimage from "../assets/images/Services.png"
import Testimonialsimage from "../assets/images/Testimonials.png"
import Contactimage from "../assets/images/Contact.png"
import Aboutimage from "../assets/images/About.png"
import "../css/HomeDesign.css"

const HomeDesign = () => {
  return (
    <div>
        <img alt="" class="img" src={Homeimage}/> 
        <img alt="" class="img" src={Aboutimage}/> 
        <img alt="" class="img" src={Servicesimage}/> 
        <img alt="" class="img" src={Testimonialsimage}/> 
        <img alt="" class="img" src={Contactimage}/> 
        
    </div>
  )
}

export default HomeDesign;
