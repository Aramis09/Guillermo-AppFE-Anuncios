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

export default function Home() {
  const { pathname } = useLocation();
  const { setLoaderStatus, loaderStatus, LoaderAllViewport } = useLoaderManage(
    {}
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<ResponseGetPosts>();
  const [categorySelected, setCategorySelected] = useState<string[]>([]);

  const {
    isSuccess,
    data: newData,
    isFetching,
    isLoading,
  } = useGetPostListQuery({
    url: `/posting`,
    urlCategories: `/posting/getListFiltered`,
    page: currentPage,
    categories: categorySelected,
    section: buildSectionName(pathname),
  });

  useEffect(() => {
    if (currentPage === 1 && newData?.currentPage === 1)
      return setPosts(newData);
    if (
      newData &&
      newData.data.length !== 0 &&
      newData.currentPage !== currentPage &&
      newData.currentPage > currentPage
    ) {
      setPosts(
        (prev) =>
          prev && {
            ...newData,
            data: [...prev.data, ...newData.data],
          }
      );
    }
  }, [newData, currentPage, isSuccess]);

  const hanlderMoreDataScroll = async () => {
    if (posts?.pages === currentPage) return; //! there is no more pages to render.
    // setLoaderStatus(true);
    posts && setCurrentPage(posts.nextPage);
    // setTimeout(() => {
    // }, 210);
  };

  const handlerChangeCategory = ({
    categorySelected,
  }: {
    categorySelected: string;
  }) => {
    setLoaderStatus(true);
    if (categorySelected === "delete") {
      return setCategorySelected(() => []);
    }
    setPosts(undefined);
    setCategorySelected(() => [categorySelected]);
  };

  if (isFetching || isLoading) {
    if (!loaderStatus) {
      setLoaderStatus(true);
    }
  }

  if (!posts)
    return (
      <>
        <Categories onClick={handlerChangeCategory} />
        {LoaderAllViewport}
        Error ...
      </>
    );
  if (!posts.data.length)
    return (
      <>
        <Categories onClick={handlerChangeCategory} />
        {LoaderAllViewport}
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
