import Realm from "realm";

export class Event extends Realm.Object<Event> {
  id!: string;
  pubkey!: string;
  created_at!: number;
  kind!: number;
  tags: Realm.Mixed[];
  content!: string;
  sig!: string;

  static primaryKey = "id";
  static schema = {
    name: "Event",
    primaryKey: "id",
    properties: {
      id: {
        type: "string",
        indexed: true,
      },
      pubkey: {
        type: "string",
        indexed: true,
      },
      created_at: {
        type: "int",
        indexed: true,
      },
      kind: {
        type: "int",
        indexed: true,
      },
      tags: "mixed[]",
      content: {
        type: "string",
        indexed: "full-text",
      },
      sig: "string",
    },
  };
}
