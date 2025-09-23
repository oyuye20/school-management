import { createContext, useEffect, useState } from "react";
import { http } from "../services/http";
import { Navigate, useNavigate } from "react-router-dom";


interface User {
    email: string,
    role: string
}

interface LoginContext {
    user: User | null,
    isLoading: boolean
}



//THIS IS STARTER
export const LoginContext = createContext<LoginContext | null>(null);

type LoginContextProviderProps = {
  children: React.ReactNode;
};

// THIS IS IMPLEMENTATION OF FUNCTION
export const LoginProvider = ({ children }: LoginContextProviderProps) => {
  const value = "haha";

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    http
      .get("api/user")
      .then((res) => {
        setLoading(false)
        setUser(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  }, []);

  http.interceptors.response.use(
    function (response) {
      console.log("Successful response:", response);
      return response; // Always return the response object!
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger.
      // Do something with response error (e.g., handle 401, 404, 500)
      // console.error('Response error:', error.response);

      if (error.response) {
        switch (error.response.status) {
          case 401:
            // navigate('/settings')
            console.warn("Unauthorized! Redirecting to login...");
            // <Navigate to={"/settings"} />;

            // window.location.href = '/login';
            break;
          case 404:
            console.warn("Resource not found:", error.config.url);
            // Example: Show a "Not Found" page or message
            break;
          case 500:
            console.error("Server error:", error.response.data);
            // Example: Display a generic "Something went wrong" message
            break;
          default:
            // Handle other error statuses
            break;
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }

      return Promise.reject(error); // Important: Reject the promise on error
    }
  );

  return (
    <LoginContext.Provider value={{user, isLoading}}>{children}</LoginContext.Provider>
  );
};
