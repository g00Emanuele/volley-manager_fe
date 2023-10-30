import { jwtDecode } from "jwt-decode";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const isAuth = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};

const useSession = () => {
  const session = isAuth();
  const decodedSession = session ? jwtDecode(session) : null;

  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/", { replace: true });
    }
  }, [navigate, session]);

  return decodedSession;
};

export default useSession;
