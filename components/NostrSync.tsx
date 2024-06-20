import {memo, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useRealm} from "@realm/react";
import {removeOneEvent, updateOneEvent} from "../reducers/events/eventsSlice";

const NostrSync = () => {
  const ws = useRef(new WebSocket("wss://relay.abandon.ai")).current;
  const { ids, entities } = useSelector((state: RootState) => state.events);
  const [connected, setConnected] = useState("idle");
  const [roundState, setRoundState] = useState("idle");
  const [cleanState, setCleanState] = useState("idle");
  const realm = useRealm();
  const dispatch = useDispatch();

  useEffect(() => {
    ws.onopen = () => {
      setConnected("success");
      console.log("Connected to the server");
    };
    ws.onclose = (e) => {
      setConnected("idle");
      console.log("Disconnected. Check internet or server.");
    };
    ws.onerror = (e) => {
      setConnected("error");
      console.log(e);
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data?.[0] === "OK" && data?.[2] === true) {
        const id = data?.[1];
        if (id) {
          dispatch(updateOneEvent({
            id: id,
            changes: {
              status: 1,
            }
          }))
        }
      }
      console.log(data);
    };
    return () => ws.close();
  }, []);

  const send = (message: string) => {
    ws.send(message);
  };

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
    if (cleanState === "idle" && roundState === "idle") {
      clean();
    }
  }, [roundState, cleanState]);

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
    if (connected === "success" && roundState === "idle" && cleanState === "idle") {
      roundSync();
    }
  }, [ids.length, connected, roundState, cleanState]);

  return null;
};

export default memo(NostrSync);
