import React from 'react'

import './MainHeader.css'

const MainHeader = props => {
  return (
    <header className='main-header'>
         {/* To render everything */}
         {props.children}
    </header>
  )
}

export default MainHeader