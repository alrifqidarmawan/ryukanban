import React from "react";

type HelloProps = {
  title: string;
};

export default function Hello({ title }: HelloProps) {
  return (
    <div>
      <h2 className="text-2xl sm:text-2xl md:text-3xl tracking-wide font-extrabold">
        {title}
        <span className="text-sm font-normal">- hi, eiva!</span>
      </h2>
    </div>
  );
}
