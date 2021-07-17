export type EntityMention = {
  type: string;
  category?: string;
  startIndex: number;
  tokenCount: number;
  salience?: number;
};
