import React, { useState } from "react";
import "./AthleteCardStyle.css";
import { BsFillTrashFill } from "react-icons/bs";

const AthleteCard = ({ cover, name, role, surname, cardWidth, id, token }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteAthlete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/athletes/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.json();
      setLoading(false);
      // window.location.reload();
    } catch (error) {
      if (error) setError(error);
    }
  };

  return (
    <div className={`col-lg-${cardWidth}`}>
      <div className="single_advisor_profile wow fadeInUp">
        <div
          className="advisor_thumb d-flex justify-content-center"
          style={{ height: "15em" }}
        >
          <img
            className="rounded"
            src={cover}
            alt=""
            style={{ maxWidth: "100%" }}
          />
        </div>
        <div className="single_advisor_details_info">
          <h6>{name}</h6>
          <h6>{surname}</h6>
          <p className="designation my-2">{role}</p>
          <a href="#" onClick={deleteAthlete}>
            <BsFillTrashFill color="red" size={20} />
          </a>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AthleteCard;
