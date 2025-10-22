export type TableHeadCell = {
  id: string;
  align: "text-left" | "text-center" | "text-right";
  width?: string;
  hidden?: boolean;
  label: string;
  onUpdate?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
};

export type OptionValue = {
  value: string | number;
  label: string;
};
