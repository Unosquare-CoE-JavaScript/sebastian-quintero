import { atomWithReset } from "jotai/utils";
import { sumTotals } from "../utilities/sum-totals";
import { atom } from "jotai";

const TOPPING_PRICE = 1.5;

const toppingsAtom = atomWithReset<Record<string, number>>({});

export const toppingsUpdateAtom = atom(
  null,
  (get, set, name: string, count: number) =>
    set(toppingsAtom, { ...get(toppingsAtom), [name]: count })
);

export const toppingsTotalAtom = atom((get) =>
  sumTotals(TOPPING_PRICE, get(toppingsAtom))
);
