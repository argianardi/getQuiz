import { useEffect, useState } from "react";
import { Authentication } from "../services/firebase";
import { InitialUserState, useUser } from "./user";

const AuthStateChangeProvider = ({ children }) => {
  const [isLoading, setIsloading] = useState(true);
  const user = useUser();
  const { SetUser } = user;

  const InitiateAuthStateChange = () => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        SetUser({ email: user.email, uid: user.uid });
      } else {
        SetUser(InitialUserState);
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
