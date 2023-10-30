import React from 'react'
import useSession from '../custom-hooks/session'

const AthletePrivatePage = () => {

  const session = useSession()
  console.log(session)
  
  return (
    <div>AthletePrivatePage</div>
  )
}

export default AthletePrivatePage