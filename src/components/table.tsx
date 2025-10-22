import TableHeaderCell from "./table-header-cell";
import { TableHeadCell } from "../types/component";
import { CSSProperties } from "react";

interface TableProps {
  headerCells: TableHeadCell[];
  body: JSX.Element[];
  exClassName?: string;
  style?: CSSProperties;
}

export default function Table(props: TableProps) {
  const { headerCells, body, exClassName, style } = props;

  return (
    <div
      className={`max-h-full overflow-y-auto rounded-lg border border-divider ${exClassName}`}
      style={style}
    >
      <table className="w-full text-sm text-left rtl:text-right bg-common-white rounded-lg">
        <thead className="bg-background-default sticky top-0 z-10">
          <tr key={"header-item"}>
            {headerCells.map((e: TableHeadCell, index: number) => (
              <TableHeaderCell key={e.id} data={e} />
            ))}
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
}
