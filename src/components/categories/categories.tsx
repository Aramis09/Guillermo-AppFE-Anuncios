import s from "./categories.module.scss";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { ResponseGetAllCategories } from "../../interfaces/interfaces";
import { useEffect } from "react";

interface Props {
  positionCoordinates?: string;
  onClick: ({ categorySelected }: { categorySelected: string }) => void;
}

export default function Categories({ onClick }: Props) {
  const categorySelectedFound = localStorage.getItem("categorySelected");
  const { result: categories } = useMakeRequest<ResponseGetAllCategories>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/category`,
  });

  const handleCategoriesSelected = async (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    localStorage.setItem("categorySelected", evt.target.value);
    onClick({ categorySelected: evt.target.value });
  };

  useEffect(() => {
    //!Borra lo guardado en el localStorage para que cuando el usuario salga esto se borre.
    return () => {
      localStorage.removeItem("categorySelected");
    };
  }, []);
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
        <option value="delete">Sin filtro</option>
        {categories?.data.map((category) => (
          <option
            key={category.id}
            value={category.name}
            style={
              categorySelectedFound === category.name
                ? {
                    backgroundColor: "#136fc6",
                    color: "white",
                  }
                : undefined
            }
          >
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
}
