import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [credit, setCredit] = useState(false);
  const loadCreditData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });
      if (data.success) {
        setCredit(data?.credits);
        setUser(data?.user.name);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };
  useEffect(() => {
    if (token) loadCreditData();
  }, [token]);
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditData,
    logout,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
