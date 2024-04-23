import { useEffect, useState } from "react";
import s from "./s.module.scss";

export function Loader() {
  return <div className={s.loader}></div>;
}

export function LoaderAllPage({
  status,
  setStatus,
}: {
  status: boolean;
  setStatus: (s: boolean) => void;
}) {
  const [styles, setStyles] = useState({});

  useEffect(() => {
    if (status) {
      setStyles({ opacity: 1, zIndex: 1999, transition: "all 0.1s" });
      setTimeout(() => {
        setStyles({ opacity: 0, zIndex: 0, transition: "all 0.1s" });
        setStatus(false);
      }, 500);
    }
  }, [status, setStatus]);

  return (
    <div className={s.loaderAllPage} style={{ ...styles }}>
      <Loader />
    </div>
  );
}

export function StaticLoader() {
  return (
    <div className={s.loaderAllPage} style={{ opacity: 1, zIndex: 1999 }}>
      <Loader />
    </div>
  );
}
