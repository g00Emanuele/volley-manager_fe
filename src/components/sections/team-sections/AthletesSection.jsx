import React, { useEffect, useState } from "react";
import AthleteCard from "./AthleteCard";
import useSession from "../../../custom-hooks/session";
import ResponsivePagination from "react-responsive-pagination";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import "react-responsive-pagination/themes/classic.css";
import { nanoid } from "nanoid";
import { TailSpin } from "react-loader-spinner";

const AthletesSection = ({}) => {
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
        `${process.env.REACT_APP_BASE_URL}/athletes/byTeam?team=${id}&page=${currentPage}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();
      setAthletesData(data.athletesByTeam);
      setData(data);
      setLoading(false);
    } catch (err) {
      if (err) setError(err);
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
      <Container fluid>
        <Row>
          <h1 className="py-3">Athletes</h1>
          {error && <h1>Loading error</h1>}
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
          {!error &&
            !loading &&
            athletesData &&
            athletesData.map((athlete) => {
              return (
                <Col key={nanoid()} sm={12} md={6} lg={4} xl={3}>
                  <AthleteCard
                    cover={athlete.cover}
                    role={athlete.role}
                    name={athlete.name}
                    surname={athlete.surname}
                    athleteId={athlete._id}
                    token={token}
                  />
                </Col>
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
