import { createContext, useContext } from "react";
import { RespVeriyToken } from "../../hooks/useLogin";

interface StateAuthContext {
  statusUser: RespVeriyToken;
  isLoggedUser: React.MutableRefObject<() => Promise<RespVeriyToken>>;
  logOutUser: () => Promise<void>;
}

export const contextAuth = createContext<StateAuthContext | undefined>(
  undefined
);

export const useContextAuth = () => {
  return useContext(contextAuth);
};
