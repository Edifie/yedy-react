import React from 'react'
import { Link } from 'react-router-dom'


import './GridLeft.css'

const GridLeft = () => {
  return (
    <div className='grid-left'>
        <div className='grid-left__text'>
            <h1>The freedom to create your own website</h1>
        </div>
        <div className='grid-left__paragh'>
            <p> Design and build your own high-quality websites. Whether you're
            promoting your small business, opening your store - you can do it
            all with the Yedy website builder.</p>
        </div>
        <button className='grid-left__button' type='submit'>
            <Link to='/users'>Get Started</Link></button>
    </div>
  )
}

export default GridLeft