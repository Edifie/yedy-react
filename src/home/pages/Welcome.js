import React from 'react'
import GridLeft from '../components/GridLeft'
import GridRight from '../components/GridRight'

import './Welcome.css'

const Welcome = () => {
  return (
    <div className='grid-container'>
        <GridLeft></GridLeft>
        <GridRight></GridRight>
    </div>
  )
}

export default Welcome