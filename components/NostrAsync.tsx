import {memo, useEffect, useRef} from "react";
import {useRealm} from "@realm/react";

const NostrAsync = () => {
  const realm = useRealm();
  const ws = useRef(new WebSocket('wss://relay.abandon.ai')).current;

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to the server")
    };
    ws.onclose = (e) => {
      console.log('Disconnected. Check internet or server.')
    };
    ws.onerror = (e) => {
      console.log(e)
    }
    ws.onmessage = (e) => {
      console.log(e)
    };
  }, []);

  return null;
}

export default memo(NostrAsync);