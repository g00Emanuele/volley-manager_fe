import React from 'react'
import useSession from '../custom-hooks/session'

const TeamPrivatePage = () => {

    const session = useSession()
    console.log(session)

  return (
    <div>TeamPrivatePage</div>
  )
}

export default TeamPrivatePage