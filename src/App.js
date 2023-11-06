import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MyNav from "./components/navbar/MyNav";
import AthletePrivatePage from "./pages/AthletePrivatePage";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import TeamPrivatePage from "./pages/TeamPrivatePage";
import MyFooter from "./components/footer/MyFooter";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/loginAthlete"
              element={<AthletePrivatePage />}
            />
             <Route
              path="/loginTeam"
              element={<TeamPrivatePage />}
            />
          </Route>
        </Routes>
        <MyFooter/>
      </BrowserRouter>
    </>
  );
}

export default App;
