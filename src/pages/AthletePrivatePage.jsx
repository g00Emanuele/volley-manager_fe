import React from 'react'
import useSession from '../custom-hooks/session'
import PersonalSection from '../components/sections/athlete-sections/PersonalSection'
import EventSection from '../components/sections/athlete-sections/EventSection'
import { Row, Col, Container } from "react-bootstrap";

const AthletePrivatePage = () => {

  const session = useSession()
  console.log(session)
  
  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={5} xl={4} className="aqua">
          <PersonalSection athleteData={session} />
        </Col>
        <Col sm={12} md={7} xl={8} className="bg-light">
          <EventSection />
        </Col>
      </Row>
    </Container>
  )
}

export default AthletePrivatePage