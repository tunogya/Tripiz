import React, { createContext, useContext, useEffect, useRef } from "react";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const ws = useRef(new WebSocket("wss://relay.abandon.ai")).current;

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to the server");
    };
    ws.onclose = (e) => {
      console.log("Disconnected. Check internet or server.");
    };
    ws.onerror = (e) => {
      console.log(e);
    };
    ws.onmessage = (e) => {
      console.log(e.data);
    };
  }, []);

  const send = (message: string) => {
    console.log("send", message);
    ws.send(message);
  };

  return (
    <WebSocketContext.Provider value={{ send }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export { WebSocketProvider, useWebSocket };
