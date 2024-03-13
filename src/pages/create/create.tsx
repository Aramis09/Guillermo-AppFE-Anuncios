import s from "./create.module.scss";

export default function Create() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const fields = Object.fromEntries(new window.FormData(form));
    console.log(fields);
    // const user = fields["user"] as string;
    // const password = fields["password"] as string;
    // await makeUserLogin({ user, password });
  };

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
        <select name="size" id="size">
          <option value="" disabled selected>
            Tamanio
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select name="importance" id="importance">
          <option value="" disabled selected>
            Importancia
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <button type="submit" name="login">
          Entrar
        </button>
      </form>
    </section>
  );
}
