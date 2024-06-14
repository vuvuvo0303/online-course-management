
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { paths, roles } from "../consts";

const useRoleRedirect = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userRole) {
      redirectBasedOnRole();
    }
  }, [userRole, location.pathname]);

  const redirectBasedOnRole = () => {
    const path = location.pathname;

    switch (userRole) {
      case roles.STUDENT:
        if (path.includes("/instructor") || path.includes("/admin")) {
          navigate(paths.NOTFOUND);
        }
        break;
      case roles.ADMIN:
        if (!path.includes("/admin")) {
          navigate("/admin/dashboard/statics");
        }
        break;
      case roles.INSTRUCTOR:
        if (!path.includes("/instructor")) {
          navigate("/instructor/dashboard/statics");
        }
        break;
      default:
        navigate(paths.NOTFOUND);
        break;
    }
  };

  const canAccess = (allowedRoles: string[]) => {
    return userRole && allowedRoles.includes(userRole);
  };

  return { canAccess };
};

export default useRoleRedirect;


