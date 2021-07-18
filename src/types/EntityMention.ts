export type EntityMention = {
  entity: string;
  type: string;
  category?: string;
  startIndex: number;
  tokenCount: number;
  salience?: number;
};
