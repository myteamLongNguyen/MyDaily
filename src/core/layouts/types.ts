import { UserRole } from "../../redux/features/user-slice";

export type NavLink = {
  id: string;
  type: "link" | "section";
  path?: string;
  title: string;
  child?: NavLink[];
  category: string[];
  role: UserRole[];
  disabled?: boolean;
};
