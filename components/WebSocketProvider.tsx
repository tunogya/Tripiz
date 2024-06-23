import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRealm } from "@realm/react";
import { Event } from "../app/Event";
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

  const connectWebSocket = () => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setConnected(true);
    };

    ws.current.onclose = (e) => {
      setConnected(false);
      setTimeout(() => {
        ws.current = new WebSocket(url);
      }, 5_000);
    };

    ws.current.onerror = (e) => {
      setConnected(false);
      console.log(e.message);
      setTimeout(() => {
        ws.current = new WebSocket(url);
      }, 5_000);
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
        setTimeout(() => {
          ws.current.send(e);
          queue.shift();
        }, 250);
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
