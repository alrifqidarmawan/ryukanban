import { Card } from "@/types/task";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import React from "react";
import { Button } from "@headlessui/react";
import { useBoard } from "@/context/BoardContext";

interface ColumnProps {
    id: string;
    title: string;
    cards: Card[];
}

export default function Column({ id, title, cards }: ColumnProps) {
    const { addCard } = useBoard();
    const { setNodeRef } = useDroppable({
        id: id,
    });
    const [isAddingCard, setIsAddingCard] = React.useState(false);
    const [newCardTitle, setNewCardTitle] = React.useState("");

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
            className="bg-transparent p-4 rounded-lg w-80 flex flex-col"
        >
            <div
                className={`${columnColors[title as keyof typeof columnColors]} p-2 rounded-md border-2 border-black shadow-neo mb-4`}
            >
                <h2 className="font-bold text-black uppercase tracking-wide">{title}</h2>
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
