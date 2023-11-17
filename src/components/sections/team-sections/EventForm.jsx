import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import useSession from "../../../custom-hooks/session";
import { TailSpin } from "react-loader-spinner";

const EventForm = () => {
  const session = useSession();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const str = localStorage.getItem("loggedInUser");
  const token = str.substring(1, str.length - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      team: session.id,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/events/create`,
        {
          headers: {
            'Authorization': `${token}`,
            'Content-Type':'application/json'
          },
          method: "POST",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
    }
  };
  return (
    <Container fluid className="mb-4">
      <h1 className="py-3">Create Event</h1>
      {loading && (
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
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter event title"
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Content"
                name="content"
                style={{ height: "100px" }}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button onClick={handleSubmit} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EventForm;
