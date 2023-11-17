import React, { useEffect, useState } from "react";
import AthleteCard from "../team-sections/AthleteCard";
import { TailSpin } from "react-loader-spinner";

const PersonalSection = ({ athleteData }) => {
  const [team, setTeam] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTeamData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/teams/byId/${
          athleteData.team ? athleteData.team : athleteData.requestedTeam
        }`
      );
      const data = await response.json();
      setTeam(data.team);
      setLoading(false);
      console.log(team);
      return await data;
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getTeamData();
  }, []);
  return (
    <>
      {error && <h1>Errore</h1>}
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
      {!error && !loading && team &&
        <div className="card shadow-sm border-0 rounded">
          <div className="card-body p-0">
            <img
              src={athleteData.cover}
              alt=""
              className="w-100 card-img-top"
            />
            <div className="p-4">
              <h5 className="mb-0">{athleteData.name}</h5>
              <h5 className="mb-3">{athleteData.surname}</h5>
              {athleteData.team && <p className="small text-muted">{team.name}</p>}
              {athleteData && athleteData.requestedTeam && (
                <p className="small text-muted">
                  Your request to {team.name} has not been
                  accepted yet
                </p>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default PersonalSection;
