import React from 'react'
import { Navigation, ChevronDown, MapPin, Tag } from 'lucide-react';
import SmileMam from "../../assets/SmileMam.png";

const Hero = () => {

    return (
        <div className='flex flex-col lg:flex-row gap-30 justify-between w-full lg:px-0  items-center pt-10 lg:pt-20'>
            <div className='flex flex-col gap-5 lg:gap-13 w-full lg:w-auto'>
                {/* Hero text */}
                <div className='flex flex-col gap-2 lg:gap-3 sm:w-full'>
                    <div className='flex flex-col gap-3 sm:w-full' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        <div className='md:text-5xl  text-5xl font-extrabold lg:w-100 md:100 w-150'>Go with uber</div>
                    </div>
                </div>

                <div className='flex flex-col gap-6'>
                    {/* Map text */}
                    <div className='flex flex-col gap-5'>
                        <div className=''>
                            <div className='flex flex-col gap-2 font-light text-base'>
                                <span className=''>
                                    <span className=''>Find a ride for every road with access in more than 15,000 cities worldwide.</span>
                                </span>
                                <span className=''>
                                    Because the best adventures come to you.
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Location */}
                    <div className='flex flex-col gap-4 relative lg:w-full '>
                        <div className='absolute z-[1] flex flex-col items-center top-5 left-5'>
                            <div className='border-6 rounded-full h-4 w-4'></div>
                            <div className='w-1 h-14 '></div>
                            <div className='h-4 w-4 border-5'></div>
                        </div>
                        <div>
                            <input type="text" className='h-10 bg-[#EFEFEF] pl-12 pr-12 rounded-[7px] py-7 w-full' placeholder='Pickup Location' />
                            <Navigation className='absolute top-4 right-4' />
                        </div>
                        <div>
                            <input type="text" className='h-10 bg-[#EFEFEF] pl-12 pr-12 rounded-[7px] py-7 w-full' placeholder='Dropoff location' />
                        </div>
                        <div className='flex gap-3 sm:gap-5'>
                            <button className='text-white bg-black rounded-[8px] px-4 sm:px-6 py-3'><span className='font-medium sm:font-semibold'>See prices</span></button>
                            <button className='text-black bg-gray-200 rounded-[8px] px-4 sm:px-6 py-3 '><span className='font-medium sm:font-semibold'>Schedule for later</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-138 lg:max-w-[750px] lg:block hidden'>
                <img src={SmileMam} className='object-cover w-full h-full block rounded-2xl' />
            </div>
        </div>

    )
}




export default Hero
