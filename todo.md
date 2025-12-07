Pilihan yang sangat tepat! Menggabungkan Context API (untuk data global/state management) dan Props (untuk komponen UI kecil) adalah cara terbaik untuk memahami "The React Way".

Kamu akan belajar memisahkan antara Logic Layer (otak aplikasi) dan Presentation Layer (wajah aplikasi).

Berikut adalah Strategi Belajar & Pengembangan yang dirancang khusus agar kamu paham kedua konsep tersebut sekaligus menyelesaikan Ryukanban.

1. Konsep: Kapan Pakai Context vs Props?

Sebelum ngoding, pegang prinsip ini:

Gunakan Context (The Brain): Untuk data yang "hidup" dan fungsi-fungsi logika yang mengubah data tersebut.

Contoh: State board, fungsi addCard, deleteCard, moveCard.

Kenapa: Supaya kamu tidak perlu mengoper fungsi deleteCard dari Page -> Board -> Column -> Card.

Gunakan Props (The Body): Untuk komponen "bodoh" (dumb components) yang tugasnya hanya menampilkan data yang diberikan.

Contoh: Komponen Button, Input, dan tampilan visual TaskCard.

Kenapa: Agar komponen ini bisa dipakai ulang (reusable) di tempat lain dengan data berbeda.

2. Langkah Implementasi (Sambil Belajar)

Ikuti urutan ini untuk melanjutkan projectmu:

Langkah A: Buat "Otak" dengan Context (Learning: Context & Provider Pattern)

Kita akan memindahkan state board dan logika localStorage ke dalam Context.

Buat file context/BoardContext.tsx.

Isinya adalah state utama aplikasi.

code
TypeScript
download
content_copy
expand_less
// context/BoardContext.tsx
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Board, Column, Card } from '@/types'; // Sesuaikan path type kamu

// 1. Definisikan bentuk Context
interface BoardContextType {
  board: Board;
  addColumn: (title: string) => void;
  addCard: (columnId: string, title: string) => void;
  deleteCard: (cardId: string) => void;
  // ... fungsi lain nanti
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

// 2. Buat Provider (Pembungkus)
export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [board, setBoard] = useState<Board>(/* initial state */);

  // Load & Save localStorage bisa ditaruh di sini (Fase 1 roadmap kamu)
  
  const addCard = (columnId: string, title: string) => {
    // Logika nambah card di sini
    console.log("Nambah card di kolom:", columnId);
  };

  const deleteCard = (cardId: string) => {
      // Logika delete
  }

  // Masukkan semua value dan fungsi ke dalam value provider
  return (
    <BoardContext.Provider value={{ board, addCard, deleteCard, addColumn: () => {} }}>
      {children}
    </BoardContext.Provider>
  );
}

// 3. Custom Hook biar gampang dipanggil
export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoard must be used within a BoardProvider");
  return context;
}
Langkah B: Bungkus Aplikasi (Learning: React Tree)

Di app/layout.tsx atau app/page.tsx, bungkus kontenmu dengan Provider tadi.

code
TypeScript
download
content_copy
expand_less
// app/page.tsx
import { BoardProvider } from '@/context/BoardContext';
import KanbanBoard from '@/components/KanbanBoard';

export default function Home() {
  return (
    <BoardProvider>
       <main className="min-h-screen bg-[#FFFDF5] ...">
          <KanbanBoard />
       </main>
    </BoardProvider>
  );
}
Langkah C: Implementasi Props pada Komponen UI (Learning: Props & Component Composition)

Sekarang, saatnya belajar Props dengan benar. Kita buat komponen UI agar "murni" menerima data dari atas.

1. Komponen TaskCard.tsx (Murni Props)
Komponen ini JANGAN panggil useContext. Biarkan dia menerima data lewat props. Ini latihan bagus untuk props.

code
TypeScript
download
content_copy
expand_less
// components/TaskCard.tsx
interface TaskCardProps {
  id: string;
  title: string;
  category: "todo" | "inprogress" | "done"; // Buat styling warna border/bg
  onClick: () => void; // Props berupa function (Event Handler)
}

export default function TaskCard({ id, title, category, onClick }: TaskCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white border-2 border-black p-4 neo-shadow cursor-pointer hover:translate-x-1..."
    >
      <h3 className="font-bold">{title}</h3>
      {/* Kamu bisa tambah props lain nanti kayak 'tags' atau 'dueDate' */}
    </div>
  );
}

2. Komponen Column.tsx (Jembatan / Hybrid)
Di sini kamu akan menggunakan Context untuk mengambil fungsi action (seperti addCard), tapi menerima data kolom lewat Props.

code
TypeScript
download
content_copy
expand_less
// components/Column.tsx
import { useBoard } from '@/context/BoardContext';
import TaskCard from './TaskCard';

interface ColumnProps {
  columnId: string;
  title: string;
  cards: Card[]; // Array kartu dioper via props
}

export default function Column({ columnId, title, cards }: ColumnProps) {
  // Ambil fungsi global dari Context
  const { addCard } = useBoard(); 

  return (
    <div className="w-80 shrink-0">
      {/* Header Kolom */}
      <div className={`border-2 border-black p-3 font-bold neo-shadow mb-4 
        ${title === 'To Do' ? 'bg-[#FFDE59]' : 'bg-white'}`}>
        {title}
      </div>

      {/* Render Kartu Menggunakan Props */}
      <div className="flex flex-col gap-3">
        {cards.map((card) => (
          <TaskCard 
            key={card.id} 
            id={card.id} 
            title={card.title} 
            category="todo" // Nanti disesuaikan
            onClick={() => console.log("Buka modal untuk", card.id)} 
          />
        ))}
      </div>

      {/* Button Add Card pake fungsi dari Context */}
      <button 
        onClick={() => addCard(columnId, "New Task")}
        className="w-full mt-4 bg-black text-white py-2 font-bold neo-shadow..."
      >
        + Add Card
      </button>
    </div>
  );
}
3. Rangkuman Materi Belajar dari Struktur Ini

Dengan struktur di atas, kamu akan belajar:

State Management (Context): Kamu belajar cara membuat "Single Source of Truth". Semua data board ada di satu tempat (BoardContext). Kalau ada bug data hilang, kamu tahu harus cari di mana.

Passing Data (Props): Di Column.tsx, kamu belajar me-looping data cards dan mengopernya ke TaskCard via props.

Event Bubbling (Props Function): Di TaskCard, kamu belajar melempar event klik (onClick) dari komponen anak kembali ke komponen induk.

Separation of Concerns: Kamu belajar memisahkan tampilan (TaskCard) dari logika bisnis (BoardContext).

Saran Langkah Selanjutnya (Action Plan)

Hari ini: Setup BoardContext.tsx. Pindahkan logic useState board kamu yang sekarang ada di page.tsx ke dalam context file tersebut.

Besok: Refactor TaskCard agar menerima data via props (seperti contoh Langkah C).

Lusa: Hubungkan tombol "Add Card" di UI kamu agar memanggil fungsi addCard yang ada di Context.

Cara ini akan membuat kodemu sangat rapi, profesional, dan kamu benar-benar paham fundamental React. Semangat! 🚀