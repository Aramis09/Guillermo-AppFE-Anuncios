import useLoaderManage from "../hooks/useLoader";
import { contextLoader } from "./hooks/useContextLoader";

interface Props {
  children: JSX.Element;
}

export default function ProviderContextLoader({ children }: Props) {
  const { LoaderAllViewport, setLoaderStatus, loaderStatus } = useLoaderManage({
    turnOnInitSinglePage: true,
    turnOnAllPage: true,
  });
  return (
    <contextLoader.Provider
      value={{ LoaderAllViewport, setLoaderStatus, loaderStatus }}
    >
      {children}
    </contextLoader.Provider>
  );
}
