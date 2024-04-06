import s from "./categories.module.scss";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { ResponseGetAllCategories } from "../../interfaces/interfaces";
import useLoaderManage from "../../hooks/useLoader";

interface Props {
  positionCoordinates?: string;
  onClick: ({ categorySelected }: { categorySelected: string }) => void;
}

export default function Categories({ onClick }: Props) {
  const { result: categories } = useMakeRequest<ResponseGetAllCategories>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/category`,
  });

  const { setLoaderStatus, LoaderAllViewport } = useLoaderManage({
    turnOnInitSinglePage: true,
  });

  const handleCategoriesSelected = async (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLoaderStatus(true);
    onClick({ categorySelected: evt.target.value });
  };

  return (
    <>
      <select
        name="categories"
        id="categories"
        required
        onChange={handleCategoriesSelected}
        className={s.container}
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
      {LoaderAllViewport}
    </>
  );
}
