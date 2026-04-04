"use client";
import { useBoard } from "@/context/BoardContext";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import React, { useState } from "react";
import FloatingButton from "./reusable/FloatingButton";

export default function AddTaskFeature() {
    const [isOpen, setIsOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskStatus, setTaskStatus] = useState("list-1");
    const { addCard, board } = useBoard();
    const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            addCard(taskStatus, taskTitle);
            setTaskTitle("");
            setIsOpen(false);
        }
    };
    return (
        <>
            <div className="relative group">
                <div
                    className="fixed left-0 top-1/2 -translate-y-1/2 bg-gray-50 w-0 h-12 sm:h-14 z-0"
                    aria-hidden="true"
                />
                <FloatingButton onClick={() => setIsOpen(true)} />
            </div>
            <Transition show={isOpen} as={React.Fragment}>
                <Dialog
                    as="div"
                    className="relative z-20"
                    onClose={() => setIsOpen(false)}
                >
                    <TransitionChild
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black opacity-80" />
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-sm sm:max-w-md bg-white p-6 rounded-lg shadow-xl">
                                    <DialogTitle className={`text-lg font-bold`}>
                                        Add New Task
                                    </DialogTitle>
                                    <form onSubmit={handleAddTask}>
                                        <input
                                            type="text"
                                            value={taskTitle}
                                            onChange={(e) => setTaskTitle(e.target.value)}
                                            className="w-full p-2 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Task title"
                                            aria-label="Task title"
                                        />
                                        <select
                                            value={taskStatus}
                                            onChange={(e) =>
                                                setTaskStatus(e.target.value)
                                            }
                                            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {board?.lists.map((board) => {
                                                return (
                                                    <option
                                                        key={board.id}
                                                        value={board.id}
                                                    >
                                                        {board.title}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <div className="mt-4 flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="px-4 py-2 text-gray-500 rounded-md hover:bg-gray-100"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={!taskTitle.trim()}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                            >
                                                Add Task
                                            </button>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
