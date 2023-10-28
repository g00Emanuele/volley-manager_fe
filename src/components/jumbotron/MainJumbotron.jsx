import React from "react";
import "./mainJumbotronStyle.css";
import jumboImage from "../../assets/jumboImage.jpg";
import { Button } from "react-bootstrap";

const MainJumbotron = () => {
  return (
    <div className="jumbotron d-flex justify-content-between">
      <div className="jumbotron-text">
        <h1>Gestisci una squadra di pallavolo?</h1>
        <span className="pb-5">Ti aiutiamo noi</span>
        <button type="button" className="btn btn-warning">Scopri come</button>
      </div>

      <img width={400} src={jumboImage} alt="" />
    </div>
  );
};

export default MainJumbotron;
