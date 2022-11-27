import { useEffect, useState } from "react";
import { Authentication } from "../services/firebase";

const AuthStateChangeProvider = ({ children }) => {
  const [isLoading, setIsloading] = useState(true);

  const InitiateAuthStateChange = () => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is authenticated");
        console.log(user);
      } else {
        console.log("User is not authenticated");
      }
      setIsloading(false);
    });
  };

  useEffect(() => {
    InitiateAuthStateChange();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen min-w-full">
        <p className="mt-[300px] text-5xl text-center">Loading.....</p>
      </div>
    );
  }

  return children;
};

export default AuthStateChangeProvider;
