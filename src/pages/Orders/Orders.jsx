import React from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import search from "../../assets/lucide_search.svg";
import FilterDropDown from "../Drivers/Components/FilterDropDown";
import OrderDetails from "./Components/OrderDetails";

const Orders = () => {
  return (
    <MainLayout>
      <div className="min-h-[100vh] pb-10">
        <div className="pt-20 px-6 sm:pt-24 sm:px-8 md:pt-7 ">
          <div className="relative flex sm:flex-col flex-col  justify-between md:flex-row gap-3">
            <input
              type="text"
              className="block pl-10 w-[100%] lg:w-[85%] py-2 bg-white border rounded-full  focus:ring-4 focus:ring-purple-600 focus:outline-none  focus:ring-opacity-20 shadow-lg"
              placeholder="Search by Order ID, Name"
            />
            <img src={search} className="absolute mt-2 mx-2" />
            <div className=" text-right mr-2">
              <FilterDropDown />
            </div>
          </div>
          <div className="mt-6 md:mt-10 grid grid-flow-row-dense  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4">
            <OrderDetails />
            <OrderDetails />
            <OrderDetails />
            <OrderDetails />
            <OrderDetails />
            <OrderDetails />
            <OrderDetails />
            <OrderDetails />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Orders;
