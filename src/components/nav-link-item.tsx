import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "../core/layouts/types";
import { hasPermission } from "../core/utils";
import { getUserState } from "../redux/features/auth-slice";
import { ArrowRightOutlined } from "./icons/arrow-right-outlined";

interface NavLinkItemProps {
  item: NavLink;
  toggleNav: (value: boolean) => void;
}

export default function NavLinkItem(props: NavLinkItemProps) {
  const { item, toggleNav } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const user = useSelector(getUserState).data;

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (path?: string) => {
    if (path) {
      navigate(path);
      toggleNav(false);
    } else {
      setOpen(!open);
    }
  };

  useEffect(() => {
    if (item.child?.some((e) => location.pathname.includes(e.id))) {
      setOpen(true);
    }
  }, [currentPath, item]);

  if (item.type === "section") {
    return (
      <div className="flex items-center my-4 mx-5">
        <span className="text-center text-xs text-gray-500 font-medium uppercase">
          {item.title}
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-dark-5 ml-4" />
      </div>
    );
  }

  const isActive = item.path === currentPath;
  const hasChildren = item.child && item.child.length > 0;
  // const hasPermissionToView = hasPermission(user, item.category, item.role);

  // if (!hasPermissionToView) return null;

  return (
    <li>
      {hasChildren ? (
        <>
          <a
            href="javascript:;"
            className={`side-menu ${isActive ? "side-menu--active" : ""}`}
            onClick={() => handleClick()}
          >
            <div className="side-menu__icon">
              {/* {item.icon && <item.icon className="w-5 h-5" />} */}
            </div>
            <div className="side-menu__title">
              {item.title}
              {hasChildren && (
                <div className="side-menu__sub-icon">
                 <ArrowRightOutlined
                    className={`w-4 h-4 transition-transform duration-200 ${
                      open ? "transform rotate-90" : ""
                    }`}
                  />
                </div>
              )}
            </div>
          </a>
          {open && (
            <ul className="">
              {item.child?.map((childItem) => (
                  <li key={childItem.id}>
                    <a
                      href="javascript:;"
                      className={`side-menu ${
                        decodeURIComponent(location.pathname).includes(childItem.id)
                          ? "side-menu--active"
                          : ""
                      }`}
                      onClick={() => handleClick(childItem.path)}
                    >
                      <div className="side-menu__icon">
                        {/* {childItem.icon && <childItem.icon className="w-5 h-5" />} */}
                      </div>
                      <div className="side-menu__title">{childItem.title}</div>
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </>
      ) : (
        <a
          href="javascript:;"
          className={`side-menu ${isActive ? "side-menu--active" : ""}`}
          onClick={() => handleClick(item.path)}
        >
          <div className="side-menu__icon">
            {/* {item.icon && <item.icon className="w-5 h-5" />} */}
          </div>
          <div className="side-menu__title">{item.title}</div>
           <i data-feather="chevron-down" className="side-menu__sub-icon"></i>
        </a>
      )}
    </li>
  );
}