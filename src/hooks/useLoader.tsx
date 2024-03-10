import { useEffect, useState } from "react";
import { LoaderAllPage } from "../components/loader/loader";
import { useLocation } from "react-router-dom";

interface Props {
  turnOnInitSinglePage?: boolean; //!This reload a specific  page, is necesary put the hook on the page
  turnOnAllPage?: boolean; //! This reload when change any page, that is reason because is necessary put the hook on App.tsx to use this feature
}

export default function useLoaderManage({
  turnOnInitSinglePage,
  turnOnAllPage,
}: Props) {
  const location = useLocation();

  useEffect(() => {
    if (turnOnInitSinglePage) {
      setLoaderStatus(true);
    }
  }, [turnOnInitSinglePage]);

  useEffect(() => {
    if (turnOnAllPage) {
      setLoaderStatus(true);
    }
  }, [location, turnOnAllPage]);

  const [loaderStatus, setLoaderStatus] = useState(false);
  const LoaderAllViewport = (
    <LoaderAllPage status={loaderStatus} setStatus={setLoaderStatus} />
  );

  return { LoaderAllViewport, loaderStatus, setLoaderStatus };
}
