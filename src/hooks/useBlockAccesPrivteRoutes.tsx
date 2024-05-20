import { useEffect, useState } from "react";

import { blockAccesPrivateUrls } from "../utils/funciontUtils";
import { useContextAuth } from "../contexts/hooks/useContextAuth";

export default function useBlockAccesPrivteRoutes() {
  const [isBlockPage, setIisBlockPage] = useState<boolean>(false);
  const contextAuth = useContextAuth();
  const pathName = window.location.pathname;
  const privateUrls = ["/create", "/create-post", "/create-sections"];
  useEffect(() => {
    if (contextAuth) {
      const resBlock = blockAccesPrivateUrls(
        contextAuth,
        privateUrls,
        pathName
      );
      setIisBlockPage(resBlock);
    }
  }, [pathName, contextAuth]);
  return { isBlockPage };
}
