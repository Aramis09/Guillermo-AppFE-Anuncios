import s from "./login.module.scss";
import useLogin from "../../hooks/useLogin";
import { useEffect } from "react";

export default function Login() {
  const { makeUserLogin, statusUser } = useLogin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const fields = Object.fromEntries(new window.FormData(form));
    const user = fields["user"] as string;
    const password = fields["password"] as string;
    await makeUserLogin({ user, password });
  };

  useEffect(() => {
    if (statusUser.acces) {
      window.location.href = "/";
    }
  }, [statusUser]);

  return (
    <section className={s.container}>
      <form className={s.formLogin} onSubmit={handleSubmit}>
        <h4>Ingrese las credenciales requeridas</h4>
        <input
          name="user"
          placeholder="User"
          required
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          data-testid="email-input"
        />
        <button type="submit" name="login">
          Entrar
        </button>
        {statusUser && <p className={s.error}>incorrect credentials</p>}
      </form>
    </section>
  );
}
