import React from "react";

interface FloatingButtonProps {
  onClick: () => void;
  ariaLabel?: string;
  children?: React.ReactNode;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  ariaLabel = "Floating button",
  children = "+",
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundImage:
          "linear-gradient(301deg,rgba(85, 194, 218, 1) 0%, rgba(87, 131, 219, 1) 50%, rgba(70, 129, 244, 1) 100%)",
        backgroundSize: "200% 200%",
        animation: "flowGradient 5s ease infinite",
      }}
      className="fixed -left-12 top-1/2 -translate-y-1/2 text-white font-bold w-12 sm:w-18 h-12 sm:h-18 rounded-full drop-shadow-2xl group-hover:w-24 sm:group-hover:w-32 sm:group-hover:h-28 group-hover:bg-gradient-to-r group-hover:from-blue-800 opacity-50 group-hover:opacity-90 group-hover:to-blue-900 group-hover:shadow-lg transition-all duration-300 ease-out z-10"
      aria-label={ariaLabel}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
        {children}
      </span>
    </button>
  );
};

export default FloatingButton;
