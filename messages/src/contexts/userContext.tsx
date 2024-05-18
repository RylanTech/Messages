import axios from "axios";
import {
    ReactNode,
    createContext
} from "react";

export interface user {
    displayName: string,
    password: string
}

interface userContextProps {
    signin: (userInfo: user) => Promise<any>;
}

export const UserContext = createContext<userContextProps>({
    signin: () => Promise.resolve(),
});

const BASE_URL = "http://localhost:3001/api/user/";


export const UserProvider = ({ children }: any) => {

    const signin = async (userInfo: user) => {
        try {
            const response = await axios.post(`${BASE_URL}signin`, userInfo);
            if (response.status === 200) {
                localStorage.setItem("messageToken", response.data.token);
                return response.data;
            } else {
                return false
            }
        } catch (error: any) {
            return
        }
    }

    return (
        <UserContext.Provider
            value={{
                signin
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

