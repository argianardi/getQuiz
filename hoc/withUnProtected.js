import { useRouter } from "next/router";
import { useUser } from "../context/user";

const withUnProtected = (Pages) => {
  return (props) => {
    const router = useRouter();
    const user = useUser();
    const { uid } = user;

    if (uid) {
      router.push("/start-quiz");
      return <></>;
    }

    return <Pages {...props} />;
  };
};

export default withUnProtected;
