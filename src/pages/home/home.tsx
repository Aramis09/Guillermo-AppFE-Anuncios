import PostCard from "../../components/postCard/postCard";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { ResponseGetPosts } from "../../interfaces/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import s from "./home.module.scss";
import useLoaderManage from "../../hooks/useLoader";

export default function Home() {
  const { setLoaderStatus, LoaderAllViewport } = useLoaderManage({});
  const { result: posts, setResult } = useMakeRequest<ResponseGetPosts>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/posting`,
  });

  const hanlderMoreDataScroll = async () => {
    console.log("entre");
    setLoaderStatus(true);
    const newData: ResponseGetPosts = await fetch(
      `${import.meta.env.VITE_SOME_BASE_URL}/posting?page=${posts?.nextPage}`
    ).then((res) => res.json());
    console.log(newData);
    setResult((prev) => {
      if (prev) {
        const newDataAdded = [...prev.data, ...newData.data];
        newData.data = newDataAdded;
        return newData;
      }
    });
  };

  if (!posts || !posts.data) return <>Error ...</>;

  return (
    <div className={s.container}>
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
            <PostCard postDetail={post} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
