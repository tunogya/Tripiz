import { useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { useQuery, useRealm } from "@realm/react";
import { Event } from "../app/Event";
import { uuid } from "expo-modules-core";

const useMetadata = (pubkey: string) => {
  const [name, setName] = useState(undefined);
  const [picture, setPicture] = useState(undefined);
  const [about, setAbout] = useState(undefined);
  const { send } = useWebSocket();
  const realm = useRealm();

  const events = useQuery(Event, (events) => {
    return events
      .filtered("kind == $0 && pubkey == $1", 0, pubkey)
      .sorted("created_at", true);
  });

  useEffect(() => {
    if (events.length > 0) {
      try {
        const info = JSON.parse(events[0]?.content);
        setName(info?.name);
        setPicture(info?.picture);
        setAbout(info?.about);
      } catch (e) {
        console.log(e);
      }
    }
    if (events.length > 1) {
      const old_events = events.slice(1);
      old_events.forEach((item) => {
        realm.write(() => {
          realm.delete(item);
        });
      });
    }
    if (events.length === 0) {
      console.log("404")
    }
  }, [events, pubkey]);

  useEffect(() => {
    send(
      JSON.stringify([
        "REQ",
        uuid.v4(),
        {
          authors: [pubkey],
          kinds: [0],
          limit: 1,
        },
      ]),
    );
  }, [pubkey]);

  return {
    picture,
    name,
    about,
  };
};

export default useMetadata;
