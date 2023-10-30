import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MyNav from "./components/navbar/MyNav";
import AthletePrivatePage from "./pages/AthletePrivatePage";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/athleteprivatepage"
              element={<AthletePrivatePage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
