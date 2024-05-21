import axios from "axios";
import {
    ReactNode,
    createContext,
    useState
} from "react";

export interface user {
    displayName: string,
    password: string
}

interface userContextProps {
    primaryColor: string;
    setPrimaryColor: (newColor: string) => void; // Add setPrimaryColor here
    getPrimaryColor: () => Promise<string | null>;
    signin: (userInfo: user) => Promise<any>;
}


export const UserContext = createContext<userContextProps>({
    primaryColor: "",
    setPrimaryColor: () => Promise.resolve(),
    getPrimaryColor: () => Promise.resolve(""),
    signin: () => Promise.resolve(),
});

const BASE_URL = "http://localhost:3001/api/user/";


export const UserProvider = ({ children }: any) => {

    const [primaryColor, setPrimaryColor] = useState("");

    const signin = async (userInfo: user) => {
        try {
            const response = await axios.post(`${BASE_URL}signin`, userInfo);
            if (response.status === 200) {
                localStorage.setItem("messageToken", response.data.token);
                return response.data;
            } else {
                return false;
            }
        } catch (error: any) {
            return;
        }
    };

    const getPrimaryColor = async () => {
        let primaryColor = localStorage.getItem("primary-color")
        if (primaryColor) {
            setPrimaryColor(primaryColor?.toString())
        } else {
            setPrimaryColor("#0054E9")
        }
        return primaryColor
    }

    return (
        <UserContext.Provider
            value={{
                primaryColor,
                setPrimaryColor, // Pass setPrimaryColor directly
                getPrimaryColor,
                signin
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
