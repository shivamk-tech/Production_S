import React from 'react'
import RideMapNav from './RideMapNav'
import RideMain from './RideMain'

const RideMap = () => {
  return (
    <div className='px-1 flex flex-col lg:px-16 pt-16'>
      <RideMapNav/>
      <RideMain/>
    </div>
  )
}

export default RideMap
