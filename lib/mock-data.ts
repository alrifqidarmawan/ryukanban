export const initialBoard = {
  id: "board-1",
  title: "My Kanban Project",
  lists: [
    {
      id: "list-1",
      title: "To Do",
      cards: [
        {
          id: "card-1",
          title: "Create Kanban Board",
          createdAt: new Date("2023-01-15"),
        },
        {
          id: "card-2",
          title: "Implement Drag and Drop",
          createdAt: new Date("2023-01-20"),
        },
      ],
    },
    {
      id: "list-2",
      title: "In Progress",
      cards: [
        {
          id: "card-3",
          title: "Design UI",
          createdAt: new Date("2023-01-18"),
        },
      ],
    },
    {
      id: "list-3",
      title: "Done",
      cards: [],
    },
  ],
};
