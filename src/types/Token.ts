import { PosTag } from "./PosTag";

export type Token = {
  index: number;
  word: string;
  lemma?: string;
  pos: PosTag;
  parentIndex?: number;
};
