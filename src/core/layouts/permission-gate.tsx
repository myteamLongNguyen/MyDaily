import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import paths from "../../navigation/paths";
import { hasPermission } from "../utils";
import { getUserState } from "../../redux/features/auth-slice";
import { UserRole } from "../../redux/features/user-slice";

interface PermissionGateProps {
  children: any;
  categories: string[];
  roles: UserRole[];
}

const PermissionGate = (props: PermissionGateProps) => {
  const { children, categories, roles } = props;
  const navigate = useNavigate();

  const user = useSelector(getUserState).data;

  const hasAccess = user && hasPermission(user, categories, roles);

  useEffect(() => {
    if (user && !hasAccess) {
      navigate(paths.UNAUTHORIZED);
    }
  }, [user, hasAccess]);

  if (!user || !hasAccess) {
    return null; // This prevents rendering the children
  }

  return children;

  // useEffect(() => {
  //   if (user) {
  //     if (!hasPermission(user, teams, roles)) {
  //       navigate(paths.UNAUTHORIZED);
  //       return;
  //     }
  //   } else {
  //     // navigate(paths.LOGIN);
  //     return;
  //   }
  // }, [user]);

  // return children;
};

export default PermissionGate;
