import React from 'react'
import Assigned from '../../../assets/vector.svg'
import dot from '../../../assets/dot.svg'


const OrderDetails = () => {
  return (
    <div className='bg-[#F5F9FA] border rounded-3xl md:w-[27%]'>
  <div className='flex flex-col md:flex-row md:ml-5 mt-6'>
    <div className='bg-[#00A859] w-[13%] rounded-full flex justify-center items-center md:ml-0 md:mr-2 md:mt-0'>
      <img src={Assigned} alt="" />
    </div>
    <div className='mt-2 md:mt-0'>
      <div className='flex flex-col md:flex-row gap-4 text-gray-500 font-medium '>
        <p>Order ID</p>
        <p>Price</p>
      </div>
      <div className='flex flex-col md:flex-row gap-4 font-semibold'>
        <p className='text-lg'>#4589039</p>
        <p>257.00</p>
      </div>
    </div>
  </div>
  <div className='flex flex-col md:flex-row justify-between md:ml-6 mt-5 mb-8'>
    <div>
      <p className='font-medium text-gray-500 tracking-wider'>21 Aug 2023</p>
      <p className='tracking-wider text-gray-500'>9:43 AM</p>
    </div>
    <div>
      <p className='bg-[#d4fae8] px-4 md:px-8 py-2 md:mr-4 border border-dashed border-gray-400 rounded-xl text-base md:text-xl font-semibold'>Assigned</p>
    </div>
  </div>
  <div className='flex items-center gap-1.5'>
    <div className='md:ml-6 mt-1'><img src={dot} alt="" /></div>
    <div className='border border-dashed mt-1 px-5 md:px-11 bg-black'></div>
    <div className='md:mt-1'><img src={dot} alt="" /></div>
    <div className='border border-dashed mt-1 px-5 md:px-11 bg-black'></div>
    <div className='md:mt-1'><img src={dot} alt="" /></div>
    <div className='border border-dashed mt-1 px-5 md:px-11 bg-black'></div>
    <div className='md:mt-1'><img src={dot} alt="" /></div>
  </div>
  <div className='flex flex-col md:flex-row justify-between md:ml-6 mt-6 mb-6'>
    <div>
      <p className='font-medium text-lg'>SS Hyderabad</p>
      <p className='text-gray-500'>Anna Nagar</p>
    </div>
    <div>
      <p className='bg-[#d3bed1] text-[#6E2F69] px-3 md:px-7 py-1 md:mr-6 border border-dashed border-gray-400 rounded-3xl text-base md:text-xl cursor-pointer font-medium'>Details</p>
    </div>
  </div>
</div>

  )
}

export default OrderDetails