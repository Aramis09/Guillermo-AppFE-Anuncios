import s from "./searchPost.module.scss";
import iconSearch from "../../assets/icons/searchLens.svg";
import { useSearchPostByOwnerQuery } from "../../redux/services/apiPost";
import { useState } from "react";
import PostCard from "../../components/postCard/postCard";

export default function SearchPost() {
  const [owner, setOwner] = useState("");
  const {
    data: postList,
    isFetching,
    isLoading,
    isSuccess,
  } = useSearchPostByOwnerQuery({ owner });

  return (
    <div className={s.container}>
      <div className={s.containerSearch}>
        <input
          type="text"
          placeholder="Nombre de propietario"
          onChange={(evt) => setOwner(evt.target.value)}
        />
        <img src={iconSearch} alt="iconSearch" />
      </div>

      {isFetching || isLoading ? <>Cargando ...</> : <></>}

      {isSuccess && postList.data.length !== 0 ? (
        <div className={s.containerData}>
          {postList?.data.map((post) => (
            <div className={s.containerCard} key={crypto.randomUUID()}>
              <h5>{post.owner}</h5>
              <PostCard postDetail={post} />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
