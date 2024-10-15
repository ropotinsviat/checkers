import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import api from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const checkLoginState = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/logged_in`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { newToken, user } = res.data;
      localStorage.setItem("token", newToken);

      setUser(user);

      if (
        localStorage.getItem("playerToken") &&
        window.location.href != `${window.location.origin}/game`
      )
        window.location.assign(`${window.location.origin}/game`);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const initializeSocket = async () => {
      await checkLoginState();
    };

    initializeSocket();
  }, [checkLoginState]);

  async function login() {
    try {
      const {
        data: { url },
      } = await api.get(`${process.env.REACT_APP_SERVER_URL}/auth/url`);
      window.location.assign(url);
    } catch {}
  }

  function logout() {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      window.location.href = window.location.origin;
    }
  }

  return (
    <AuthContext.Provider value={{ checkLoginState, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
