import PostCard from "../../components/postCard/postCard";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { ResponseGetPosts } from "../../interfaces/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
// import s from "./home.module.scss";
import s from "./prube.module.scss";

import useLoaderManage from "../../hooks/useLoader";
// import { useLocation } from "react-router-dom";

export default function Home() {
  // const location = useLocation().pathname;
  const { setLoaderStatus, LoaderAllViewport } = useLoaderManage({});
  const { result: posts, setResult } = useMakeRequest<ResponseGetPosts>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/posting`,
  });

  const hanlderMoreDataScroll = async () => {
    setLoaderStatus(true);
    const newData: ResponseGetPosts = await fetch(
      `${import.meta.env.VITE_SOME_BASE_URL}/posting?page=${posts?.nextPage}`
    ).then((res) => res.json());
    setResult((prev) => {
      if (prev) {
        const newDataAdded = [...prev.data, ...newData.data];
        newData.data = newDataAdded;
        return newData;
      }
    });
  };

  if (!posts || !posts.data) return <> Error ...</>;

  return (
    <div className={s.container}>
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

// const urlSelectedByLocation = (
//   pathname: string,
//   page: number | undefined = 1
// ) => {
//   const base = `${import.meta.env.VITE_SOME_BASE_URL}`;
//   if ("/" === pathname) {
//     return `${base}/posting?&page=${page}`;
//   }
//   if ("/events" === pathname) {
//     return `${base}/posting?section=Events&page=${page}`;
//   }
//   if ("/useful-info" === pathname) {
//     console.log("entreeee");
//     return `${base}/posting?section=Useful%20Information&page=${page}`;
//   }
//   return base + "posting";
// };
