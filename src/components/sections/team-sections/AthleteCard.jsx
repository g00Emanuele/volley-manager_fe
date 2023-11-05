import React from 'react'

const AthleteCard = ({cover, name, role}) => {
  return (
    <div className='col'><div className="card mb-3">
    <div className="row g-0">
      <div className="col-md-4">
        <img src={cover} className="img-fluid rounded-start" alt="cover"/>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{role}</p>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default AthleteCard