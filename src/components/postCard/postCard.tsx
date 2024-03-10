import s from "./postCard.module.scss";
import { PostDetail } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";

interface Props {
  postDetail: PostDetail;
}

export default function PostCard({ postDetail }: Props) {
  const [styleSize, setSyleSize] = useState<string>(s.size1);

  useEffect(() => {
    switch (postDetail.size.size) {
      case 1:
        setSyleSize(s.size1);
        break;
      case 2:
        setSyleSize(s.size2);
        break;
      case 3:
        setSyleSize(s.size3);
        break;
      case 4:
        setSyleSize(s.size4);
        break;
      default:
        setSyleSize(s.size1);
    }
  }, [postDetail.size.size]);
  return (
    <div className={styleSize}>
      <h3 style={{ color: "white" }}>
        {postDetail.importance.importance} {postDetail.size.size}
      </h3>
      <img src={postDetail.img} alt="image" className={styleSize} />
      {/* <h6>{postDetail.title}</h6>
      <p className={s.descrption}>{postDetail.description}</p>
      <p className={s.phone}>{postDetail.number_phone}</p> */}
    </div>
  );
}
