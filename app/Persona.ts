import Realm from "realm";

export class Persona extends Realm.Object<Persona> {
  privateKey!: string;
  created_at!: number;

  static primaryKey = "privateKey";
  static schema = {
    name: "Persona",
    primaryKey: "privateKey",
    properties: {
      privateKey: {
        type: "string",
        indexed: true,
      },
      created_at: {
        type: "int",
        indexed: true,
      },
    },
  };
}
