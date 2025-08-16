import { Task } from "../types/task";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white p-2 rounded shadows text-sm">{task.title}</div>
  );
}
