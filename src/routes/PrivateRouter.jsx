import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
    const location = useLocation();
    const userAvailability = useSelector(state => state?.user?.currentUser !== null);

    if (userAvailability) {
        return children;
    }
    return (
        <div>
            {
                !userAvailability ?
                    <>
                        <Navigate to='/login' state={{ from: location }} replace ></Navigate>
                    </> :
                    <>

                    </>
            }
        </div>
    );
};

export default PrivateRouter;