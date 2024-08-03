import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
    const customer = localStorage.getItem("customer");
    if (customer) {
        return <Navigate to="/" />;
    }
    return children;
}