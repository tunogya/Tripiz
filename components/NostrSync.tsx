import {memo, useEffect, useRef} from "react";

const NostrSync = ({ children }) => {
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

    return () => ws.close();
  }, []);

  const send = (message: string) => {
    console.log("send", message);
    ws.send(message);
  };

  return null;
};

export default memo(NostrSync);
