import { User } from "./user";

export class Player {
  key?: string | null;
  uid: User | null;
  email: string;
  name: string;
  age: number;
}
