import PostCard from "../../components/postCard/postCard";
import { ResponseGetPosts } from "../../interfaces/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import s from "./prube.module.scss";
import { useGetPostListQuery } from "../../redux/services/apiPost";
import { useEffect, useState } from "react";
import Categories from "../../components/categories/categories";
import { useLocation } from "react-router-dom";
import { buildSectionName } from "./utils/buildSectionName";
import { useContextLoader } from "../../contexts/hooks/useContextLoader";
import Error from "../../components/Error/error";
import Empty from "../../components/Empty/Empty";

export default function Home() {
  const { pathname } = useLocation();
  const contextLoader = useContextLoader();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<ResponseGetPosts>();
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const {
    isSuccess,
    data: newData,
    isError,
  } = useGetPostListQuery({
    url: `/posting`,
    urlCategories: `/posting/getListFiltered`,
    page: currentPage,
    categories: categorySelected,
    section: buildSectionName(pathname),
  });

  useEffect(() => {
    if (currentPage === 1 && newData?.currentPage === 1)
      //!Como el estado es undefines, entonces lo agregamos al primero como base, es necesario para  la primera request
      return setPosts(newData);
    if (
      newData &&
      newData.data.length !== 0
      // &&
      // newData.currentPage !== currentPage &&
      // newData.currentPage > currentPage
    ) {
      setPosts((prev) => {
        //!concatenamos con lo ya existente
        if (!prev) return;
        const dataFormated = newData.data.map((data) => {
          return { ...data, slowly: true };
        });

        return {
          ...newData,
          data: [...prev.data, ...dataFormated],
        };
      });
    }
  }, [newData, currentPage, isSuccess]);

  const hanlderMoreDataScroll = async () => {
    if (posts?.pages === currentPage) return; //! there is no more pages to render.
    setTimeout(() => {
      posts && setCurrentPage(posts.nextPage);
    }, 210);
  };

  const handlerChangeCategory = ({
    categorySelected,
  }: {
    categorySelected: string;
  }) => {
    contextLoader?.setLoaderStatus(true);
    if (categorySelected === "delete") {
      return setCategorySelected(() => []);
    }
    setPosts(undefined); //!Borramos los que ya hay
    setCurrentPage(1); //!reiniciamos la page asi el useEffect  de arriba cargue los nuevos archivos
    setCategorySelected(() => [categorySelected]); //! seteamos la categoria nueva
  };

  if (!posts || isError)
    return (
      <>
        <Categories onClick={handlerChangeCategory} />
        {/* {LoaderAllViewport} */}
        <Error />
      </>
    );
  if (!posts.data.length)
    return (
      <>
        <Categories onClick={handlerChangeCategory} />
        <Empty />
      </>
    );
  return (
    <div className={s.container}>
      <Categories onClick={handlerChangeCategory} />
      <InfiniteScroll
        dataLength={posts.data.length} //! ESTE ES EL ERROR NO LO TRAIGO SIEMPRE DEL BACCKENDThis is important field to render the next data
        next={hanlderMoreDataScroll}
        hasMore={true}
        scrollThreshold={0.7}
        loader={contextLoader?.LoaderAllViewport}
        className={s.infiniteScroll}
        endMessage={<Empty />}
      >
        <div className={s.containerData}>
          {posts?.data.map((post) => (
            <PostCard postDetail={post} key={crypto.randomUUID()} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
