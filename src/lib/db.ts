import Dexie, {type EntityTable} from 'dexie';

export interface Task {
  id: string,
  title: string,
  status: 'todo' | 'in-progress' | 'done';
}

const db = new Dexie('RyuKanbanDB') as Dexie & {
    tasks: EntityTable<Task>;
};


db.version(1).stores({
    tasks: '++id, title, status'
});

export { db };
