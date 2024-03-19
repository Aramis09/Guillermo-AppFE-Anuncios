import { useState } from "react";
import s from "./create.module.scss";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import UploadWidget from "../../components/uploadImage/uploadImage";
import { useMakeRequest } from "../../hooks/useMakeRequest";

export default function Create() {
  const [publicId, setPublicId] = useState("");
  const [err, setErr] = useState<string | boolean>(false);
  const { makeNewRequest } = useMakeRequest({});
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_SOME_CLOUD_NAME,
    },
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (publicId === "") {
      return setErr("Por favor suba una imagen");
    }
    const form = event.target as HTMLFormElement;
    const fields = Object.fromEntries(new window.FormData(form));
    console.log(fields);
    console.log(cld.image(publicId));

    const importance = fields["importance"] as string;
    const size = fields["size"] as string;
    await makeNewRequest({
      method: "POST",
      url: `${import.meta.env.VITE_SOME_BASE_URL}/posting`,
      body: {
        size,
        importance,
        section: "Events",
        img: publicId,
        title: "probando",
      },
    });
  };

  const myImage = cld.image(publicId);

  return (
    <section className={s.container}>
      <form className={s.formLogin} onSubmit={handleSubmit}>
        <h4>Subir anuncio</h4>
        <UploadWidget setPublicId={setPublicId} />
        <AdvancedImage cldImg={myImage} />
        <select name="size" id="size" required>
          <option value="" disabled selected>
            Tamanio
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select name="importance" id="importance" required>
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
        <p className={s.err}>{err ? err : ""}</p>
      </form>
    </section>
  );
}
