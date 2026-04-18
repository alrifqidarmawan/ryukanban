"use client";

import { Fragment, useState, useEffect } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { TaskCard as Card, Priority } from "@/types/task";
import { useBoard } from "@/context/BoardContext";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: Card | null;
}

export default function CardModal({
  isOpen,
  onClose,
  cardData,
}: CardModalProps) {
  const { deleteCard, updateCard } = useBoard();
  const [editedTitle, setEditedTitle] = useState(cardData?.title || "");
  const [description, setDescription] = useState(cardData?.description || "");
  const [priority, setPriority] = useState<Priority>(
    cardData?.priority || "Medium",
  );
  const [dueDate, setDueDate] = useState(cardData?.due_date || "");

  useEffect(() => {
    if (cardData) {
      setEditedTitle(cardData.title || "");
      setDescription(cardData.description || "");
      setPriority(cardData.priority || "Medium");
      setDueDate(cardData.due_date || "");
    }
  }, [cardData]);

  const handleDelete = () => {
    if (cardData) {
      deleteCard(cardData.id);
      onClose();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardData) {
      updateCard(cardData.id, {
        title: editedTitle.trim(),
        description: description,
        priority: priority,
        due_date: dueDate || null,
      });
    }
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle transition-all border-2 border-black shadow-neo">
                <DialogTitle
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  Edit Card
                </DialogTitle>
                <div className="mt-4">
                  <form onSubmit={handleSave}>
                    <label
                      htmlFor="cardTitle"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card Title
                    </label>
                    <input
                      type="text"
                      id="cardTitle"
                      className="mt-1 block w-full rounded-md border-2 border-black shadow-neo-sm p-2 focus:ring-black focus:border-black sm:text-sm"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as Priority)}
                      className="w-full border-2 border-black p-2 shadow-neo-sm rounded-md mb-4"
                    >
                      <option value="Low">Low</option>
                      <option value="Middle">Middle</option>
                      <option value="High">High</option>
                    </select>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write markdown here..."
                      className="w-full h-32 border-2 border-black p-2 shadow-neo-sm rounded-md mb-4"
                    />
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full border-2 border-black p-2 shadow-neo-sm rounded-md mb-4"
                    />
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border-2 border-black bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 ease-out"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border-2 border-black bg-black px-4 py-2 text-sm font-medium text-white shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 ease-out"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                  <div className="mt-4 border-t border-black pt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border-2 border-red-500 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 ease-out"
                      onClick={handleDelete}
                    >
                      Delete Card
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
