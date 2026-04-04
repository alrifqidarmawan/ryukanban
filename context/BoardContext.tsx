"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Board as BoardType, TaskList, TaskCard } from "@/types/task";
import { initialBoard } from "@/lib/mock-data";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

// Define the shape of the context
interface BoardContextType {
    board: BoardType;

    addCard: (listId: string, title: string) => void;
    deleteCard: (cardId: string) => void;
    updateCard: (cardId: string, newTitle: string) => void;
    addList: (title: string) => void;
    moveCard: (cardId: string, newListId: string, newPosition: number) => void;

    // updateListTitle: (listId: string, newListTitle: string) => void;
    // deleteList: (listId: string) => void;
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
    const lists = useLiveQuery(() => db.lists.orderBy("position").toArray(), []) || [];
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
        db.lists.add({ id: uuidv4(), title, position: lists.length + 1, cards: [] });
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

    // const updateListTitle = (listId: string, newTitle: string) => {

    // };

    // const deleteList = (listId: string) => {

    // };

    return (
        <BoardContext.Provider
            value={{
                board,
                addCard,
                moveCard,
                addList,
                deleteCard,
                updateCard,
                // updateListTitle,
                // deleteList,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
}
