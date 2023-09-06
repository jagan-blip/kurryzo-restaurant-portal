import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-bg_primary">
      <Navbar />
      <div className="md:pl-[15vw]">{children}</div>
    </div>
  );
};

export default MainLayout;
