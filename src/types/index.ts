export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type FilterType = "all" | "active" | "completed";

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  allCompleted: boolean;
  hasCompleted: boolean;
}
