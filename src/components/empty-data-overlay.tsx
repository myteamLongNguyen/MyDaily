interface Props {
  label?: string;
  exClassName?: string;
}

export default function EmptyDataOverlay(props: Props) {
  const { label, exClassName } = props;

  return (
    <div
      className={`w-full text-gray-400 flex flex-col items-center justify-center ${exClassName}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      {label ?? "No Data"}
    </div>
  );
}
