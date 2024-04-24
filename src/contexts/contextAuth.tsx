import useLogin from "../hooks/useLogin";
import { contextAuth } from "./hooks/useContextAuth";

interface Props {
  children: JSX.Element;
}

export default function ProviderContextAuth({ children }: Props) {
  const { statusUser, isLoggedUser, logOutUser } = useLogin();

  return (
    <contextAuth.Provider value={{ statusUser, isLoggedUser, logOutUser }}>
      {children}
    </contextAuth.Provider>
  );
}
