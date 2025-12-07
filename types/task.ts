export interface Card {
  id: string,
  title: string,
  createdAt?: Date
}

export interface List {
  id: string,
  title: string
  cards: Card[]
}

export interface Board {
  id?: string,
  title: string,
  lists: List[]
}
