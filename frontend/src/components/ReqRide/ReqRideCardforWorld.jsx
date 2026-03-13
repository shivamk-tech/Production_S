import React, { useRef } from 'react'

const ReqRideCardforWorld = ({ ArrayObject, ScrollRef, setPageNum, TotalPage }) => {
  const scrollTimeout = useRef(null);

  const handleScroll = (e) => {
    // Do nothing if we don't have a way to update page number
    if (!setPageNum || !TotalPage) return;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Use a timeout to only update the page number when scrolling has stopped
    scrollTimeout.current = setTimeout(() => {
      const { scrollLeft } = e.target;

      // These values should match the logic in the parent component
      const itemWidth = 400; // w-85 (340px) + gap-15 (60px)
      let itemsPerPage = 1;
      if (window.innerWidth >= 1024) {
        itemsPerPage = 3;
      } else if (window.innerWidth >= 768) {
        itemsPerPage = 2;
      }

      const scrollAmountPerPage = itemWidth * itemsPerPage;
      let newPageNum = Math.round(scrollLeft / scrollAmountPerPage) + 1;

      // Clamp the page number to be within valid bounds
      if (newPageNum > TotalPage) newPageNum = TotalPage;
      if (newPageNum < 1) newPageNum = 1;

      setPageNum(newPageNum);
    }, 150);
  };

  return (
    <div
      ref={ScrollRef}
      onScroll={handleScroll}
      className="flex gap-15 overflow-x-auto w-full snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {ArrayObject.map((item, index) => (
        <div key={index} className='flex flex-col gap-5 flex-shrink-0 w-85 snap-start'>
          <div className='overflow-hidden h-43'>
            <img className='object-cover h-full w-full' src={item.image} alt=""/>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='text-lg font-medium'>
              {item.heading}
            </div>

            <div className='text-[#333333] font-light text-base'>
              {item.desc}
            </div>
          </div>

          <div className='text-[#2f2f2f] font-lg'>
            <u className='underline-offset-8 decoration-gray-300'>
              Learn more about {item.heading}
            </u>
          </div>

        </div>
      ))}
    </div>
  )
}

export default ReqRideCardforWorld
