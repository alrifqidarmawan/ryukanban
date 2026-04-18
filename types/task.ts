export type Priority = "Low" | "Medium" | "High";

export interface TaskCard {
  id: string;
  list_id: string;
  title: string;
  position: number;
  description: string;
  priority: Priority;
  due_date: string | null;
  created_at?: string;
}

export interface TaskList {
  id: string;
  title: string;
  position: number;
  cards: TaskCard[];
}

export interface Board {
  id?: string;
  title: string;
  lists: TaskList[];
}
