import { useState } from "react";
import s from "./create.module.scss";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import UploadWidget from "../../components/uploadImage/uploadImage";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { ResponseGetAllCategories } from "../../interfaces/interfaces";

export default function CreatePost() {
  const [publicId, setPublicId] = useState("");
  const [err, setErr] = useState<string | boolean>(false);

  const [categoriesSelected, setCategoriesSelected ] = useState<string[]>([])
  
  const { result:categories, makeNewRequest } = useMakeRequest<ResponseGetAllCategories>({
    url:`${import.meta.env.VITE_SOME_BASE_URL}/category`, 
  });

  const { result:sections } = useMakeRequest<ResponseGetAllCategories>({
    url:`${import.meta.env.VITE_SOME_BASE_URL}/section`, 
  });

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
   

    const importance = fields["importance"] as string;
    const size = fields["size"] as string;
    const section = fields["section"] as string;

    await makeNewRequest({
      method: "POST",
      url: `${import.meta.env.VITE_SOME_BASE_URL}/posting`,
      body: {
        size,
        importance,
        section,
        img: publicId,
        categories:categoriesSelected
      },
    });
  };

  const myImage = cld.image(publicId);

  const handleCategories = (evt:React.ChangeEvent<HTMLSelectElement>)=> {
    const options = evt.target.options;
    const currentIndexSelected = evt.target.selectedIndex;
    for (let i = 0; i < options.length; i++) {
      
      if (options[i].index === currentIndexSelected) {
        if(!categoriesSelected.includes(options[i].value)) {
          setCategoriesSelected(prev => [...prev,options[i].value]);
        }
       else { setCategoriesSelected(prev => {
          const newState = prev.filter(nameCat => nameCat !== options[i].value)
          return newState
        });
       }
      }
    }
    
  }

  return (
    <section className={s.container}>
      <form className={s.formLogin} onSubmit={handleSubmit}>
        <h4>Subir anuncio</h4>
        <UploadWidget setPublicId={setPublicId} />
        <AdvancedImage cldImg={myImage} />
        <select name="size" id="size" required>
          <option value="" disabled selected>
            Tamaño
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
        <select name="section" id="section" required>
          <option value="" disabled selected>
            Seccion
          </option>
          {sections?.data.map(sections => <option key={sections.id}  value={sections.name}>{sections.name}</option>)}
          
        </select>
        <select name="categories" id="categories" value={categoriesSelected} multiple required onChange={handleCategories}>
          <option value="" disabled selected>
            Categories
          </option>
          {categories?.data.map(category => <option key={category.id}  value={category.name}>{category.name}</option>)}
        </select>
        <button type="submit" name="login">
          Entrar
        </button>
        <p className={s.err}>{err ? err : ""}</p>
      </form>
    </section>
  );
}
