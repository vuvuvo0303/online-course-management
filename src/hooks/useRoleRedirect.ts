
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { paths, roles } from "../consts";
import { getUserFromLocalStorrage } from "../services/auth";

const useRoleRedirect = () => {
  const user = getUserFromLocalStorrage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user.role) {
      redirectBasedOnRole();
    }
  }, [user.role, location.pathname]);

  const redirectBasedOnRole = () => {
    const path = location.pathname;

    switch (user.role) {
      case roles.STUDENT:
        if (path.includes("/instructor") || path.includes("/admin") || path.includes(paths.LOGIN) || path.includes(paths.REGISTER) || path.includes(paths.FORGOT_PASSWORD)) {
          navigate(paths.HOME);
        }
        break;
      case roles.ADMIN:
        if (!path.includes("/admin") || path.includes(paths.LOGIN) || path.includes(paths.REGISTER) || path.includes(paths.FORGOT_PASSWORD)) {
          navigate(paths.ADMIN_HOME);
        }
        break;
      case roles.INSTRUCTOR:
        if (!path.includes("/instructor")|| path.includes(paths.LOGIN) || path.includes(paths.REGISTER) || path.includes(paths.FORGOT_PASSWORD)) {
          navigate(paths.INSTRUCTOR_HOME);
        }
        break;
      default:
        navigate(paths.HOME);
        break;
    }
  };

  const canAccess = (allowedRoles: string[]) => {
    return user.role && allowedRoles.includes(user.role);
  };

  return { canAccess };
};

export default useRoleRedirect;
