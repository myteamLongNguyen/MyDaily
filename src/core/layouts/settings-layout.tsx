import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { getUserState } from "../../redux/features/auth-slice";
import paths from "../../navigation/paths";
import useBreakpoint, { hasPermission } from "../utils";
import { NavLink } from "./types";
import { MenuOutlined } from "../../components/icons/menu-outlined";
import Footer from "../../components/footer";
import Header from "../../components/header";
import NavLinkItem from "../../components/nav-link-item";
import { settingsNavigation } from "../../navigation/settings-nav";

interface SettingsLayoutProps {
  children: ReactNode;
  hidden?: boolean;
}

export default function SettingsLayout(props: SettingsLayoutProps) {
  const { children, hidden = false } = props;

  const breakpoint = useBreakpoint();

  const user = useSelector(getUserState).data;

  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setHidden] = useState<boolean>(hidden);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Drawer Menu */}
      <aside
        className={`h-full z-10 bg-background-default w-56 fixed left-0 top-0 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isHidden ? "md:hidden" : "md:block md:translate-x-0"
        } md:relative md:static sm:block overflow-y-auto`}
      >
        <div className="h-16 px-4 flex items-center justify-between">
          <a href={paths.DEFAULT} className="flex items-center">
            <img className="h-24" src="/logo192.png" alt="logo" />
          </a>
          {breakpoint !== "xs" && (
            <div
              className="sm:hidden xs:hidden md:block p-2 bg-background-default cursor-pointer border border-divider rounded-md"
              onClick={() => setHidden(true)}
            >
              <MenuOutlined className="h-4 w-4" />
            </div>
          )}
        </div>
        <div
          className="w-full flex flex-col justify-between pt-4"
          style={{ height: "calc(100% - 64px)" }}
        >
          <nav className="overflow-auto">
            <ul>
              {settingsNavigation
                .filter((nav: NavLink) =>
                  hasPermission(user, nav.category, nav.role)
                )
                .map((e: NavLink) => {
                  if (e.type === "section") {
                    return (
                      <div key={e.id} className="flex items-center my-4 mx-4">
                        <span
                          className="text-center text-xs text-gray-500 font-medium uppercase"
                          style={{ fontSize: "0.6875rem" }}
                        >
                          {e.title}
                        </span>
                        <div className="flex-grow border-t border-divider ml-4" />
                      </div>
                    );
                  }
                  return (
                    <NavLinkItem
                      key={e.id}
                      item={e}
                      toggleNav={(e) => setIsOpen(e)}
                    />
                  );
                })}

              {/* Add more menu items as needed */}
            </ul>
          </nav>
          <Footer />
        </div>
      </aside>

      {/* Page Content */}
      <div className="flex bg-background-default flex-col flex-1">
        {/* Header */}
        <Header
          toggleDrawer={toggleDrawer}
          hidden={isHidden}
          setHidden={(value) => setHidden(value)}
        />

        {/* Main Content */}
        <div
          className="bg-background-paper border border-divider overflow-x-auto overflow-y-hidden rounded-lg mb-2 mx-2"
          style={{
            width:
              breakpoint === "sm" || breakpoint === "xs"
                ? "calc(100vw - 16px)"
                : isHidden
                ? "calc(100vw - 16px)"
                : "calc(100vw - 240px)",
          }}
        >
          <main
            className="w-full p-6"
            style={{
              height: "calc(100vh - 72px)",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
