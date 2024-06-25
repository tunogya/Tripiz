import { useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { useQuery, useRealm } from "@realm/react";
import { Event } from "../app/Event";
import { uuid } from "expo-modules-core";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../reducers/account/accountSlice";

const useUserInfo = (pubkey: string) => {
  const myPublicKey = useSelector(selectPublicKey);
  const [name, setName] = useState("Anonymous");
  const [picture, setPicture] = useState(undefined);
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
        if (pubkey === myPublicKey) {
          setName("Me");
        } else {
          setName(info?.name);
        }
        setPicture(info?.picture);
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
  }, [events]);

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
  }, []);

  return {
    picture,
    name,
  };
};

export default useUserInfo;
