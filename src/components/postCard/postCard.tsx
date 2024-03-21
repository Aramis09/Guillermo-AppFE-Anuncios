// import s from "./postCard.module.scss";
import s from "./prueba.module.scss";

import { PostDetail } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";

interface Props {
  postDetail: PostDetail;
}

export default function PostCard({ postDetail }: Props) {
  const [styleSize, setSyleSize] = useState<string>(s.size1);
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_SOME_CLOUD_NAME,
    },
  });
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
  const myImage = cld.image(postDetail.img);
  const myImage2 = cld.image("qr6oes1yqlhsikzee3y2");

  console.log(myImage, "81237891287932189");

  return (
    <div className={styleSize}>
      {/* <h3 style={{ color: "black" }}>
        {postDetail.importance.importance} {postDetail.size.size}
      </h3> */}
      {/* <img src={postDetail.img} alt="image" className={styleSize} /> */}
      <AdvancedImage cldImg={myImage} alt="image" />
    </div>
  );
}
