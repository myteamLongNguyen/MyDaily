import { CSSProperties, forwardRef, RefObject } from "react";
import parse from "html-react-parser";
import { TableHeadCell } from "../types/component";

interface TableHeadCellProps {
  data: TableHeadCell;
  exClassName?: string;
  onClick?: () => void;
  ref?: RefObject<HTMLTableCellElement>;
  style?: CSSProperties;
}

const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeadCellProps>(
  (props, ref) => {
    const { data, exClassName, onClick, style } = props;

    // const [isHovered, setIsHovered] = useState(false);

    // const handleHover = () => {
    //   if (data.onUpdate || data.onDelete) {
    //     setIsHovered(!isHovered);
    //   }
    // };

    return (
      <th
        key={data.id}
        ref={ref}
        className={`h-10 text-sm p-2 text-text-title font-semibold ${
          data.onUpdate || data.onDelete ? "cursor-pointer" : "cursor-default"
        } ${onClick ? "cursor-pointer" : "cursor-default"} ${exClassName} ${
          data.align
        } ${data.width}`}
        style={style}
        onClick={onClick}
      >
        {parse(data.label)}
      </th>
    );
  }
);

export default TableHeaderCell;
