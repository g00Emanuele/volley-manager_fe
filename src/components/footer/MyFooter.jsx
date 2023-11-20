import React from "react";
import "./MyFooterStyle.css"

const MyFooter = () => {
  return (
    <footer className=" py-3 text-center text-lg-start stellar text-muted">
    
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3 text-secondary"></i>Volley Manager
              </h6>
              <p>
                v2.0
              </p>
            </div>
    
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Tools 
              </h6>
              <p>
                React.js & Bootstrap
              </p>
              <p>
                Node.js & Express.js
              </p>
              <p>
                MongoDB & Mongoose
              </p>
              
            </div>
    
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                My Github page
              </h6>
              <p>
                <a href="https://github.com/g00Emanuele" className="text-reset">g00Emanuele</a>
              </p>
              
            </div>
    
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>g00emanuele@gmail.com</p>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default MyFooter;
