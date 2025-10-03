import React from 'react'
import Gallery from '../components/Home/Gallery/Gallery'
import CountdownTimer from '../components/Home/Timer/CountdownTimer.jsx'; 

function Home() {
  return (
    <div>
      <CountdownTimer />
      <Gallery/>
    </div>
  )
}

export default Home