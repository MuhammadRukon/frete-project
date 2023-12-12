import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { getAdmin, getUserStatus } from "../firebaseService";

const useStatus = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    if (user) {
      const fetchData = async () => {
        const data = await getUserStatus(user.email);
        setIsActive(data);
      };
      fetchData();
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [user]);

  return [isActive, isLoading];
};

export default useStatus;
