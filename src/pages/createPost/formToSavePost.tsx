import { useState } from "react";
import s from "./create.module.scss";
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
  }: {
    size: string;
    importance: string;
    section: string;
    contactValue: string;
    contactType: string;
    publicId: string;
    categoriesSelected: string[];
  }) => Promise<void>;

  title?: string;

  required?: boolean;
}

export default function FormToSavePost({
  onSave,
  title = "Subir anuncio",
  required = true,
}: Params) {
  const [publicId, setPublicId] = useState("");
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
    const options = evt.target.options;
    const currentIndexSelected = evt.target.selectedIndex;
    for (let i = 0; i < options.length; i++) {
      if (options[i].index === currentIndexSelected) {
        if (!categoriesSelected.includes(options[i].value)) {
          setCategoriesSelected((prev) => [...prev, options[i].value]);
        } else {
          setCategoriesSelected((prev) => {
            const newState = prev.filter(
              (nameCat) => nameCat !== options[i].value
            );
            return newState;
          });
        }
      }
    }
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

    const form = event.target as HTMLFormElement;
    const fields = Object.fromEntries(new window.FormData(form));

    const importance = fields["importance"] as string;
    const size = fields["size"] as string;
    const section = fields["section"] as string;
    const contactValue = fields["contactValue"] as string;
    const contactType = fields["contactType"] as string;
    await onSave({
      contactType,
      contactValue,
      importance,
      section,
      size,
      categoriesSelected,
      publicId,
    });
  };

  return (
    <section className={s.container} onSubmit={handleSubmit}>
      <form className={s.formLogin}>
        <h4>{title}</h4>
        <UploadWidget setPublicId={setPublicId} />
        <AdvancedImage cldImg={myImage} />
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
          value={categoriesSelected}
          multiple
          required={required}
          onChange={handleCategories}
        >
          <option value="" disabled selected>
            Elija una categoria
          </option>
          {categories?.data.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <div>
          Define un medio de contacto
          <select name="contactType" id="contactType">
            <option value="" disabled selected>
              Tipo de contacto
            </option>
            {contacts?.data.map((ct) => (
              <option value={ct.type}>{ct.type}</option>
            ))}
          </select>
          escriba el contacto
          <input type="text" name="contactValue" />
        </div>
        <button type="submit" name="login">
          Crear
        </button>
        <p className={s.err}>{err ? err : ""}</p>
      </form>
    </section>
  );
}