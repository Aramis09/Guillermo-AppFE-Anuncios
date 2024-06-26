import { useEffect, useRef, useState } from "react";
import { useMakeRequest } from "./useMakeRequest";
import { deleteCookie } from "../utils/cookies";
export interface RespVeriyToken {
  error: string;
  acces: boolean;
}

export interface RespMakeLogin {
  user: string;
  validPassword: boolean;
  token: "";
  error: boolean;
}

export default function useLogin() {
  const [statusUser, setStatusUser] = useState<RespVeriyToken>({
    error: "sin request",
    acces: false,
  });
  const { makeNewRequest } = useMakeRequest({});

  const isLoggedUser = useRef(async () => {
    const status = await makeNewRequest<RespVeriyToken>({
      url: `${import.meta.env.VITE_SOME_BASE_URL}/verificationToken`, //!el token va dentro de "makeNewRequest"
      method: "POST",
    });
    if (!status)
      return {
        error: "erro fetch data",
        acces: false,
      };
    setStatusUser(status);
    return status;
  });

  const logOutUser = async () => {
    deleteCookie({ nameCookie: "messiEntroAJugar" });
    localStorage.removeItem("jwt");
    await isLoggedUser.current();
  };

  const makeUserLogin = async ({
    user,
    password,
  }: {
    user: string;
    password: string;
  }) => {
    const status = await makeNewRequest<RespMakeLogin>({
      url: `${import.meta.env.VITE_SOME_BASE_URL}/user/login`,
      method: "POST",
      body: { user, password },
    });
    if (!status)
      return {
        user: "",
        validPassword: false,
        token: "",
        error: true,
      };
    localStorage.setItem("jwt", status.token);

    setStatusUser({
      error: "",
      acces: status.validPassword,
    });
    return status;
  };

  useEffect(() => {
    isLoggedUser.current().then((res) => res && setStatusUser(res));
  }, [isLoggedUser]);

  return { statusUser, isLoggedUser, logOutUser, makeUserLogin };
}
