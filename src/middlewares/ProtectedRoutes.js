import { useNavigate, Outlet } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import { useEffect } from "react";

const isAuth = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};

const ProtectedRoutes = () => {
  const auth = isAuth();
  return auth ? <Outlet /> : <LandingPage />; //outlet è qualsiasi figlio di una protected route
};

export default ProtectedRoutes;
