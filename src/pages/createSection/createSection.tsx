import s from "./createSection.module.scss";
import CreateSomething from "../../components/createSomething/createSomething";
import { useMakeRequest } from "../../hooks/useMakeRequest";

export default function CreateSection() {
  const { makeNewRequest } = useMakeRequest({});

  const handleSaveItem = async (listItems: string[]) => {

    const returnMsg = await makeNewRequest({
      url: `${import.meta.env.VITE_SOME_BASE_URL}/section`,
      method: "POST",
      body:{
        sections:listItems
      }
    });
  };

  return (
    <div className={s.container}>
      <div className={s.containerForm}>
        <CreateSomething onClickSave={handleSaveItem} />
      </div>
    </div>
  );
}
