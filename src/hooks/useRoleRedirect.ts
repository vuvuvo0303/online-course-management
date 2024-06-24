
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { paths, roles } from "../consts";

const useRoleRedirect = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;  
  const userRole = user?.role;
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
        if (path.includes("/instructor") || path.includes("/admin") || path.includes(paths.LOGIN) || path.includes(paths.REGISTER) || path.includes(paths.FORGOT_PASSWORD)) {
          navigate("/");
        }
        break;
      case roles.ADMIN:
        if (!path.includes("/admin") || path.includes(paths.LOGIN) || path.includes(paths.REGISTER) || path.includes(paths.FORGOT_PASSWORD)) {
          navigate("/admin/dashboard");
        }
        break;
      case roles.INSTRUCTOR:
        if (!path.includes("/instructor")|| path.includes(paths.LOGIN) || path.includes(paths.REGISTER) || path.includes(paths.FORGOT_PASSWORD)) {
          navigate("/instructor/dashboard");
        }
        break;
      default:
        navigate("/");
        break;
    }
  };

  const canAccess = (allowedRoles: string[]) => {
    return userRole && allowedRoles.includes(userRole);
  };

  return { canAccess };
};

export default useRoleRedirect;
