import { useState } from "react";
import React from "react";
import Card from "react-bootstrap/Card";
import { BsFillTrashFill } from "react-icons/bs";
import ControlModal from "../../control/ControlModal";
import useSession from "../../../custom-hooks/session";

const EventCard = ({ title, content, team, eventId }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const str = localStorage.getItem("loggedInUser");
  const token = str.substring(1, str.length - 1);
  const session = useSession();

  const deleteEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/events/delete/${eventId}`,
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
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="my-3">
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>

          <Card.Text>{content}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">{team}</Card.Subtitle>
          {!session.team && (
              <ControlModal
                handleFunction={deleteEvent}
                icon={<BsFillTrashFill color="red" size={30} />}
              />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventCard;
