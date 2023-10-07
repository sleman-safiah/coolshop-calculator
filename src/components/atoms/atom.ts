import { atom } from "jotai";
import { IRow } from "../interfaces/row";
export const RowsAtom = atom<Array<IRow>>([]);
