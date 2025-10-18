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

interface BoardProps {
  board: BoardType;
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
}

export default function Board({ board, setBoard }: BoardProps) {
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

    //menemukan list tujuan

    //check keamanan

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

    //temukan kartu yang didrag
    const draggedCard = startList.cards.find((card) => card.id === activeId);
    if (!draggedCard) return;

    //buat array kartu baru untuk list asalnya
    const newStartCards = startList.cards.filter((card) => card.id !== activeId);

    //buat array kartu baru untuk list tujuannya
    const newEndCards = [...endList.cards, draggedCard];

    // buat array list yang baru
    const newLists = board.lists.map((list) => {
      if (list.id === startList.id) {
        return { ...list, cards: newStartCards };
      }
      if (list.id === endList.id) {
        return { ...list, cards: newEndCards };
      }
      return list;
    });
    //memperbarui statenya
    setBoard({ ...board, lists: newLists });

    setActiveCard(null);
  };

  function uuidv4() {
    return crypto.randomUUID();
  }

  const addCardToList = (listId: string, cardTitle: string) => {
    const newCard = { id: uuidv4(), title: cardTitle, createdAt: new Date() };
    const newLists = board.lists.map((list) => {
      if (list.id === listId) {
        return { ...list, cards: [...list.cards, newCard] };
      }
      return list;
    });
    setBoard({ ...board, lists: newLists });

    setActiveCard(null);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="p-4 text-2xl drop-shadow-2xl rounded-xl mx-5 mt-8 primary-bg">
        <div className="overflow-x-auto w-full">
          <div className="flex justify-center align-middle gap-4">
            {board.lists.map((list: List) => {
              return (
                <Column
                  key={list.id}
                  id={list.id}
                  title={list.title}
                  cards={list.cards}
                  addCard={(title) => addCardToList(list.id, title)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <DragOverlay>{activeCard ? <TaskCard card={activeCard} /> : null}</DragOverlay>
    </DndContext>
  );
}
