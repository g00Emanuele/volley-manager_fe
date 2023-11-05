import React from "react";
import useSession from "../custom-hooks/session";
import AthletesSection from "../components/sections/team-sections/AthletesSection";

const TeamPrivatePage = () => {
  const session = useSession();
  console.log(session);


  return <AthletesSection />;
};

export default TeamPrivatePage;
