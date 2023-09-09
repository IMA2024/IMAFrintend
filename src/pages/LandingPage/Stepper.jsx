import React from 'react'
import StepperNumbers from './StepperNumbers'
import StepperHeadings from './StepperHeadings'
import StepperDescription from './SteppperDescription'

const Stepper = () => {
  return (
    <div>
      <StepperHeadings />
       <StepperNumbers />
       
       <StepperDescription />
    </div>
  )
}

export default Stepper