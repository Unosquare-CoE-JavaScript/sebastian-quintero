import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { sumTotals } from "../utilities/sum-totals";

const SCOOP_PRICE = 2;

const scoopsAtom = atomWithReset<Record<string, number>>({});

export const scoopsUpdateAtom = atom(
  null,
  (get, set, name: string, count: number) =>
    set(scoopsAtom, { ...get(scoopsAtom), [name]: count })
);

export const scoopsTotalAtom = atom((get) =>
  sumTotals(SCOOP_PRICE, get(scoopsAtom))
);
