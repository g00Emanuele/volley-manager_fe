import React, { useEffect, useState } from "react";
import AthleteCard from "./AthleteCard";
import useSession from "../../../custom-hooks/session";
import ResponsivePagination from "react-responsive-pagination";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import "react-responsive-pagination/themes/classic.css";
import { nanoid } from "nanoid";

const RequestsSection = () => {
  const [athletesData, setAthletesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const session = useSession();
  const str = localStorage.getItem("loggedInUser");
  const token = str.substring(1, str.length - 1);

  const { id } = session;

  const getAthletesData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/athletes/byTeamRequest?requestedTeam=${id}&page=${currentPage}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();
      setAthletesData(data.athletesByTeamRequest);
      setData(data);
      setLoading(false);
    } catch (error) {
      if (error) setError(error);
    }
  };

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getAthletesData();
    console.log(athletesData)
  }, [currentPage]);

  return (
    <>
      <Container className="bg-light h-100">
        <Row>
          <h1 className="my-3">Requests</h1>
          {error && <h1>Loading error</h1>}
          {!error && loading && <h1>Loading...</h1>}
          {!error && !loading && athletesData.length < 1 && <h3>No join requests at the moment</h3>}
          {!error &&
            !loading &&
            athletesData &&
            athletesData.map((athlete) => {
              return (
                <AthleteCard
                  key={nanoid()}
                  cover={athlete.cover}
                  role={athlete.role}
                  name={athlete.name}
                  surname={athlete.surname}
                  cardWidth={6}
                  id={athlete._id}
                  token={token}
                />
              );
            })}
        </Row>
        <Row>
          {athletesData.length > 8 && (
            <Col className="m-3">
              <ResponsivePagination
                current={currentPage}
                total={athletesData && data.totalPages}
                onPageChange={handlePagination}
              />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default RequestsSection;
