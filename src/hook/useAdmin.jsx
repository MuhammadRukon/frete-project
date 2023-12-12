import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { getAdmin } from "../firebaseService";

const useAdmin = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const data = await getAdmin(user.email);
        setIsAdmin(data);
      };
      fetchData();
      if (isAdmin) {
        setIsLoading(false);
      }
    }
  }, [user?.email]);
  return [isAdmin, isLoading];
};

export default useAdmin;
