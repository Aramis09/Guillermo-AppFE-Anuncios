import PostCard from "../../components/postCard/postCard";
import { ResponseGetPosts } from "../../interfaces/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
// import s from "./home.module.scss";
import s from "./prube.module.scss";

import useLoaderManage from "../../hooks/useLoader";
import { useGetPostListQuery } from "../../redux/services/apiPost";
import { useEffect, useState } from "react";
import Categories from "../../components/categories/categories";

export default function Home() {
  const { setLoaderStatus, LoaderAllViewport } = useLoaderManage({});
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [posts, setPosts] = useState<ResponseGetPosts>()
  const [categorySelected, setCategorySelected] = useState<string[]>([])


  const { isSuccess, data: newData } = useGetPostListQuery({ url: `/posting`, urlCategories: `/posting/getListFiltered`, page: currentPage, categories: categorySelected })

  console.log(newData);

  useEffect(() => {
    if (currentPage === 1 && newData?.currentPage === 1) return setPosts(newData);
    if (newData && newData.data.length !== 0 && newData.currentPage !== currentPage && newData.currentPage > currentPage) {
      console.log(`paginaReq:${newData.currentPage}`, `pagina:${currentPage}`, newData.data, categorySelected);
      setPosts(
        prev => prev && ({
          ...newData,
          data: [...prev.data, ...newData.data]
        })
      )

    }
  }, [newData, currentPage, isSuccess])


  const hanlderMoreDataScroll = async () => {
    if (posts?.pages === currentPage) return //! there is not more pages to render.
    setLoaderStatus(true);
    setTimeout(() => {
      posts && setCurrentPage(posts.nextPage)
    }, 210);

  };

  const handlerChangeCategory = ({ categorySelected }: { categorySelected: string }) => {
    setPosts(undefined);
    setCategorySelected([categorySelected]);
  }
  if (!posts || !posts.data) return <>
    <Categories onClick={handlerChangeCategory} />
    Error ...
  </>;

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

