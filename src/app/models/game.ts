import { Player } from "./player";

export class Game {
  key?: string | null;
  player_key?: string | null;
  player: Player;
  date: string;
  score: number;
}
