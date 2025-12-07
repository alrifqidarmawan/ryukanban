"use client";
import Column from "@/components/Column";
import { Board as BoardType, List, Card } from "@/types/task";
import {
    DndContext,
    DragOverlay,
    DragStartEvent,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import TaskCard from "./TaskCard";
import { arrayMove } from "@dnd-kit/sortable";
import { useBoard } from "@/context/BoardContext";
import CustomButton from "./CustomButton";

export default function Board() {
    const { board, setBoard, addList } = useBoard();
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    const [activeCard, setActiveCard] = useState<Card | null>(null);

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const card = board.lists
            .flatMap((list) => list.cards)
            .find((card) => card.id === active.id);

        if (card) {
            setActiveCard(card);
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) {
            return;
        }

        const activeId = active.id;
        const overId = over.id;

        const startList = board.lists.find((list) =>
            list.cards.some((card) => card.id === activeId),
        );

        const endList = board.lists.find((list) => list.id === overId);

        if (!startList || !endList) {
            return;
        }

        if (startList.id === endList.id) {
            const activeIndex = startList.cards.findIndex((card) => card.id === activeId);
            const overIndex = endList.cards.findIndex((card) => card.id === overId);

            if (activeIndex !== overIndex) {
                const newCards = arrayMove(startList.cards, activeIndex, overIndex);
                const newLists = board.lists.map((list) => {
                    if (list.id === startList.id) {
                        return { ...list, cards: newCards };
                    }
                    return list;
                });
                setBoard({ ...board, lists: newLists });
            }
        } else {
            const draggedCard = startList.cards.find((card) => card.id === activeId);
            if (!draggedCard) return;

            const newStartCards = startList.cards.filter((card) => card.id !== activeId);
            const newEndCards = [...endList.cards, draggedCard];

            const newLists = board.lists.map((list) => {
                if (list.id === startList.id) {
                    return { ...list, cards: newStartCards };
                }
                if (list.id === endList.id) {
                    return { ...list, cards: newEndCards };
                }
                return list;
            });

            setBoard({ ...board, lists: newLists });
        }

        setActiveCard(null);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div className="px-4 pb-4 min-h-[calc(100vh-14rem)]">
                <div className="overflow-x-auto">
                    <div className="flex justify-start items-start gap-4 min-w-fit">
                        {board.lists.map((list: List) => {
                            return (
                                <Column
                                    key={list.id}
                                    id={list.id}
                                    title={list.title}
                                    cards={list.cards}
                                />
                            );
                        })}
                        <div className="shrink-0 w-72 bg-grat-200 rounded-lg p-4">
                            <button
                                onClick={() => addList("New List")}
                                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <DragOverlay>
                {activeCard ? <TaskCard card={activeCard} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
