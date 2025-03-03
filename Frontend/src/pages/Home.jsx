import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { Outlet } from 'react-router-dom'
import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/skills'
import Projects from '../components/Projects'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
       {/* <Header/> */}
       <Hero/>
       <About/>
       <Experience/>
       <Skills/>
       <Projects/>
       <Footer/>
       <Outlet/>
    </div>
 
  
  )
}

export default Home