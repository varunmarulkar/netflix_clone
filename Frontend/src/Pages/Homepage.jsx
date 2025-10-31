import React from 'react'
import Hero from '../Components/Hero'
import CardList from '../Components/CardList'
import Footer from '../Components/Footer'

const Homepage = () => {
  return (
    <div className='p-5'>
      <Hero />
      <CardList title="Now Playing" category="now_playing" />
      <CardList title="Top Rates" category="top_rated" />
      <CardList title="Popular" category="popular" />
      <CardList title="Upcoming" category="upcoming" />
      <Footer />
    </div>
  )
}

export default Homepage
