import s from "./createCategory.module.scss";
import CreateSomething from "../../components/createSomething/createSomething";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { useNavigate } from "react-router-dom";

export default function CreateCategory() {
  const { makeNewRequest } = useMakeRequest({});
  const navigate = useNavigate();
  const handleSaveItem = async (listItems: string[]) => {
    await makeNewRequest({
      url: `${import.meta.env.VITE_SOME_BASE_URL}/category`,
      method: "POST",
      body: {
        categories: listItems,
      },
    })
      .then(() => {
        alert("La categoria fue creada!");
        navigate("/create");
      })
      .catch(() => alert("Hubo un error, contacte al desarrollador"));
  };

  return (
    <div className={s.container}>
      <div className={s.containerForm}>
        <CreateSomething onClickSave={handleSaveItem} />
      </div>
    </div>
  );
}
