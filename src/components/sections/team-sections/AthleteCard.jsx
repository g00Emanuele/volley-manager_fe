import React, { useState } from "react";
import "./AthleteCardStyle.css";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Col } from "react-bootstrap";
import useSession from "../../../custom-hooks/session";
import ControlModal from "../../control/ControlModal";
import { TailSpin } from "react-loader-spinner";

const AthleteCard = ({
  cover,
  name,
  role,
  surname,
  athleteId,
  token,
  request,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const { id } = session;

  const deleteAthlete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/athletes/delete/${athleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      if (error) setError(error);
    }
  };

  const submitAthlete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/athletes/update/${athleteId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            team: id,
            requestedTeam: null,
          }),
        }
      );
      const data = await response.json();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      if (error) setError(error);
    }
  };

  return (
    <>
      {!error && loading && (
        <TailSpin
          height="80"
          width="80"
          color="rgba(2, 83, 185, 1)"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {!loading && (
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
            <a href="">
              <ControlModal
                handleFunction={deleteAthlete}
                icon={<BsFillTrashFill color="red" size={30} />}
              />
            </a>
            {request && (
              <a href="#">
                <ControlModal
                  handleFunction={submitAthlete}
                  icon={<AiOutlineCheckCircle color="green" size={30} />}
                />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AthleteCard;
