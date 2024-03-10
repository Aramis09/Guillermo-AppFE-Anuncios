import s from "./postCard.module.scss";
import { PostDetail } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";

interface Props {
  postDetail: PostDetail;
}

export default function PostCard({ postDetail }: Props) {
  const [styleSize, setSyleSize] = useState<string>(s.size1);
  // const [multiply, setMultiply] = useState<number>(1);

  useEffect(() => {
    switch (postDetail.size.size) {
      case 1:
        setSyleSize(s.size1);
        // setMultiply(0.3);
        break;
      case 2:
        setSyleSize(s.size2);
        // setMultiply(0.35);

        break;
      case 3:
        setSyleSize(s.size3);
        // setMultiply(0.4);
        break;
      case 4:
        setSyleSize(s.size4);
        // setMultiply(0.6);
        break;
      default:
        setSyleSize(s.size1);
    }
  }, [postDetail.size.size]);
  return (
    <div
      className={styleSize}
      // style={{ width: window.innerWidth * 0.8 * multiply }}
    >
      {/* <h3 style={{ color: "white" }}>
        {postDetail.importance.importance} {postDetail.size.size}
      </h3> */}
      <img src={postDetail.img} alt="image" className={styleSize} />
    </div>
  );
}
