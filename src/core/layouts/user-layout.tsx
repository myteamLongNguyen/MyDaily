import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserState } from "../../redux/features/auth-slice";
import Footer from "../../components/footer";
import { navigation } from "../../navigation";
import { NavLink } from "./types";
import NavLinkItem from "../../components/nav-link-item";
import Header from "../../components/header";
import useBreakpoint, { hasPermission } from "../utils";
import { MenuOutlined } from "../../components/icons/menu-outlined";
import paths from "../../navigation/paths";
import { onPost } from "../api-service";
import {
  CommonStatus,
  GroupTeamResponse,
} from "../../redux/features/other-slice";
import { UserRole } from "../../redux/features/user-slice";

interface UserLayoutProps {
  children: ReactNode;
  hidden?: boolean;
}

export default function UserLayout(props: UserLayoutProps) {
  const { children, hidden = false } = props;

  const breakpoint = useBreakpoint();

  const user = useSelector(getUserState).data;

  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setHidden] = useState<boolean>(hidden);
  const [groupTeamNavs, setGroupTeamNavs] = useState<NavLink[]>([]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Uncomment if you need to fetch group teams
  // useEffect(() => {
  //   const fetchGroupTeams = async () => {
  //     const response = await onPost("/others/group-teams", {
  //       status: [CommonStatus.Active],
  //     });
  //     const groupTeams = response.data;
  //     if (user) {
  //       const tmpTeams =
  //         user.role === UserRole.Admin
  //           ? groupTeams
  //           : groupTeams.filter((e1: GroupTeamResponse) =>
  //               user.leadGroupTeam.includes(e1.id)
  //             );
  //       setGroupTeamNavs([
  //         {
  //           id: "groupTeams",
  //           type: "link",
  //           title: "Teams",
  //           category: [],
  //           role: [],
  //           child: tmpTeams.map((e: GroupTeamResponse) => ({
  //             id: e.id,
  //             type: "link",
  //             title: e.name,
  //             path: `${paths.GROUP_TEAMS}/${e.name}/${e.id}`,
  //             category: [],
  //             role: [],
  //           })),
  //         },
  //       ]);
  //     }
  //   };
  //   fetchGroupTeams();
  // }, [user]);

  return (
    <div className="app">
      <div className="flex">
        {/* BEGIN: Side Menu */}
        <nav className={`side-nav ${isOpen ? "translate-x-0" : "-translate-x-full"} ${
          isHidden ? "md:hidden" : "md:block md:translate-x-0"
        } md:relative md:static sm:block`}>
          <a href={paths.DEFAULT} className="intro-x flex items-center pl-5 pt-4">
            <img alt="Logo" className="w-28" src="/myteam-logo.png" />
          </a>
          <div className="side-nav__devider my-6"></div>
          
          <ul>
            {/* Group Teams Navigation */}
            {user && groupTeamNavs.map((e: NavLink) => (
              <NavLinkItem key={e.id} item={e} toggleNav={(e) => setIsOpen(e)} />
            ))}

            {/* Main Navigation */}
            {navigation
              // .filter((nav: NavLink) => hasPermission(user, nav.category, nav.role))
              .map((e: NavLink) => (
                <NavLinkItem key={e.id} item={e} toggleNav={(e) => setIsOpen(e)} />
              ))}
          </ul>

          {/* Footer */}
          <div className="side-nav__devider my-6"></div>
          <div className="px-5 pb-8">
            <Footer />
          </div>
        </nav>
        {/* END: Side Menu */}

        {/* BEGIN: Content */}
        <div className="content">
          {/* BEGIN: Top Bar */}
            <Header
              toggleDrawer={toggleDrawer}
              hidden={isHidden}
              setHidden={(value) => setHidden(value)}
            />
          {/* END: Top Bar */}

          {/* Main Content */}
          <div className="intro-y box p-5 mt-5 mx-2">
            <main className="w-full p-4">
              {children}
            </main>
          </div>
        </div>
        {/* END: Content */}
      </div>
    </div>
  );
}