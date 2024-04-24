import { createContext, useContext } from "react";

interface StateLoaderContext {
  LoaderAllViewport: JSX.Element;
  setLoaderStatus: React.Dispatch<React.SetStateAction<boolean>>;
  loaderStatus: boolean;
}

export const contextLoader = createContext<StateLoaderContext | undefined>(
  undefined
);

export const useContextLoader = () => {
  return useContext(contextLoader);
};
