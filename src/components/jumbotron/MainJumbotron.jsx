import React from "react";
import "./mainJumbotronStyle.css";
import jumboImage from "../../assets/jumboImage.jpg";

const MainJumbotron = () => {
  return (
    <div className="container-fluid">
      <div className=" row jumbotron d-flex justify-content-between">
        <div className="col-lg-8 jumbotron-text">
          <h1 className="text-center">Gestisci una squadra di pallavolo?</h1>
          <span className="pb-5">Ti aiutiamo noi</span>
          <button type="button" className="btn btn-warning">
            Scopri come
          </button>
        </div>
        <div className="col-sm-12 col-lg-4 d-flex justify-content-end">
          <img
            width={400}
            src={jumboImage}
            alt="jumbotron image"
          />
        </div>
      </div>
    </div>
  );
};

export default MainJumbotron;
