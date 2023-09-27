import React from 'react'
import HeroHeader from './HeroHeader'
import LandingHeader from './LandingHeader'
import AboutIma from './AboutIma'
import StepperDetails from './StepperDetails'
import Services from './Services'
import Reviews from './Reviews'
import ContactUs from './ContactUs'
import LandingFooter from './LandingFooter'

const LandingPage = () => {
  return (
    <div>
      
      <LandingHeader />
        <HeroHeader />
        <AboutIma />
        <StepperDetails />
        <Services />
        <Reviews />
       <ContactUs />
        <LandingFooter />
        
    </div>
  )
}

export default LandingPage