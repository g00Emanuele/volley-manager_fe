import React from 'react'
import useSession from '../custom-hooks/session'
import AthletesSection from '../components/sections/team-sections/AthletesSection'

const AthletePrivatePage = () => {

  const session = useSession()
  console.log(session)
  
  return (
    <div></div>
  )
}

export default AthletePrivatePage