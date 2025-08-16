import { Task } from "../types/task";
import TaskCard from "./TaskCard";

interface props {
  title: string;
  tasks: Task[];
}

export default function Column({ title, tasks }: props) {
  return (
    <div className="ring-offset-gray-95000 p-4 rounded-lg min-w-[250px]">
      <h2 className="font-bold mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
