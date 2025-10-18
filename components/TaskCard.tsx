import { Card } from "@/types/task";
import { useSortable } from "@dnd-kit/sortable";

export default function TaskCard({ card }: { card: Card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: card.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  if (isDragging) {
    style.opacity = 0;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-2 rounded shadows text-sm transform-transform select-none cursor-grab"
    >
      {card.title}
    </div>
  );
}
