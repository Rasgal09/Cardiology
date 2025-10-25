// React, React Native y Expo
import { createContext, ReactNode, useEffect } from "react";
import { useState, useContext } from "react";
import { Platform } from "react-native";

// Interfaces
import { userDataProps } from "@/interfaces/auth";

// Funciones
import { getToken, getUserMobileData, getUserWebData, logoutMobile, logoutWeb } from "../lib/auth";

const AuthContext = createContext({
  user: null as userDataProps | null,
  isLoggedIn: false,
  login: (userData: userDataProps) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userDataProps | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      console.log("Comprobando usuario autenticado...");
      let token: string | null = null;

      // Obtener el token de autenticación. Si es web, se gestionan las cookies automáticamente, no se necesita el token.
      token = await getToken();

      if (Platform.OS !== "web" && !token) {
        setIsLoggedIn(false);
        return;
      }

      const userData = Platform.OS === "web" ? await getUserWebData() : await getUserMobileData(token);
      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  const login = (userData: userDataProps) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async() => {
    setUser(null);
    setIsLoggedIn(false);

    // Eliminar el token de autenticación almacenado
    if( Platform.OS === "web")
      await logoutWeb();
    else
      await logoutMobile();
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
