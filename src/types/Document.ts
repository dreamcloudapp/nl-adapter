import { Token } from "./Token";
import { Sentence } from "./Sentence";
import { EntityMention } from "./EntityMention";

export type Document = {
  tokens: [Token];
  sentences: [Sentence];
  entities: [EntityMention];
};
