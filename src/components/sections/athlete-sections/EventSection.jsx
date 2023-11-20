import React, { useEffect, useState } from "react";
import useSession from "../../../custom-hooks/session";
import EventCard from "./EventCard";
import { TailSpin } from "react-loader-spinner";
import ResponsivePagination from "react-responsive-pagination";
import { Row, Col, Container } from "react-bootstrap";
import { nanoid } from "nanoid";
import "react-responsive-pagination/themes/classic.css";


const EventSection = () => {
  const session = useSession();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState({});
  const [eventsData, setEventsData] = useState({});
  const { team } = session;
  const str = localStorage.getItem("loggedInUser");
  const token = str.substring(1, str.length - 1);

  const getEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/events/byTeam?team=${team ? team: session.id}&page=${currentPage}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data.eventsByTeam);
      setEvents(data.eventsByTeam);
      setEventsData(data);
      setLoading(false);
    } catch (err) {
      if (err) setError(err);
    }
  };

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getEvents()
  }, [currentPage]);

  return (
    <Container fluid className="mb-4">
    <h1 className="py-3">Events</h1>

    {events.length < 1 && <h3>No scheduled events</h3>}
      {error && <h1>Error</h1>}
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
        events &&
        events.map((event) => {
          return (
            <EventCard
            key={nanoid()}
              title={event.title}
              content={event.content}
              team={event.team.name}
              eventId={event._id}
            />
          );
        })}
      {!error && !loading && events && (
        <Row>
          <Col className="m-3">
            <ResponsivePagination
              current={currentPage}
              total={eventsData && eventsData.totalPages}
              onPageChange={handlePagination}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default EventSection;
