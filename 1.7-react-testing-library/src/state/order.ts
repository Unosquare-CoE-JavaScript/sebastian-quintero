import { atom } from "jotai";
import { scoopsTotalAtom } from "./scoops";
import { toppingsTotalAtom } from "./toppings";

export const orderTotalAtom = atom(
  (get) => get(scoopsTotalAtom) + get(toppingsTotalAtom)
);
