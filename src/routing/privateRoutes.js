import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    const customer = localStorage.getItem("customer");
    if (!customer) {
        return <Navigate to="/login" />;
    }
    return children;
};

