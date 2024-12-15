export interface Superhero {
  id:number,
  name: string;
  realName: string;
  origin: string;
  powers: string[];
  weaknesses: string[];
  city: string;
  team: string | null;
  firstAppearance: string;
  enemies: string[];
  image: string;
  actions?: string;
}

export type  ColumnsKeys<T> = Array<keyof T>;
