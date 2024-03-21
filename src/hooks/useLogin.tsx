import { useEffect, useRef, useState } from "react";
import { useMakeRequest } from "./useMakeRequest";
import { deleteCookie } from "../utils/cookies";
interface RespVeriyToken {
  error: string;
  acces: boolean;
}

interface RespMakeLogin {
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
    console.log(import.meta.env.VITE_SOME_BASE_URL);
    
    const status = await makeNewRequest<RespVeriyToken>({
      url: `${import.meta.env.VITE_SOME_BASE_URL}/verificationToken`,
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
