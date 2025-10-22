import React from "react";

interface TooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  children?: React.ReactNode;
  className?: string;
}

export default function Tooltip({
  content,
  position = "top",
  children,
  className = "",
}: TooltipProps) {
  // Position classes
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className={`relative inline-flex group ${className}`}>
      {/* Default info icon if no children provided */}
      {children || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-400 hover:text-gray-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}

      {/* Tooltip bubble - added min-w-[200px] and max-w-[300px] */}
      <div
        className={`absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-md shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 min-w-[200px] max-w-[300px] ${positionClasses[position]}`}
      >
        {content}
        {/* Tooltip arrow */}
        <div
          className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
            position === "top" ? "top-full -translate-x-1/2 left-1/2 -mt-1"
            : position === "bottom" ? "bottom-full -translate-x-1/2 left-1/2 -mb-1"
            : position === "left" ? "left-full -translate-y-1/2 top-1/2 -ml-1"
            : "right-full -translate-y-1/2 top-1/2 -mr-1"
          }`}
        />
      </div>
    </div>
  );
}