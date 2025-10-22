import { HTMLAttributes } from "react";

interface TableBodyCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: any;
  exClassName?: string;
}

export default function TableBodyCell(props: TableBodyCellProps) {
  const { children, exClassName, ...rest } = props;

  return (
    <td
      className={`h-10 text-left text-sm p-2 text-text-primary whitespace-nowrap border-divider ${exClassName}`}
      {...rest}
    >
      {children}
    </td>
  );
}
