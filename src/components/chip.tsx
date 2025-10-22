interface ChipProps {
  label: string;
  size?: "small" | "medium" | "large";
  type?: "default" | "success" | "error";
  exClassName?: string;
}

export default function Chip(props: ChipProps) {
  const { label, size = "small", type = "default", exClassName } = props;

  const typeStyle =
    type === "success"
      ? "border-success-main text-success-main"
      : type === "error"
      ? "border-error-main text-error-main"
      : "border-divider text-text-primary";

  return (
    <div
      className={`flex items-center rounded-md border capitalize px-1 py-0.5 ${
        size === "small" ? "text-xs" : size === "medium" ? "text-sm" : "text-md"
      } ${typeStyle} ${exClassName}`}
    >
      {label}
    </div>
  );
}
