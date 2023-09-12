import React from 'react';

const AreaCard = ({ title, total, online, offline}) => {
  return (
   <div className="bg-[#F5F9FA] border border-dashed border-gray-500 md:rounded-xl rounded-3xl">
      <p className='text-center  mt-5 md:text-3xl font-semibold md:mt-7 tracking-widest'>{title}</p>
      <div className='mt-5 md:mt-8 ml-3 md:ml-6 mr-3 md:mr-11 flex'>
        <div className='bg-[#d8f8e7] py-1 w-[100%] md:py-3 md:w-[85%] font-semibold md:text-xl rounded-lg'>
          <p className='ml-2 md:ml-3'>TOTAL</p>
        </div>
        <p className='w-20 md:w-20 py-1 md:py-2 rounded-md text-center text-base md:text-2xl font-medium bg-[#00A859] text-white '>{total}</p>
      </div>
      <div className='flex mx-4 md:mx-6 mt-6 gap-1 md:gap-4  '>
        <div className=" md:mb- h-4 md:h-8 w-[100%] bg-[#ccddff] md:rounded-md">
          <div className="h-4 md:h-8 bg-gradient-to-r from-[#256DFA] to-[#6799fd] md:rounded-md " style={{ width: "75%" }}>
            <p className=' text-white font-medium px-3 md:py-1 text-xs md:text-base'>ONLINE</p>
          </div>
        </div>
        <p className='font-bold text-sm md:text-2xl'>{online}</p>
      </div>

      <div className='flex mx-4 md:mx-6 mt-6 gap-1 md:gap-4 '>
        <div className="mb-4 md:mb-6 h-4 md:h-8 w-[100%] bg-[#ccddff] md:rounded-md">
          <div className="h-4 md:h-8 bg-gradient-to-r from-[#FA255E] to-[#996394] md:rounded-md " style={{ width: "35%" }}>
            <p className=' text-white font-medium px-3 md:py-1 text-xs md:text-base'>OFFLINE</p>
          </div>
        </div>
        <p className='font-bold text-sm md:text-2xl'>{offline}</p>
      </div>
      
      <div className='text-center text-lg md:text-right mr-5 mb-3'>
        <p className='text-[#FF6B00] cursor-pointer font-medium'>View Details</p>
      </div>
    </div> 
  );
}

export default AreaCard;
