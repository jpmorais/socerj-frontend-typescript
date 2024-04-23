import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const useAbortIfNotAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const decoded = jwtDecode(token!) as any;
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime || decoded.isAdmin == false) {
      navigate("/login");
    }
  }, []);
};
