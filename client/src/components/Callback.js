import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Callback() {
  const called = useRef(false);
  const { user } = useAuth();
  useEffect(() => {
    (async () => {
      if (!user)
        try {
          if (called.current) return;
          called.current = true;
          const res = await api.get(
            `${process.env.REACT_APP_SERVER_URL}/auth/token${window.location.search}`
          );
          localStorage.setItem("token", res.data.token);
        } catch (err) {
          console.error(err);
        }
      window.location.assign(window.location.origin);
    })();
  }, []);
  return <></>;
}
