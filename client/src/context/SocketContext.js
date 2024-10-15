import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  function reconnectSocket() {
    if (socket) socket.close();

    const newSocket = io(process.env.REACT_APP_SERVER_URL, {
      auth: { token: localStorage.getItem("token") },
    });

    setSocket(newSocket);

    newSocket.on("setPlayerToken", (data) => {
      localStorage.setItem("playerToken", data.playerToken);
      window.location.reload();
    });
  }

  useEffect(() => {
    reconnectSocket();
    return () => socket?.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, reconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
