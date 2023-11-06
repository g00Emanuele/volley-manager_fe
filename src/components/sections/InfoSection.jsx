import React from "react";
import InfoCard from "../cards/InfoCard";
import { FaVolleyball } from "react-icons/fa6";


const InfoSection = () => {
  return (
    <div className="container">
      <div className="row">
        <InfoCard 
        icon={<FaVolleyball size={80}/>} 
        title='Easy-to-use web app'
        desc='Do every task intuitively'/>
        <InfoCard 
        icon={<FaVolleyball size={80}/>} 
        title='Easy-to-use web app'
        desc='Do every task intuitively'/>
        <InfoCard 
        icon={<FaVolleyball size={80}/>} 
        title='Easy-to-use web app'
        desc='Do every task intuitively'/>
       
      </div>
    </div>
  );
};

export default InfoSection;
