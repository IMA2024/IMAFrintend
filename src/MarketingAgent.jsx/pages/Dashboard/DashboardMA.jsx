import React from 'react'
import BusinessBlocks from '../../../SuperAdmin/pages/Charts/BusinessBlocks'
import RegisteredBusinessChart from '../../../SuperAdmin/pages/Charts/RegisteredBusinessChart'
import CallsBlock from './CallsBlock'
import CallsChart from './CallsChart'

const DashboardMA = () => {
  return (
    <div>
      <BusinessBlocks />
        <RegisteredBusinessChart />
        <CallsBlock />
        <CallsChart />
    </div>
  )
}

export default DashboardMA