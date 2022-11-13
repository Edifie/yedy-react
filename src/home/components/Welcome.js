import React from 'react'
import GridLeft from './GridLeft'
import GridRight from './GridRight'

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