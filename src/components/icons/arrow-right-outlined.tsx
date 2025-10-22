import React from "react";

interface ArrowRightOutlinedProps extends React.SVGProps<SVGSVGElement> {}

export const ArrowRightOutlined: React.FC<ArrowRightOutlinedProps> = React.memo(
  ({ ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  )
);
