import React from 'react'
import SidebarMenu from '../components/SidebarMenu'
import "../css/Home.css"
import  HomeDesign  from '../components/HomeDesign'

const Home = () => {
    return (
        <div>
             <SidebarMenu/>
             <HomeDesign/>
        </div>
    )
}

export default Home;