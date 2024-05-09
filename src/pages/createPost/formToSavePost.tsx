import { useState } from "react";
import s from "./formToSavePost.module.scss";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import UploadWidget from "../../components/uploadImage/uploadImage";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import {
  ResponseGetAllCategories,
  ResponseGetAllContacts,
} from "../../interfaces/interfaces";

interface Params {
  onSave: ({
    contactType,
    contactValue,
    importance,
    section,
    size,
    owner,
    expire,
  }: {
    size: string;
    importance: string;
    section: string;
    contactValue: string;
    contactType: string;
    publicId: string;
    categoriesSelected: string[];
    owner: string;
    expire: string;
  }) => Promise<void>;
  title?: string;
  required?: boolean;
  titleButton?: string;
  // forcedShowOtherImage?: string;
  publicId: string;
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
}

export default function FormToSavePost({
  onSave,
  title = "Subir anuncio",
  titleButton = "Crear",
  required = true,
  // forcedShowOtherImage,
  publicId,
  setPublicId,
}: Params) {
  const [err, setErr] = useState<string | boolean>(false);

  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

  const { result: categories } = useMakeRequest<ResponseGetAllCategories>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/category`,
  });
  const { result: sections } = useMakeRequest<ResponseGetAllCategories>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/section`,
  });

  const { result: contacts } = useMakeRequest<ResponseGetAllContacts>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/contact`,
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_SOME_CLOUD_NAME,
    },
  });

  const myImage = cld.image(publicId);

  const handleCategories = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    alert("Entre");

    //?Esto agrega las categorias a un array para luego mostrarlas
    if (categoriesSelected.includes(evt.target.value)) {
      return setCategoriesSelected((prev) => [
        ...prev.filter((categ) => categ !== evt.target.value),
      ]);
    }
    return setCategoriesSelected((prev) => [...prev, evt.target.value]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (publicId === "" && required) {
      return setErr("Por favor suba una imagen");
    }
    if (!categories?.data.length)
      alert(
        "Por favor primero cree por lo menos una categoria para poder asignarle a la imagen"
      );
    if (categoriesSelected.length === 0)
      return alert("Por favor, agregue una categoria");
    const form = event.target as HTMLFormElement;
    const fields = Object.fromEntries(new window.FormData(form));

    const importance = fields["importance"] as string;
    const size = fields["size"] as string;
    const section = fields["section"] as string;
    const contactValue = fields["contactValue"] as string;
    const contactType = fields["contactType"] as string;
    const owner = fields["owner"] as string;
    const expire = fields["expire"] as string;

    await onSave({
      contactType,
      contactValue,
      importance,
      section,
      size,
      categoriesSelected,
      publicId,
      owner,
      expire: expire,
    });
  };
  console.log(categoriesSelected);

  return (
    <section className={s.container} onSubmit={handleSubmit}>
      <form className={s.formLogin}>
        <h4>{title}</h4>
        <UploadWidget setPublicId={setPublicId} />
        <AdvancedImage cldImg={myImage} />
        <input
          type="text"
          placeholder="Nombre del cliente"
          name="owner"
          required={required}
        />
        <select name="size" id="size" required={required}>
          <option value="" disabled selected>
            Tamaño
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select name="importance" id="importance" required={required}>
          <option value="" disabled selected>
            Importancia
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <select name="section" id="section" required={required}>
          <option value="" disabled selected>
            Seccion
          </option>
          {sections?.data.map((sections) => (
            <option key={sections.id} value={sections.name}>
              {sections.name}
            </option>
          ))}
        </select>
        <select
          name="categories"
          id="categories"
          required={window.innerWidth > 950 ? false : required}
          multiple
          onChange={handleCategories}
        >
          <option value="" disabled selected>
            Elija una categoria
          </option>
          {categories?.data.map((category) => (
            <option
              key={category.id}
              value={category.name}
              // onClick={() => handleCategories(category.name)}
              style={
                isCategorySelected(categoriesSelected, category.name)
                  ? {
                      backgroundColor: "#4ccd99",
                      color: "white",
                    }
                  : {}
              }
            >
              {`${category.name} ${
                isCategorySelected(categoriesSelected, category.name) ? "✔" : ""
              } `}
            </option>
          ))}
        </select>
        <div className={s.divsContainers}>
          Define un medio de contacto
          <select name="contactType" id="contactType">
            <option value="" disabled selected>
              Tipo de contacto
            </option>
            {contacts?.data.map((ct) => (
              <option key={crypto.randomUUID()} value={ct.type}>
                {ct.type}
              </option>
            ))}
          </select>
          Escriba el contacto
          <input type="text" name="contactValue" />
        </div>
        <div className={s.divsContainers}>
          Defina fecha de expiracion
          <input type="date" name="expire" required={required} />
        </div>
        <button type="submit" name="login">
          {titleButton}
        </button>
        <p className={s.err}>{err ? err : ""}</p>
      </form>
    </section>
  );
}

const isCategorySelected = (list: string[], category: string) => {
  if (!list.includes(category)) return false;
  return true;
};
