import React from "react";
import "./mainJumbotronStyle.css";
import jumboImage from "../../assets/jumboImage.jpg";

const MainJumbotron = () => {
  return (
    <div className="container-fluid">
      <div className=" row jumbotron d-flex justify-content-between">
        <div className="col-lg-8 jumbotron-text">
          <h1 className="text-center">Manage your volleyball team the smart way!</h1>
          
        </div>
        <div className="col-sm-12 col-lg-4 d-flex justify-content-end px-0">
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
