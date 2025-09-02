import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IsLoggedIn from "./IsLoggedIn";
import Loader from "../components/Loader";

import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await IsLoggedIn();
      if (user) setLoggedIn(true);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <div className="h-screen   bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center"><Loader/></div>; // or spinner

  if (!loggedIn) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
