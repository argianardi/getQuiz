import AuthStateChangeProvider from "../context/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <AuthStateChangeProvider />
    </>
  );
}

export default MyApp;
