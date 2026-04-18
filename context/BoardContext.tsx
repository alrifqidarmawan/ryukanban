"use client";

import { createContext, useContext, ReactNode } from "react";
import { Board as BoardType } from "@/types/task";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { arrayMove } from "@dnd-kit/sortable";
// Define the shape of the context
interface BoardContextType {
  board: BoardType;

  addCard: (listId: string, title: string) => void;
  deleteCard: (cardId: string) => void;
  updateCard: (cardId: string, newTitle: string) => void;
  addList: (title: string) => void;
  moveCard: (cardId: string, newListId: string, newPosition: number) => void;
  moveList: (activeId: string, overId: string) => void;
  updateListTitle: (listId: string, newListTitle: string) => void;
  deleteList: (listId: string) => void;
}

// Create the context
const BoardContext = createContext<BoardContextType | undefined>(undefined);

// Custom hook to use the BoardContext
export function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
}

// BoardProvider component
interface BoardProviderProps {
  children: ReactNode;
}

export function BoardProvider({ children }: BoardProviderProps) {
  const lists =
    useLiveQuery(() => db.lists.orderBy("position").toArray(), []) || [];
  const cards = useLiveQuery(() => db.cards.toArray(), []) || [];

  const uuidv4 = () => {
    return crypto.randomUUID();
  };

  const board: BoardType = {
    title: "",
    lists: lists.map((list) => ({
      ...list,
      cards: cards
        .filter((card) => card.listId === list.id)
        .sort((a, b) => a.position - b.position),
    })),
  };

  const addList = (title: string) => {
    db.lists.add({
      id: uuidv4(),
      title,
      position: lists.length + 1,
      cards: [],
    });
  };

  const moveList = async (activeId: string, overId: string) => {
    //mencari index yang sedang aktif
    const oldIndex = lists.findIndex((l) => l.id === activeId);
    //mencari index yang ingin diganti
    const newIndex = lists.findIndex((l) => l.id === overId);

    //tukar posisi di memory pakai ArrayMove
    const newOrder = arrayMove(lists, oldIndex, newIndex);

    newOrder.forEach((list, index) => {
      db.lists.update(list.id, { position: index });
    });
  };

  const addCard = (listId: string, title: string) => {
    db.cards.add({
      id: uuidv4(),
      title,
      listId,
      position: cards.filter((card) => card.listId === listId).length + 1,
      description: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  const moveCard = (cardId: string, newListId: string, newPosition: number) => {
    db.cards.update(cardId, {
      listId: newListId,
      position: newPosition,
      updatedAt: Date.now(),
    });
  };
  const deleteCard = (cardId: string) => {
    db.cards.delete(cardId);
  };

  const updateCard = (cardId: string, newTitle: string) => {
    db.cards.update(cardId, {
      title: newTitle,
      updatedAt: Date.now(),
    });
  };

  const updateListTitle = (listId: string, newTitle: string) => {
    db.lists.update(listId, { title: newTitle });
  };

  const deleteList = async (listId: string) => {
    await db.lists.delete(listId);
    await db.cards.where("listId").equals(listId).delete();
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        addCard,
        moveCard,
        addList,
        deleteCard,
        updateCard,
        moveList,
        updateListTitle,
        deleteList,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
