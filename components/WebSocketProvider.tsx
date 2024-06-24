import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRealm } from "@realm/react";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../reducers/account/accountSlice";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const ws = useRef(null);
  const realm = useRealm();
  const [connected, setConnected] = useState(false);
  const [queue, setQueue] = useState([]);
  const pubkey = useSelector(selectPublicKey);

  const url = `wss://${pubkey}:default@relay.abandon.ai`;

  const handleReconnection = () => {
    setTimeout(() => {
      connectWebSocket();
    }, 5000);
  };

  const connectWebSocket = () => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setConnected(true);
    };

    ws.current.onclose = (e) => {
      setConnected(false);
      console.log("WebSocket closed, attempting to reconnect...");
      handleReconnection();
    };

    ws.current.onerror = (e) => {
      setConnected(false);
      console.log(`WebSocket error: ${e.message}, attempting to reconnect...`);
      handleReconnection();
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data?.[0] === "EVENT") {
        const _e = data[2];
        try {
          realm.write(() => {
            realm.create("Event", _e, true);
          });
        } catch (e) {
          console.log(e);
        }
      }
    };
  };

  const send = (message: string) => {
    if (ws.current && connected) {
      try {
        ws.current.send(message);
      } catch (e) {
        setQueue([...queue, message]);
      }
    } else {
      setQueue([...queue, message]);
    }
  };

  useEffect(() => {
    if (queue.length > 0 && connected) {
      const e = queue[0];
      try {
        ws.current.send(e);
        setQueue((prevQueue) => prevQueue.slice(1)); // Remove the sent message
      } catch (e) {
        console.log(e);
      }
    }
  }, [queue, connected]);

  useEffect(() => {
    if (pubkey) {
      connectWebSocket();
    }
    return () => ws.current?.close();
  }, [pubkey]);

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
