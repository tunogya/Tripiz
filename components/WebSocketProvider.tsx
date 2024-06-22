import { createContext, useContext, useEffect, useRef } from "react";
import { useRealm } from "@realm/react";
import { Event } from "../app/Event";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const ws = useRef(null);
  const realm = useRealm();

  const connectWebSocket = () => {
    ws.current = new WebSocket("wss://relay.abandon.ai");

    ws.current.onopen = () => {
      console.log("Connected to the server");
    };

    ws.current.onclose = (e) => {
      console.log("Disconnected. Check internet or server.");
      setTimeout(() => {
        ws.current = new WebSocket("wss://relay.abandon.ai");
      }, 5_000);
    };

    ws.current.onerror = (e) => {
      console.log("Error connect. Check internet or server.");
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data?.[0] === "EVENT") {
        const _e = data[2];
        try {
          realm.write(() => {
            return new Event(realm, _e);
          });
        } catch (e) {
          console.log(e);
        }
      }
    };
  };

  const send = (message: string) => {
    if (ws.current) {
      ws.current.send(message);
    }
  };

  useEffect(() => {
    connectWebSocket();
    return () => ws.current?.close();
  }, []);

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
