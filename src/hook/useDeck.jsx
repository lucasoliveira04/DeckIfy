import { useContext } from "react";
import { DeckContext } from "../context/DeckProvider";

export const UseDeck = () => {
  return useContext(DeckContext);
};
