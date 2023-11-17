import React from "react";
import InfoCard from "../cards/InfoCard";
import { FaVolleyball } from "react-icons/fa6";
import { FaBootstrap } from "react-icons/fa";
import { FaGlobeEurope } from "react-icons/fa";


const InfoSection = () => {
  return (
    <div className="container">
      <div className="row">
        <InfoCard 
        icon={<FaVolleyball size={80}/>} 
        title='Easy-to-use web app'
        desc='Do every task intuitively'/>
        <InfoCard 
        icon={<FaBootstrap  size={80}/>} 
        title='Responsive design'
        desc='Use this app on every device'/>
        <InfoCard 
        icon={<FaGlobeEurope size={80}/>} 
        title='Completely free!'
        desc='This is an open source project!'/>
       
      </div>
    </div>
  );
};

export default InfoSection;
