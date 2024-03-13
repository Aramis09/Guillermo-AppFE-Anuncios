import { useEffect, useMemo, useState } from "react";
import { getCookie } from "../utils/cookies";

interface Params {
  url?: string;
  method?: "POST" | "GET" | "PUT" | "DELETE";
  body?: object | undefined;
}

export function useMakeRequest<T>({ url, method, body }: Params) {
  const [result, setResult] = useState<T>();
  const [urlSent, setUrlSent] = useState<string | undefined>(url);
  const [err, setErr] = useState<string>("Error !!");

  const config = useMemo(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "auth-token",
      `${getCookie({ nameCookie: "messiEntroAJugar" }).cookiesFound || null}`
    );
    myHeaders.append(
      "auth-secret-key",
      `${import.meta.env.VITE_SOME_KEY_SECRET}`
    );
    const config: RequestInit = {
      method: method || "GET",
      headers: myHeaders,
      credentials: "include",
      body: JSON.stringify(body) || null,
    };
    return config;
  }, [method, body]);

  useEffect(() => {
    if (urlSent) {
      fetch(urlSent, config)
        .then((res) => res.json())
        .then((res) => setResult(res))
        .catch((err) => setErr(err));
    }
  }, [url, urlSent, config]);

  async function makeNewRequest<R>({ url, method, body }: Params) {
    if (!url) return;
    const myHeaders = new Headers();
    myHeaders.append(
      "auth-token",
      `${getCookie({ nameCookie: "messiEntroAJugar" }).cookiesFound || null}`
    );
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "auth-secret-key",
      `${import.meta.env.VITE_SOME_KEY_SECRET}`
    );
    const config: RequestInit = {
      method: method || "GET",
      headers: myHeaders,
      credentials: "include",
      body: JSON.stringify(body) || null,
    };

    const response = await fetch(url, config)
      .then((res) => res.json())
      .catch((err) => setErr(err));

    return response as R;
  }

  return { result, setResult, err, setUrlSent, makeNewRequest };
}
