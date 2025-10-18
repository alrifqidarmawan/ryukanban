import { Card } from "@/types/task";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import React from "react";
import { Button } from "@headlessui/react";

interface ColumnProps {
  id: string;
  title: string;
  cards: Card[];
  addCard: (title: string) => void;
}

export default function Column({ id, title, cards, addCard }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });
  const [isAddingCard, setIsAddingCard] = React.useState(false);
  const [newCardTitle, setNewCardTitle] = React.useState("");

  const handleSaveCard = (event) => {
    event.preventDefault();
    console.log("Saving card:", newCardTitle);
    setNewCardTitle("");
    setIsAddingCard(false);
    addCard(newCardTitle);
  };

  return (
    <div
      ref={setNodeRef}
      className="ring-offset-gray-95000 p-4 rounded-lg w-md border-2 flex-col"
    >
      <h2 className="font-bold mb-4">{title}</h2>
      <div className="space-y-2">
        <SortableContext items={cards.map((card) => card.id)}>
          {cards.map((card) => (
            <TaskCard key={card.id} card={card} />
          ))}
        </SortableContext>
        <footer>
          {isAddingCard && (
            <form className="flex-col items-center space-x-2" onSubmit={handleSaveCard}>
              <input
                type="text"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              />
              <Button className="text-sm" onClick={() => setIsAddingCard(false)}>
                Cancel
              </Button>
              <Button className="text-sm" type="submit">
                Add
              </Button>
            </form>
          )}
          {!isAddingCard && (
            <Button className="text-sm" onClick={() => setIsAddingCard(true)}>
              + Add Card
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
}
