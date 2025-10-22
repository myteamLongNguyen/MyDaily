import React from "react";

interface MinusOutlinedProps extends React.SVGProps<SVGSVGElement> {}

export const MinusOutlined: React.FC<MinusOutlinedProps> = React.memo(
  ({ ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      {...props}
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
    </svg>
  )
);
