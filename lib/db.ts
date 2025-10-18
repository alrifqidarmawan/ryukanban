// import Dexie, {add, type EntityTable} from 'dexie';
// import { Task } from '@/types/task';

// const db = new Dexie('RyuKanbanDB') as Dexie & {
//     tasks: EntityTable<Task, 'id'>;
// };

// db.version(1).stores({
//     tasks: '++id, title, status, createdAt'
// });

// export const addTask = (task: Omit<Task, 'id'>) => {
//     return db.tasks.add({
//         ...task, createdAt: new Date()
//     });
// };
