import { TaskCard as TaskCardType } from "@/types/task";
import TaskCard from "./TaskCard";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import React from "react";
import { Button } from "@headlessui/react";
import { useBoard } from "@/context/BoardContext";
import { MdDelete } from "react-icons/md";

interface ColumnProps {
  id: string;
  title: string;
  cards: TaskCardType[];
}

export default function Column({ id, title, cards }: ColumnProps) {
  const { addCard, updateListTitle, deleteList } = useBoard();

  const [isAddingCard, setIsAddingCard] = React.useState(false);
  const [newCardTitle, setNewCardTitle] = React.useState("");
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(title);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: {
        type: "Column",
        column: { id, title },
      },
    });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const handleSaveCard = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Saving card:", newCardTitle);
    addCard(id, newCardTitle);
    setNewCardTitle("");
    setIsAddingCard(false);
  };

  const columnColors = {
    "To Do": "bg-todo",
    "In Progress": "bg-inprogress",
    Done: "bg-done",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-transparent p-4 rounded-lg w-80 flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className={`${columnColors[title as keyof typeof columnColors]} p-2 rounded-md border-2 border-black shadow-neo mb-4 flex justify-between`}
      >
        {isEditingTitle ? (
          <input
            autoFocus
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={() => {
              updateListTitle(id, editedTitle);
              setIsEditingTitle(false);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateListTitle(id, editedTitle);
                setIsEditingTitle(false);
              }
            }}
            className="bg-white border-2 border-black rounded px-1 text-black w-full"
          />
        ) : (
          <h2
            className="font-bold text-black uppercase tracking-wide flex-1"
            onClick={() => setIsEditingTitle(true)}
          >
            {title}
          </h2>
        )}
        <Button
          className="rounded-sm px-1 bg-red-500 text-white align-middle text-center cursor-pointer"
          onClick={() => deleteList(id)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <MdDelete />
        </Button>
      </div>
      <div className="space-y-4">
        <SortableContext items={cards.map((card) => card.id)}>
          {cards.map((card) => (
            <TaskCard key={card.id} card={card} />
          ))}
        </SortableContext>
        <footer>
          {isAddingCard && (
            <form
              className="flex-col items-center space-x-2 bg-background"
              onSubmit={handleSaveCard}
            >
              <input
                type="text"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                className="w-full text-sm border-2 border-black rounded-md px-2 py-1 shadow-neo"
              />
              <div className="flex gap-2 mt-2">
                <Button
                  className="text-sm border-2 border-black rounded-md px-2 py-1 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 ease-out"
                  onClick={() => setIsAddingCard(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="text-sm bg-black text-white font-bold border-2 border-black rounded-md px-2 py-1 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 ease-out"
                  type="submit"
                >
                  Add
                </Button>
              </div>
            </form>
          )}
          {!isAddingCard && (
            <Button
              className="w-full bg-black text-white font-bold py-2 px-4 rounded-md border-2 border-black shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 ease-out"
              onClick={() => setIsAddingCard(true)}
            >
              + Add Card
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
}
