import React from 'react'
import RideLocation from './RideLocation'
import RideYourLocation from './RideYourLocation'
import { useAuth } from '../../context/AuthContext'
import { MapPin } from 'lucide-react'

const RideMain = () => {

  const { user } = useAuth();

  const dummyRides = [
    {
      id: 1,
      pickup: "Hazratganj, Lucknow",
      drop: "Charbagh Railway Station, Lucknow",
      fare: "₹150",
      distance: "4.2 km",
      type: "Uber Go"
    },
    {
      id: 2,
      pickup: "Gomti Nagar, Lucknow",
      drop: "Chowk, Lucknow",
      fare: "₹280",
      distance: "12.5 km",
      type: "Uber Premier"
    },
    {
      id: 3,
      pickup: "Alambagh, Lucknow",
      drop: "Indira Nagar, Lucknow",
      fare: "₹210",
      distance: "9.8 km",
      type: "Uber Auto"
    }
  ];

  if (user?.roles?.[0] == "driver") {
    return (
      <div className='pt-10 px-5 lg:px-20 w-full h-full flex flex-col gap-8'>
        <h1 className='text-3xl font-bold'>Available Rides</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {dummyRides.map((ride) => (
            <div key={ride.id} className='border border-gray-200 rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-gray-100 px-3 py-1 rounded-full text-sm font-medium'>{ride.type}</div>
                <div className='font-bold text-lg'>{ride.fare}</div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex gap-3 items-start'>
                  <MapPin size={16} className="mt-1 text-green-600 shrink-0" />
                  <div>
                    <div className='text-xs text-gray-500'>Pickup</div>
                    <div className='font-medium text-sm'>{ride.pickup}</div>
                  </div>
                </div>
                <div className='flex gap-3 items-start'>
                  <MapPin size={16} className="mt-1 text-red-600 shrink-0" />
                  <div>
                    <div className='text-xs text-gray-500'>Drop</div>
                    <div className='font-medium text-sm'>{ride.drop}</div>
                  </div>
                </div>
              </div>
              <div className='text-sm text-gray-500 mt-2'>Distance: {ride.distance}</div>
              <div className='flex gap-3 mt-2'>
                <button className='flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer'>Accept</button>
                <button className='flex-1 bg-gray-100 text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer'>Decline</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className='pt-10 flex gap-10 h-full w-full '>

        <RideYourLocation />
      </div>
    )
  }
}

export default RideMain
