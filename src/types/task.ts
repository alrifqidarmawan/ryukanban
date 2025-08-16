export type status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string,
  title: string,
  status: Status;
}


