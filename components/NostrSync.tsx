import {memo, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useRealm} from "@realm/react";
import {removeOneEvent, updateOneEvent} from "../reducers/events/eventsSlice";

const NostrSync = () => {
  const ws = useRef(null);
  const { ids, entities } = useSelector((state: RootState) => state.events);
  const [connected, setConnected] = useState("idle");
  const [roundState, setRoundState] = useState("idle");
  const [cleanState, setCleanState] = useState("idle");
  const realm = useRealm();
  const dispatch = useDispatch();

  const connectWebSocket = () => {
    ws.current = new WebSocket("wss://relay.abandon.ai");

    ws.current.onopen = () => {
      setConnected("success");
      console.log("Connected to the server");
    };

    ws.current.onclose = (e) => {
      setConnected("idle");
      console.log("Disconnected. Check internet or server.");
      setTimeout(() => {
        ws.current = new WebSocket("wss://relay.abandon.ai");
      }, 5_000);
    };

    ws.current.onerror = (e) => {
      setConnected("error");
      console.log("Error connect. Check internet or server.")
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data)
      if (data?.[0] === "OK" && data?.[2] === true) {
        const id = data?.[1];
        if (id) {
          dispatch(
            updateOneEvent({
              id: id,
              changes: {
                status: 1,
              }
            })
          );
        }
      }
    };
  };

  const send = (message: string) => {
    if (ws.current) {
      console.log("Send", message)
      ws.current.send(message);
    }
  }

  useEffect(() => {
    connectWebSocket();
    return () =>  ws.current?.close();
  }, []);

  useEffect(() => {
    const clean = () => {
      setCleanState("loading");
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const status = entities?.[id]?.status;
        if (status === 1) {
          dispatch(removeOneEvent(id));
        }
      }
      setCleanState("idle")
    }
    const interval = setInterval(() => {
      if (roundState === "idle") {
        console.log("Start Clean works", ids.length);
        clean();
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const roundSync = () => {
      setRoundState("loading");
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const status = entities?.[id]?.status;
        if (status === 0) {
          const event = realm.objectForPrimaryKey("Event", id)
          send(JSON.stringify([
            "EVENT", event
          ]));
        }
      }
      setRoundState("idle");
    }
    if (connected === "success" && cleanState === "idle") {
      console.log("Start Send Messages works", ids.length);
      roundSync();
    }
  }, [ids.length, connected]);

  return null;
};

export default memo(NostrSync);
