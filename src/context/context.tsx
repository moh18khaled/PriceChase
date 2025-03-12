import { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthState {
  userDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    // Add other fields as needed
  };
}

interface UserContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  businessOwnerAuth: any;
  setBusinessOwnerAuth: (auth: any) => void;
  profilePicture: string;
  setProfilePicture: (picture: string) => void;
}

export const User = createContext<UserContextType>({
  auth: {},
  setAuth: () => {},
  businessOwnerAuth: {},
  setBusinessOwnerAuth: () => {},
  profilePicture: "",
  setProfilePicture: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [auth, setAuth] = useState<AuthState>({});
  const [businessOwnerAuth, setBusinessOwnerAuth] = useState({});
  const [profilePicture, setProfilePicture] = useState("");

  // Load state from cookies on initial render
  useEffect(() => {
    const storedAuth = Cookies.get("auth");
    const storedBusinessOwnerAuth = Cookies.get("businessOwnerAuth");
    const storedProfilePicture = Cookies.get("profilePicture");

    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
    if (storedBusinessOwnerAuth) {
      setBusinessOwnerAuth(JSON.parse(storedBusinessOwnerAuth));
    }
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }
  }, []);

  // Save state to cookies whenever it changes
  useEffect(() => {
    Cookies.set("auth", JSON.stringify(auth), { expires: 7 });
  }, [auth]);

  useEffect(() => {
    Cookies.set("businessOwnerAuth", JSON.stringify(businessOwnerAuth), { expires: 7 });
  }, [businessOwnerAuth]);

  useEffect(() => {
    Cookies.set("profilePicture", profilePicture, { expires: 7 });
  }, [profilePicture]);

  return (
    <User.Provider
      value={{ auth, setAuth, businessOwnerAuth, setBusinessOwnerAuth, profilePicture, setProfilePicture }}
    >
      {children}
    </User.Provider>
  );
};