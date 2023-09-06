import React, { useState } from "react";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";

const PageLoading = () => {
  return (
    <div className=" w-[100vw] loading-container z-[4000] h-[100vh] flex justify-center items-center fixed top-0 left-0">
      <CircularProgressBar />
    </div>
  );
};

export default PageLoading;
