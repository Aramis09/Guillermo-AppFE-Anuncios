import PostCard from "../../components/postCard/postCard";
import { ResponseGetPosts } from "../../interfaces/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
// import s from "./home.module.scss";
import s from "./prube.module.scss";

import useLoaderManage from "../../hooks/useLoader";
import { useGetPostListQuery } from "../../redux/services/apiPost";
import { useEffect, useState } from "react";
import Categories from "../../components/categories/categories";
import { useLocation } from "react-router-dom";
import { buildSectionName } from "./utils/buildSectionName";
import { algo } from "./algo";

export default function Home() {
  const { pathname } = useLocation();
  const { setLoaderStatus, LoaderAllViewport } = useLoaderManage({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<ResponseGetPosts>();
  const [categorySelected, setCategorySelected] = useState<string[]>([]);

  const { isSuccess, data: newData } = useGetPostListQuery({
    url: `/posting`,
    urlCategories: `/posting/getListFiltered`,
    page: currentPage,
    categories: categorySelected,
    section: buildSectionName(pathname),
  });

  if (!posts) setPosts(algo);

  // useEffect(() => {
  //   if (currentPage === 1 && newData?.currentPage === 1)
  //     return setPosts(newData);
  //   if (
  //     newData &&
  //     newData.data.length !== 0 &&
  //     newData.currentPage !== currentPage &&
  //     newData.currentPage > currentPage
  //   ) {
  //     setPosts(
  //       (prev) =>
  //         prev && {
  //           ...newData,
  //           data: [...prev.data, ...newData.data],
  //         }
  //     );
  //   }
  // }, [newData, currentPage, isSuccess]);

  const hanlderMoreDataScroll = async () => {
    if (posts?.pages === currentPage) return; //! there is no more pages to render.
    setLoaderStatus(true);
    setTimeout(() => {
      posts && setCurrentPage(posts.nextPage);
    }, 210);
  };

  const handlerChangeCategory = ({
    categorySelected,
  }: {
    categorySelected: string;
  }) => {
    setPosts(undefined);
    setCategorySelected(() => [categorySelected]);
  };

  if (!posts)
    return (
      <>
        <Categories onClick={handlerChangeCategory} />
        Error ...
      </>
    );
  if (!posts.data.length)
    return (
      <>
        <Categories onClick={handlerChangeCategory} />
        No hay anuncios para esta categoria...
      </>
    );
  return (
    <div className={s.container}>
      <Categories onClick={handlerChangeCategory} />
      <InfiniteScroll
        dataLength={posts.data.length} //This is important field to render the next data
        next={hanlderMoreDataScroll}
        hasMore={true}
        loader={LoaderAllViewport}
        className={s.infiniteScroll}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No hay mas anuncios !!</b>
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
