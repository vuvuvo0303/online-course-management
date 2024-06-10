// routes/ProtectedRoute.tsx

import { Route, RouteProps } from 'react-router-dom';
import useAuthorization from '../hooks/useAuthorization';

export type Role = 'Student' | 'Instructor' | 'Admin';

type ProtectedRouteProps = RouteProps & {
    roles?: Role[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...routeProps }) => {
    useAuthorization();

    return <Route {...routeProps} />;
};


export default ProtectedRoute;
