import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminRouter = ({ children }) => {
    const location = useLocation();
    const { currentUser } = useSelector((state) => state?.user);
    const isAdmin = currentUser?.isAdmin;

    if (currentUser && isAdmin) {
        return children;
    }

    // If logged in but not admin, redirect to user dashboard
    if (currentUser && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    // If not logged in at all, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRouter;
