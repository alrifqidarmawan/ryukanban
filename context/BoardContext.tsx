"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Board as BoardType, TaskCard } from "@/types/task";
import { arrayMove } from "@dnd-kit/sortable";
import { supabase } from "@/lib/supabase";
// Define the shape of the context
interface BoardContextType {
  board: BoardType;

  addCard: (listId: string, title: string) => void;
  deleteCard: (cardId: string) => void;
  updateCard: (cardId: string, update: Partial<TaskCard>) => void;
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
  const [lists, setLists] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);

  const fetchData = async () => {
    const { data: listsData } = await supabase
      .from("lists")
      .select("*")
      .order("position");

    const { data: cardsData } = await supabase
      .from("cards")
      .select("*")
      .order("position");

    if (listsData) setLists(listsData);
    if (cardsData) setCards(cardsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const board: BoardType = {
    title: "",
    lists: lists.map((list) => ({
      ...list,
      cards: cards
        .filter((card) => card.list_id === list.id)
        .sort((a, b) => a.position - b.position),
    })),
  };

  const addList = async (title: string) => {
    const { error } = await supabase
      .from("lists")
      .insert([{ title, position: lists.length + 1 }]);
    fetchData();
  };

  const moveList = async (activeId: string, overId: string) => {
    //mencari index yang sedang aktif
    const oldIndex = lists.findIndex((l) => l.id === activeId);
    //mencari index yang ingin diganti
    const newIndex = lists.findIndex((l) => l.id === overId);

    //tukar posisi di memory pakai ArrayMove
    const newOrder = arrayMove(lists, oldIndex, newIndex);

    await Promise.all(
      newOrder.map((list, index) =>
        supabase.from("lists").update({ position: index }).eq("id", list.id),
      ),
    );
    fetchData();
  };

  const addCard = async (listId: string, title: string) => {
    await supabase.from("cards").insert([
      {
        title,
        list_id: listId,
        position: cards.filter((card) => card.list_id === listId).length + 1,
      },
    ]);
    fetchData();
  };

  const moveCard = async (
    cardId: string,
    newListId: string,
    newPosition: number,
  ) => {
    await supabase
      .from("cards")
      .update({ list_id: newListId, position: newPosition })
      .eq("id", cardId);
    fetchData();
  };
  const deleteCard = async (cardId: string) => {
    await supabase.from("cards").delete().eq("id", cardId);
    fetchData();
  };

  const updateCard = async (cardId: string, updates: Partial<TaskCard>) => {
    await supabase.from("cards").update(updates).eq("id", cardId);
    fetchData();
  };

  const updateListTitle = async (listId: string, newTitle: string) => {
    await supabase.from("lists").update({ title: newTitle }).eq("id", listId);
    fetchData();
  };

  const deleteList = async (listId: string) => {
    await supabase.from("lists").delete().eq("id", listId);
    fetchData();
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
