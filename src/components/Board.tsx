"use client"
import Column from "@/components/Column";
import { db } from "@/lib/db";
import { Task } from "@/types/task";
import { useLiveQuery } from "dexie-react-hooks";


export default function Board() {
  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

    const allTasks = useLiveQuery(() => db.tasks.toArray());

  return (
      <div className="p-4 text-2xl drop-shadow-2xl rounded-xl mx-5 mt-8 primary-bg">
        <div className="flex gap-x-40 align-middle overflow-x-auto">
          {/* <div className="bg-amber-300">
              <button>Add it here</button>
          </div> */}
          <div className="flex justify-center align-middle gap-4 bg-amber-800">
                {columns.map((column) => {
                    const tasksForColumn = allTasks?.filter(
                        (task) => task.status === column.id
                    );
                    return (
                        <Column
                            key={column.id}
                            title={column.title}
                            tasks={tasksForColumn || []}
                        />
                    );
                })}
        </div>
        </div>
    </div>
  );
}
