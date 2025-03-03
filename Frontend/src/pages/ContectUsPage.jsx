import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContectHero from '../components/ContectHero'
import Send from '../components/Send'
import { Outlet } from 'react-router-dom'


const ContectUsPage = () => {
  return (
    <div>
      {/* <Header /> */}
      <ContectHero />
      <Send/>
      <Footer />
      <Outlet />
    </div>
  )
}

export default ContectUsPage