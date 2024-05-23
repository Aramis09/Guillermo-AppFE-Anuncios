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
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setCategorySelected as setGlobalCategorySelected } from "../../redux/features/postSlice"; //?Esto unicamente sirve para que cuendo se seleccione una categoria no se muestre una seccion resaltada en navbar, ya que se busca en todas.
import { StaticLoader } from "../../components/loader/loader";

export default function Home() {
  const { pathname } = useLocation();
  const dispatchAction = useAppDispatch();
  const contextLoader = useContextLoader();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<ResponseGetPosts>();
  const { categorySelected } = useAppSelector((state) => state.post);

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
    if (newData && newData.data.length !== 0) {
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
      return dispatchAction(setGlobalCategorySelected([]));
    }
    setCurrentPage(1); //!reiniciamos la page asi el useEffect  de arriba cargue los nuevos archivos
    dispatchAction(setGlobalCategorySelected([categorySelected])); //?Esto unicamente sirve para que cuendo se seleccione una categoria no se muestre una seccion resaltada en navbar, ya que se busca en todas.
  };
  console.log(isError);

  if (!posts && isError)
    return (
      <>
        <Categories
          onClick={handlerChangeCategory}
          valueSelected={categorySelected[0]}
        />
        <Error />
      </>
    );
  if (!posts) {
    return <StaticLoader />;
  }
  if (posts && !posts.data.length)
    return (
      <>
        <Categories
          onClick={handlerChangeCategory}
          valueSelected={categorySelected[0]}
        />
        <Empty />
      </>
    );

  console.log(
    "No entiendo porque no se muestra correctamente >-->",
    categorySelected
  );

  return (
    <div className={s.container}>
      <Categories
        onClick={handlerChangeCategory}
        valueSelected={categorySelected[0]}
      />
      {categorySelected.length ? (
        <p className={s.warningCategory}>
          Resultados de categoria <b>{categorySelected[0]}</b> de todas las
          secciones
        </p>
      ) : (
        <></>
      )}
      <InfiniteScroll
        dataLength={posts.data.length} //! This is important field to render the next data
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
