import { TaskCard, TaskList } from "@/types/task";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("RyukanbanDB") as Dexie & {
    lists: EntityTable<TaskList, "id">;
    cards: EntityTable<TaskCard, "id">;
};

db.version(1).stores({
    lists: "id, position",
    cards: "id, listId, position",
});

export { db };
