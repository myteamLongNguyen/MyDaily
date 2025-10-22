import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRightOutlined } from "./icons/arrow-right-outlined";
import {
  BreadcrumbItem,
  getBreadcrumbState,
} from "../redux/features/common-slice";

export default function Breadcrumb() {
  const navigate = useNavigate();

  const breadcrumbs = useSelector(getBreadcrumbState);

  return (
    <div className="flex space-x-2 items-center text-sm">
      {breadcrumbs.map((e: BreadcrumbItem, index: number) => (
        <Fragment key={e.id}>
          {index > 0 && (
            <ArrowRightOutlined className="h-3 w-3 text-text-title" />
          )}
          <label
            className={`capitalize truncate ${
              index === breadcrumbs.length - 1
                ? "text-text-primary"
                : "text-text-title"
            } ${e.path && "hover:underline cursor-pointer"}`}
            onClick={() => {
              if (typeof e.path === "string") {
                navigate(e.path);
              } else if (typeof e.path === "number") {
                navigate(e.path);
              }
            }}
          >
            {e.title}
          </label>
        </Fragment>
      ))}
    </div>
  );
}
