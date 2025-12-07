"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Board as BoardType, List, Card } from "@/types/task";
import { initialBoard } from "@/lib/mock-data"; 

// Define the shape of the context
interface BoardContextType {
  board: BoardType;
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
  addCard: (listId: string, title: string) => void;
  deleteCard: (cardId: string) => void;
  updateCard: (cardId: string, newTitle: string) => void;
  addList: (title: string) => void;
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
  const [board, setBoard] = useState<BoardType>(() => {
    const savedBoard = localStorage.getItem('board');
    if (savedBoard !== null && savedBoard !== undefined) {
      return JSON.parse(savedBoard);
    } else {
      return initialBoard;
    }
  });

  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board));
  }, [board]);

  const uuidv4 = () => {
    return crypto.randomUUID();
  };

  const addCard = (listId: string, title: string) => {
    const newCard: Card = {
      id: uuidv4(),
      title,
      createdAt: new Date(),
    };

    setBoard((prevBoard) => {
      const newLists = prevBoard.lists.map((list) => {
        if (list.id === listId) {
          return { ...list, cards: [...list.cards, newCard] };
        }
        return list;
      });
      return { ...prevBoard, lists: newLists };
    });
  };

  const deleteCard = (cardId: string) => {
    setBoard((prevBoard) => {
      const newLists = prevBoard.lists.map((list) => ({
        ...list,
        cards: list.cards.filter((card) => card.id !== cardId),
      }));
      return { ...prevBoard, lists: newLists };
    });
  };

  const updateCard = (cardId: string, newTitle: string) => {
    setBoard((prevBoard) => {
      const newLists = prevBoard.lists.map((list) => ({
        ...list,
        cards: list.cards.map((card) =>
          card.id === cardId ? { ...card, title: newTitle } : card,
        ),
      }));
      return { ...prevBoard, lists: newLists };
    });
  };
  
  const addList = (title: string) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      lists: [...prevBoard.lists, { id: uuidv4(), title, cards: [] }],
    }));
  }
  
  const updateListTitle = (listId: string, newTitle: string) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      lists: prevBoard.lists.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list,
      ),
    }));
  }
  
  const deleteList = (listId: string) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      lists: prevBoard.lists.filter((list) => list.id !== listId),
    }));
  }
  

  return (
    <BoardContext.Provider value={{ board, setBoard, addCard, deleteCard, updateCard, addList, updateListTitle, deleteList }}>
      {children}
    </BoardContext.Provider>
  );
}
