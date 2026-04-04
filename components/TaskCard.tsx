import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { CSS } from "@dnd-kit/utilities";
import CardModal from "./CardModal";
import { useSortable } from "@dnd-kit/sortable";
import { TaskCard as Card } from "@/types/task";

interface TaskCardProps {
    card: Card;
}

export default function TaskCard({ card }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: card.id });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 0,
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="w-full bg-card border-2 border-black shadow-neo rounded-lg p-4 cursor-grab transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-black">{card.title}</h3>
                    <HiDotsVertical
                        className="text-gray-500 cursor-pointer"
                        onClick={handleOpenModal}
                    />
                </div>
                {card.description && (
                    <p className="text-sm text-black">{card.description}</p>
                )}
            </div>

            <CardModal isOpen={isModalOpen} onClose={handleCloseModal} cardData={card} />
        </>
    );
}
