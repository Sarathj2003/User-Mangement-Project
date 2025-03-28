import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const login = async (email, password) => {
    try {
        console.log("Sending login request with:", { email, password });
        const response = await axios.post(`${API_URL}login/`, { email, password }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("Login API Error:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : { error: "Something went wrong" };
    }
};

export const register = async (fullName, email, password) => {
    try {
        const response = await axios.post(`${API_URL}register/`, { 
            full_name: fullName, 
            email: email, 
            password: password
        });
        return response.data;
    } catch (error) {
        console.error("Registration Error:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : { error: "Something went wrong bro" };
    }
};
