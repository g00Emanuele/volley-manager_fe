import React from "react";
import Card from 'react-bootstrap/Card';

const EventCard = ({ title, content, team }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>

          <Card.Text>{content}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            {team}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
};

export default EventCard;
