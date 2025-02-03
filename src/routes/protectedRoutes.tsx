import { Outlet, Navigate } from 'react-router-dom';

type ProtectedRoutesProps = {
    isLoggedIn: boolean;
}

const ProtectedRoutes = ({isLoggedIn}: ProtectedRoutesProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/"/>;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
