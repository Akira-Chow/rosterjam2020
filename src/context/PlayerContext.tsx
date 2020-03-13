import React from "react";
import { createContext } from "react";
import { Player } from "../types";

export interface IPlayerContext {
  player?: Player;
  setCurrentPlayer: (currentPlayer: Player) => void;
}

export const PLAYER_DEFAULT_VALUE = {
  player: undefined,
  setCurrentPlayer: () => {}
};

export const PlayerContext = createContext<IPlayerContext>(PLAYER_DEFAULT_VALUE);
