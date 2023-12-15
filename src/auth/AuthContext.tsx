// AuthContext.js
import { createContext, useState, useContext,ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<any>(null);
  const serverUrl = "http://localhost:5000";


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const login = async (id: any) => {
    // console.log("id to login",id);
    // You can implement your login logic here

    try {
      const response = await fetch(serverUrl + "/api/session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      // console.log(response);
      const data = await response.json();

      if (data.success) {
        // console.log("User logged in successfully:", data);
        setIsLoggedIn(true);
        setUser(id)
        // Handle successful login, e.g., redirect to another page
      } else {
        console.error("Login failed:", data.message);
        // Handle login failure, e.g., display an error message
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    // You can implement your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
