import React from "react";
import InfoCard from "../cards/InfoCard";
import { FaVolleyball } from "react-icons/fa6";


const InfoSection = () => {
  return (
    <div className="container">
      <div className="row">
        <InfoCard 
        icon={<FaVolleyball size={80}/>} 
        title='Web app facile da usare'
        desc='Il nostro sito ha comandi semplici intuitivi'/>
        <InfoCard />
        <InfoCard />
      </div>
    </div>
  );
};

export default InfoSection;
