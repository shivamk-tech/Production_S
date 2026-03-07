import React from 'react'
import { Phone, MessageSquare, User, Navigation } from 'lucide-react'

const DriversRideDashboard = ({ ride, setRide }) => {
  return (
    <div className='w-full h-[85vh] flex flex-col relative bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200'>
      
      {/* Map Container - You will handle the map implementation here */}
      <div className='flex-1 w-full relative bg-gray-200' id='map-container'>
        {/* Placeholder for map */}
        <div className='absolute inset-0 flex items-center justify-center text-gray-500 font-medium'>
          Map Area (Live Tracking)
        </div>
        
        {/* Overlay for status */}
        <div className='absolute top-4 left-4 z-10'>
           <div className='bg-white px-4 py-2 rounded-full shadow-md text-sm font-semibold flex items-center gap-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              On the way to pickup
           </div>
        </div>
      </div>

      {/* Ride Information Panel */}
      <div className='bg-white rounded-t-3xl shadow-[0_-5px_15px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-6 z-20 h-auto'>
        
        {/* Rider Header */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <div className='h-14 w-14 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200'>
              <User size={28} className='text-gray-600' />
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-800 capitalize'>
                {ride?.rider?.firstName || "Rider"} {ride?.rider?.lastName || ""}
              </h2>
              <div className='text-sm text-gray-500 font-medium'>
                Payment: Cash
              </div>
            </div>
          </div>
          
          <div className='flex gap-3'>
            <button className='h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer'>
              <Phone size={22} />
            </button>
            <button className='h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer'>
              <MessageSquare size={22} />
            </button>
          </div>
        </div>

        <div className='w-full h-[1px] bg-gray-200'></div>

        {/* Route Details */}
        <div className='flex flex-col gap-6'>
          <div className='flex gap-4 items-start'>
            <div className='flex flex-col items-center gap-1 mt-1.5'>
              <div className='h-3 w-3 bg-green-500 rounded-full ring-2 ring-green-100'></div>
              <div className='h-12 w-[2px] bg-gray-200 rounded-full'></div>
              <div className='h-3 w-3 bg-red-500 rounded-full ring-2 ring-red-100'></div>
            </div>
            
            <div className='flex flex-col gap-6 w-full'>
              <div className='text-sm'>
                <div className='text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1'>Pickup</div>
                <div className='font-semibold text-gray-800 leading-tight'>
                  {ride?.pickup?.address}
                </div>
              </div>
              <div className='text-sm'>
                <div className='text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1'>Dropoff</div>
                <div className='text-base font-semibold text-gray-800 leading-tight'>
                  {ride?.drop?.address}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Stats */}
        <div className='flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100'>
          <div className='flex flex-col items-center w-1/3'>
            <span className='text-xs text-gray-500 font-medium uppercase'>Distance</span>
            <span className='font-bold text-lg text-gray-800'>{ride?.distance} km</span>
          </div>
          <div className='w-[1px] h-8 bg-gray-200'></div>
          <div className='flex flex-col items-center w-1/3'>
            <span className='text-xs text-gray-500 font-medium uppercase'>Fare</span>
            <span className='font-bold text-lg text-gray-800'>₹{ride?.fare?.estimated || ride?.fare}</span>
          </div>
          <div className='w-[1px] h-8 bg-gray-200'></div>
          <div className='flex flex-col items-center w-1/3'>
            <span className='text-xs text-gray-500 font-medium uppercase'>Est. Time</span>
            <span className='font-bold text-lg text-gray-800'>20 min</span>
          </div>
        </div>

        {/* Action Button */}
        <div className='mt-2'>
          <button className='w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer'>
            <Navigation size={20} />
            Navigate to Pickup
          </button>
        </div>

      </div>
    </div>
  )
}

export default DriversRideDashboard
