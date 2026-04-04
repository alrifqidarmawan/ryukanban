export interface TaskCard {
    id: string;
    listId: string;
    title: string;
    position: number;
    description: string;
    createdAt: number;
    updatedAt: number;
}

export interface TaskList {
    id: string;
    title: string;
    position: number;
    cards: TaskCard[];
}

export interface Board {
    id?: string;
    title: string;
    lists: TaskList[];
}
