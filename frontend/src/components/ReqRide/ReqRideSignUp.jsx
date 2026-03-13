import React from 'react'
import { ArrowRight } from 'lucide-react';
import logo from "../../assets/logo.svg";

const ReqRideSignUp = () => {
    return (
        <div className='flex flex-col md:flex-row w-full justify-between gap-5'>
            <div className='w-full border-gray-200 border-b-2 px-2 md:px-3 md:py-1 md:flex-1 group cursor-pointer'>
                <div className='flex flex-row justify-between items-center lg:p-5 lg:py-1 md:py-2 py-4 h-auto sm:h-50 bg-white w-full group gap-4 sm:gap-0' >
                    <div className='flex items-center gap-3 sm:gap-5 w-full'>
                        <div>
                            <span className='lg:text-4xl text-2xl font-semibold group-hover:text-gray-700'>Sign up to ride</span>
                        </div>
                    </div>

                    <div className='flex-shrink-0'>
                        <ArrowRight className='transition-transform duration-300 ease-in group-hover:translate-x-4 m-0 group-hover:text-gray-700' size={50} strokeWidth={3}/>
                    </div>
                </div>
            </div>
            <div className='w-full border-gray-200 border-b-2 px-2 md:px-3 md:py-1 md:flex-1 group cursor-pointer'>
                <div className='flex flex-row justify-between items-center lg:p-5 lg:py-1 md:py-2 py-4 h-auto sm:h-50 bg-white w-full group gap-4 sm:gap-0' >
                    <div className='flex items-center gap-3 sm:gap-5'>
                        <div>
                            <span className='lg:text-4xl text-2xl font-semibold w-full group-hover:text-gray-700 '>Read our Community Guidelines</span>
                        </div>
                    </div>

                    <div className='flex-shrink-0'>
                        <ArrowRight className='transition-transform duration-300 ease-in group-hover:translate-x-4 m-0 group-hover:text-gray-700' size={50} strokeWidth={3}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReqRideSignUp
