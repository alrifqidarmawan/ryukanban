import Board from "@/components/Board";
import Header from "@/components/Header";

import AddTaskFeature from "@/components/AddTaskFeature";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 px-4 py-4 sm:px-6 sm:py-0">
                <div className="mt-4 flex align-middle justify-center w-full">
                    <div className="bg-background rounded-md">
                        <h1 className="p-4 text-5xl font-bold tracking-tight text-gray-900">
                            Kanban Board
                        </h1>
                    </div>
                </div>

                <Board />
            </main>
            <AddTaskFeature />
        </div>
    );
}
