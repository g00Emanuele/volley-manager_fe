import React from "react";
import useSession from "../custom-hooks/session";
import AthletesSection from "../components/sections/team-sections/AthletesSection";
import RequestsSection from "../components/sections/team-sections/RequestsSection";
import { Row, Col, Container } from "react-bootstrap";
import "../colors/gradient.css"

const TeamPrivatePage = () => {
  const session = useSession();
  console.log(session);

  return (
    <Container fluid className="aqua">
      <Row>
        <Col className="col-sm-12 col-md-8">
          <AthletesSection />
        </Col>
        <Col className="col-sm-12 col-md-4">
          <RequestsSection />
        </Col>
      </Row>
    </Container>
  );
};

export default TeamPrivatePage;
