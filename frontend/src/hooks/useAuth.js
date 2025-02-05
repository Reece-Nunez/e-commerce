import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the current user profile on mount
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/users/profile");
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


export const useAuth = () => {
    return useContext(AuthContext);
};
