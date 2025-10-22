import { MenuOutlined } from "./icons/menu-outlined";
import ProfileDropdown from "./profile-dropdown";
import Breadcrumb from "./breadcrumb";
import paths from "../navigation/paths";

interface HeaderProps {
  toggleDrawer: () => void;
  hidden: boolean;
  setHidden: (value: boolean) => void;
}

export default function Header(props: HeaderProps) {
  const { toggleDrawer, hidden, setHidden } = props;

  return (
    <header className="h-16 bg-background-default">
      <div className={`h-full flex items-center px-4 justify-between `}>
        {hidden ? (
          <div className="flex items-center">
            <div className="w-56 pr-8 flex items-center justify-between">
              <a href={paths.DEFAULT} className="flex items-center">
                <img className="h-24" src="/logo192.png" alt="logo" />
              </a>
              <div
                className="p-2 bg-background-default cursor-pointer rounded-md border border-divider"
                onClick={() => setHidden(false)}
              >
                <MenuOutlined className="h-4 w-4" />
              </div>
            </div>
            <Breadcrumb />
          </div>
        ) : (
          <Breadcrumb />
        )}

        <div className="flex items-center">
          <ProfileDropdown />
          {/* Show the menu toggle button only on smaller screens */}
          <button onClick={toggleDrawer} className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 ml-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
