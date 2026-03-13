import React, { useRef, useState, useEffect } from 'react'
import SeeSmallCards from './SeeSmallCards'
import smallcard1 from '../../assets/smallcard1.png'
import smallcard2 from '../../assets/smallcard2.png'
import smallcard3 from '../../assets/smallcard3.png'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import smallcard4 from '../../assets/smallcard4.png'
import smallcard5 from '../../assets/smallcard5.png'
import smallcard6 from '../../assets/smallcard6.png'

const SeeContainer = () => {
    const ScrollRef = useRef(null);
    const [PageNum, setPageNum] = useState(1)
    const [TotalPage, setTotalPage] = useState(2)

    const ArrayObject = [
        {
            image: smallcard1,
            heading: "Rides to the airport",
        },
        {
            image: smallcard2,
            heading: "Business meetings"
        },
        {
            image: smallcard3,
            heading: "Dinner reservations"
        },
        {
            image: smallcard4,
            heading: "Commutes"
        },
        {
            image: smallcard5,
            heading: "Pickups in suburbs"
        },
        {
            image: smallcard6,
            heading: "Appointments"
        }

    ]

    useEffect(() => {
        const calculateTotalPages = () => {
            let itemsPerPage = 1;
            if (window.innerWidth >= 1024) itemsPerPage = 3;
            else if (window.innerWidth >= 768) itemsPerPage = 2;
            
            const newTotal = Math.ceil(ArrayObject.length / itemsPerPage);
            setTotalPage(newTotal);
            if (PageNum > newTotal) setPageNum(newTotal);
        };
        calculateTotalPages();
        window.addEventListener('resize', calculateTotalPages);
        return () => window.removeEventListener('resize', calculateTotalPages);
    }, []);

    useEffect(() => {
        const element = ScrollRef.current;
        if (!element) return;

        let timeoutId;
        const handleScroll = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const scrollLeft = element.scrollLeft;
                let itemsPerPage = 1;
                if (window.innerWidth >= 1024) itemsPerPage = 3;
                else if (window.innerWidth >= 768) itemsPerPage = 2;
                
                const pageWidth = 400 * itemsPerPage;
                const newPage = Math.round(scrollLeft / pageWidth) + 1;
                
                if (newPage >= 1 && newPage <= TotalPage) {
                    setPageNum(newPage);
                }
            }, 100);
        };

        element.addEventListener('scroll', handleScroll);
        return () => {
            element.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        }
    }, [TotalPage]);

    function ScrollRight() {
        let scrollAmount = 400;
        if (window.innerWidth >= 1024) scrollAmount = 1200;
        else if (window.innerWidth >= 768) scrollAmount = 800;

        ScrollRef.current?.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
        if (PageNum < TotalPage) setPageNum(PageNum + 1);
    }

    function ScrollLeft() {
        let scrollAmount = 400;
        if (window.innerWidth >= 1024) scrollAmount = 1200;
        else if (window.innerWidth >= 768) scrollAmount = 800;

        ScrollRef.current?.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
        if (PageNum > 1) setPageNum(PageNum - 1);
    }

    return (
        <div className='py-30 flex flex-col gap-20'>
            <div>
                <SeeSmallCards ArrayObject={ArrayObject} ScrollRef={ScrollRef} />
            </div>
            <div className='relative w-full'>
                <div className='flex gap-5 items-center absolute right-0'>
                    <div className=''>
                        {PageNum}/{TotalPage}
                    </div>
                    <div className={`rounded-full h-13 w-13 flex items-center justify-center duration-150 ${PageNum === 1 ? "bg-gray-200 cursor-default" : "bg-gray-300 hover:bg-gray-400 cursor-pointer"}`} onClick={ScrollLeft} >
                        <ChevronLeft strokeWidth={3} className={`${PageNum === 1 ? "text-gray-400" : "text-black"}`} />
                    </div>
                    <div className={`rounded-full h-13 w-13 flex items-center justify-center duration-150 ${PageNum === TotalPage ? "bg-gray-200 cursor-default" : "bg-gray-300 hover:bg-gray-400 cursor-pointer"}`} onClick={ScrollRight}>
                        <ChevronRight strokeWidth={3} className={`${PageNum === TotalPage ? "text-gray-400" : "text-black"}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeeContainer
