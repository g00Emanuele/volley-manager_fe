import React, { useEffect, useState } from "react";
import AthleteCard from "./AthleteCard";
import useSession from "../../../custom-hooks/session";
import ResponsivePagination from "react-responsive-pagination";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import "react-responsive-pagination/themes/classic.css";
import { nanoid } from "nanoid";

const AthletesSection = () => {
  const [athletesData, setAthletesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData]=useState([])
  const session = useSession();
  const str = localStorage.getItem("loggedInUser");
  const token = str.substring(1, str.length - 1);

  const { id } = session;

  const getAthletesData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/athletes/byTeam?team=${id}&page=${currentPage}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();
      setAthletesData(data.athletesByTeam);
      setData(data)
      console.log(data);
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
  }, [currentPage]);

  return (
    <>
    <Container>
      <Row>
          {error && <h1>C'è stato un errore nel caricamento</h1>}
          {!error && loading && <h1>Caricamento dei dati ...</h1>}
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
                />
              );
            })}
      </Row>
      <Row>
        <Col className="m-3">
          <ResponsivePagination
            current={currentPage}
            total={athletesData && data.totalPages}
            onPageChange={handlePagination}
          />
        </Col>
      </Row>
    </Container>
    </>
    
  );
};

export default AthletesSection;
