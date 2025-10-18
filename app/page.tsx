"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  DialogTitle,
} from "@headlessui/react";
import Board from "@/components/Board";
import { Edu_TAS_Beginner } from "next/font/google";
import FloatingButton from "@/components/reusable/FloatingButton";

import Hello from "@/components/Hello";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import { initialBoard } from "@/lib/mock-data";
import { Board as BoardType } from "@/types/task";
const edu_TAS_Beginner = Edu_TAS_Beginner({
  subsets: ["latin"],
  variable: "--font-edu-tas-beginner",
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [board, setBoard] = useState<BoardType>(initialBoard);

  const router = useRouter();

  // const handleAddTask = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (taskTitle.trim()) {
  //     try {
  //       const newTask = { title: taskTitle, status: taskStatus };
  //       const id = await db.tasks.add(newTask);
  //       setTasks([...tasks, { ...newTask, id }]);
  //       setTaskTitle("");
  //       setIsOpen(false);
  //     } catch (err) {
  //       console.error("Error adding tasks: ", err);
  //     }
  //   }
  // };

  const handleButtonClick = () => {
    router.push("/about");
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-4 py-6 sm:px-10 sm:pt-15">
        <Hello title="Hello Kanban Board 🚀" />
        <h2 className="text-xl font-bold text-gray-700">{board.title}</h2>
        <CustomButton label="Home" variant="primary" onClick={() => router.push("/")} />
        {/*<CustomButton label="About" variant="secondary" onClick={handleButtonClick} />*/}
        <CustomButton
          label="Counter"
          variant="secondary"
          onClick={() => router.push("/counter")}
        />
      </header>
      <div className="relative group">
        <div
          className="fixed left-0 top-1/2 -translate-y-1/2 bg-gray-50 w-0 h-12 sm:h-14 z-0"
          aria-hidden="true"
        />
        <FloatingButton onClick={() => setIsOpen(true)} />
      </div>
      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-0">
        <Board board={board} setBoard={setBoard} />
      </main>
      <Transition show={isOpen} as="react.fragment">
        <Dialog as="div" className="relative z-20" onClose={() => setIsOpen(false)}>
          <TransitionChild
            as="react.fragment"
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
                as="react.fragment"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-sm sm:max-w-md bg-white p-6 rounded-lg shadow-xl">
                  <DialogTitle
                    className={`text-lg font-bold ${edu_TAS_Beginner.className}`}
                  >
                    Add New Task
                  </DialogTitle>
                  {/*<form onSubmit={handleAddTask}>
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
                      onChange={(e) => setTaskStatus(e.target.value)}
                      className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
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
                  </form>*/}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
