import React from 'react'
import LandingHeader from '../LandingHeader'
import AboutIma from '../AboutIma'
import LandingFooter from '../LandingFooter'
import OurTeam from '../../../SuperAdmin/pages/OurTeam/OurTeam'

const AboutUsPage = () => {
  return (
    <div>
      
      <LandingHeader />
        <AboutIma />
        <OurTeam />
        <LandingFooter />
        
    </div>
  )
}

export default AboutUsPage