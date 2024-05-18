import s from "./selectMultipleOption.module.scss";
import { CategoryDetail } from "../../interfaces/interfaces";
import { useState } from "react";
import { isCategorySelected } from "../../utils/funciontUtils";

interface Props {
  options?: CategoryDetail[];
  onlyMobile?: boolean;
  placeHolder?: string;
  onClickOption: (name: string) => void;
  listSelected: string[];
}

export default function SelectMultipleOption({
  options,
  onlyMobile,
  placeHolder,
  onClickOption,
  listSelected,
}: Props) {
  const [showList, setShowList] = useState(false);
  const hanlderOpenList = () => {
    setShowList(!showList);
  };

  if (onlyMobile && window.innerWidth > 1024) return <></>;
  return (
    <div className={s.container}>
      <div onClick={hanlderOpenList} className={s.placeHolder}>
        {placeHolder}
      </div>

      <div
        className={s.list}
        style={
          showList
            ? { opacity: 1, position: "static", transition: "all 0.2s" }
            : { opacity: 0, position: "fixed" }
        }
      >
        {options ? (
          options.map((option) => (
            <div
              key={crypto.randomUUID()}
              className={s.option}
              onClick={() => onClickOption(option.name)}
              style={
                isCategorySelected(listSelected, option.name)
                  ? {
                      color: "green",
                    }
                  : {}
              }
            >
              {`${option.name} ${
                isCategorySelected(listSelected, option.name) ? "✔" : ""
              } `}
            </div>
          ))
        ) : (
          <div key={crypto.randomUUID()} className={s.option}>
            No hay categorias
          </div>
        )}
      </div>
    </div>
  );
}
