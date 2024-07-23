import type { Branch } from "./branch";

export interface Store {
  id: number;
  branch: Branch;
  name: string;
}
