import { useContext, useEffect, useState } from "react";
import { http } from "../services/http";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

const ProtectedRoute = () => {
  const login = useContext(LoginContext);

  console.log(login?.user);


  if(login?.isLoading)
    return  <p>Loading...</p>
  
  if(login?.user == null) 
    return <Navigate to={"/"} />
  
  return login.user.role == 'teacher' ? <Outlet /> : <Navigate to={"/"} />;



 /*  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const checkAuth = async () => {
      try {
        // Make the API request
        await http.get("api/user", { signal: abortController.signal });
        // If successful, user is logged in
        setIsLoggedIn(true);
      } catch (err) {
        // If request fails, user is not logged in
        console.log("Authentication error:", err);
        setIsLoggedIn(false);
      } finally {
        // After the check is done, set loading to false
        // Check if the request wasn't aborted to avoid state updates on an unmounted component
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();
    return () => abortController.abort();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }
  return isLoggedIn == true ? <Outlet /> : <Navigate to={"/"} />; */
};
export default ProtectedRoute;
