import React from "react";
import useSession from "../custom-hooks/session";
import AthletesSection from "../components/sections/team-sections/AthletesSection";
import RequestsSection from "../components/sections/team-sections/RequestsSection";
import { Row, Col, Container } from "react-bootstrap";
import "../colors/gradient.css";
import EventForm from "../components/sections/team-sections/EventForm";
import EventSection from "../components/sections/athlete-sections/EventSection";

const TeamPrivatePage = () => {
  const session = useSession();
  console.log(session);

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={7} xl={8} className="aqua">
          <AthletesSection />
        </Col>
        <Col sm={12} md={5} xl={4} className="bg-light">
          <RequestsSection />
        </Col>
      </Row>
      <Row>
        <Col >
          <EventSection />
        </Col>
      </Row>
      <Row>
        <Col>
          <EventForm />
        </Col>
      </Row>
    </Container>
  );
};

export default TeamPrivatePage;
