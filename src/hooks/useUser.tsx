import React, { useCallback, useState } from "react";
import { IPlayerContext } from "../context/PlayerContext";
import { Player } from "../types";

export const usePlayer = (): IPlayerContext => {
  const [player, setPlayer] = useState<Player | undefined>();

  const setCurrentPlayer = useCallback((currentPlayer: Player): void => {
    setPlayer(currentPlayer);
  }, []);

  return {
    player,
    setCurrentPlayer
  };
};
