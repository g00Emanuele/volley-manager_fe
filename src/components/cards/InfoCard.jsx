import React from "react";
import "./infoCardStyle.css"

const InfoCard = ({ icon, title, desc }) => {
  return (
    <div className="col-md-4 g-5 my-5">
        <div className="card-body">
          <div className="text-center p-2">{icon}</div>
          <h5 className="card-title text-center p-2">{title}</h5>
          <h6 className="card-text text-center p-2">{desc}</h6>
      </div>
    </div>
  );
};

export default InfoCard;
