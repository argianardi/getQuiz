import AuthStateChangeProvider from "../context/auth";
import { UserProvider } from "../context/user";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <AuthStateChangeProvider>
          <Component {...pageProps} />
        </AuthStateChangeProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
