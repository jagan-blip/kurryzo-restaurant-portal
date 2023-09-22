import React, { useState } from "react";

function Stepper() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <h2>Step {currentStep}</h2>

      {currentStep === 1 && (
        <div>
          <h3>Step 1</h3>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h3>Step 2</h3>
          <button onClick={prevStep}>Previous</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h3>Step 3</h3>
          <button onClick={prevStep}>Previous</button>
        </div>
      )}
    </div>
  );
}

export default Stepper;
