export interface IRow {
  id: string;
  sign: SignType;
  value: number;
  disabled?: boolean;
}

export type SignType = "+" | "-";
