"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import Hello from "./Hello";

export default function Header() {
  const router = useRouter();

  return (
    <header className="p-4 bg-white border-b-3 border-black">
      <div className="flex justify-between items-center">
        <Hello title="Ryukanban*" />

        <div className="flex gap-2">
          <CustomButton
            label="Home"
            variant="primary"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
    </header>
  );
}
