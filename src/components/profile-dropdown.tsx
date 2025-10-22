import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserState,
  logoutStateAction,
  setLogout,
} from "../redux/features/auth-slice";
import paths from "../navigation/paths";
import { AppDispatch } from "../redux/store";
import { clearTaskStates } from "../redux/features/task-slice";
import { clearOtherStates } from "../redux/features/other-slice";
import { setErrorState } from "../redux/features/common-slice";
import { ArrowDownOutlined } from "./icons/arrow-down-outlined";
import { HomeOutlined } from "./icons/home-outlined";
import { LockOutlined } from "./icons/lock-outlined";
import { SettingsOutlined } from "./icons/settings-outlined";
import { LogoutOutlined } from "./icons/logout-outlined";

export default function ProfileDropdown() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector(getUserState);
  const user = userState !== null ? userState.data : null;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={dropdownButtonRef}
        id="dropdownButton"
        className="h-24 flex items-center px-4 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        <h4 className="mr-2 truncate">{user?.name}</h4>
        <ArrowDownOutlined
          style={{
            height: 15,
            width: 15,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transitionDuration: "300ms",
            transitionTimingFunction: "ease-in-out",
            transitionProperty: "transform",
          }}
        />
      </div>
      {open && (
        <div
          ref={dropdownRef}
          id="dropdownMenu"
          className="absolute top-20 right-6 z-50 dropdown-box__content box"
        >
          <div
            className="px-4 py-2 cursor-pointer"
            onClick={() => navigate(paths.PROFILE)}
          >
            <div className="font-semibold truncate hover:underline">
              {user?.email}
            </div>
            <div>{user?.position.name}</div>
          </div>
          <hr className="bg-divider mx-2" />
          <ul
            aria-labelledby="dropdownInformationButton"
            className="border-none"
          >
            <li>
              <a
                href={paths.DEFAULT}
                className="block px-4 py-2.5 hover:bg-action-hover flex items-center"
              >
                <HomeOutlined className="h-4 w-4 mr-2" />
                Home
              </a>
            </li>
            <li>
              <a
                href={paths.CHANGE_PASSWORD}
                className="block px-4 py-2.5 hover:bg-action-hover flex items-center"
              >
                <LockOutlined className="h-4 w-4 mr-2" />
                Change Password
              </a>
            </li>
            <li>
              <a
                href={paths.PROFILE}
                className="block px-4 py-2.5 hover:bg-action-hover flex items-center"
              >
                <SettingsOutlined className="h-4 w-4 mr-2" />
                Settings
              </a>
            </li>
            <hr className="bg-divider mx-2" />
            <li>
              <a
                href=""
                className="block px-4 py-2.5 hover:bg-action-hover flex items-center"
                onClick={() => {
                  dispatch(setLogout());
                  // dispatch(logoutStateAction())
                  dispatch(clearTaskStates());
                  dispatch(clearOtherStates());
                  dispatch(setErrorState(null));
                  navigate(paths.LOGIN, { replace: true });
                }}
              >
                <LogoutOutlined className="h-4 w-4 mr-2" />
                Sign out
              </a>
            </li>
            <hr className="bg-divider mx-2" />
            <li className="flex px-4 py-2.5 flex text-xs items-center justify-center">
              {`${process.env.REACT_APP_VERSION_NAME}.${process.env.REACT_APP_VERSION_CODE}.${process.env.REACT_APP_BUILD_DATE}`}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
