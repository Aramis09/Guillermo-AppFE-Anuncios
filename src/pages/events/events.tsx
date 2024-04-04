import PostCard from "../../components/postCard/postCard";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { ResponseGetPosts } from "../../interfaces/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
// import s from "./home.module.scss";
import s from "../home/prube.module.scss";

import useLoaderManage from "../../hooks/useLoader";
import Categories from "../../components/categories/categories";
import { useState } from "react";

export default function Events() {
  const { setLoaderStatus, LoaderAllViewport } = useLoaderManage({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [posts, setPosts] = useState<ResponseGetPosts>();
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const {
    result: posts,
    setResult,
    makeNewRequest,
  } = useMakeRequest<ResponseGetPosts>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/posting?section=Events`,
  });

  const handlerChangeCategory = ({
    categorySelected,
  }: {
    categorySelected: string;
  }) => {
    setPosts(undefined);
    setCategorySelected([categorySelected]);
  };

  const hanlderMoreDataScroll = async () => {
    setLoaderStatus(true);

    const newData = await makeNewRequest<ResponseGetPosts>({
      url: `${import.meta.env.VITE_SOME_BASE_URL}/posting?section=Events&page=${
        posts?.nextPage
      }`,
    });

    setResult((prev) => {
      if (prev && newData) {
        const newDataAdded = [...prev.data, ...newData.data];
        newData.data = newDataAdded;
        return newData;
      }
    });
  };

  if (!posts || !posts.data) return <> Error ...</>;

  return (
    <div className={s.container}>
      <Categories positionCoordinates="" />
      <InfiniteScroll
        dataLength={posts.data.length} //This is important field to render the next data
        next={hanlderMoreDataScroll}
        hasMore={true}
        loader={LoaderAllViewport}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className={s.containerData}>
          {posts?.data.map((post) => (
            <PostCard postDetail={post} key={Math.random()} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
