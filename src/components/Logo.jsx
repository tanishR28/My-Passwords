import React from 'react'

const Logo = (props) => {
  return (
    <div>
      <div className='font-bold text-[18px]'>
          <span className={`${props.color}`}>&lt;</span>My
          <span className={`${props.color}`}>-Passwords/&gt;</span>
    </div>
    </div>
  )
}

export default Logo
