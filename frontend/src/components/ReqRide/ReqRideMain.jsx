import React from 'react'
import ReqRideHero from '../ReqRide/ReqRideHero'
import Navbar from '../Navbar'
import SubNav from '../SubNav'
import Suggestion from '../Suggestion'
import ReqRideWorld from './ReqRideWorld'
import ReqRideWorld2 from './ReqRideWorld2'
import ReqRideShuttle from './ReqRideShuttle'
import ReqRideExplore from './ReqRideExplore'
import SeePrices from '../SeePrices'
import ReqRideSignUp from './ReqRideSignUp'
import ReqRidePromoDetails from './ReqRidePromoDetails'
import Footer from '../Footer'


const ReqRideMain = () => {
  return (
    <div className='flex flex-col'>
      <div className='w-full pt-32 lg:px-40 px-6 flex flex-col items-center'>
        <Navbar />
        <SubNav />
        <ReqRideHero />
        <Suggestion />
        <ReqRideWorld />
        <ReqRideWorld2 />
        <ReqRideShuttle />
        <ReqRideExplore />
        <ReqRideSignUp />
      </div>
      <div>
        <ReqRidePromoDetails />
      </div>
      <Footer/>
      <SeePrices/>
    </div>
  )
}

export default ReqRideMain
