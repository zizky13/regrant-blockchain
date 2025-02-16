import { Navigate, Outlet } from "react-router-dom";

interface LoginAuth {
  isAuthenticated: boolean;
}

const Login: React.FC<LoginAuth> = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Login;
