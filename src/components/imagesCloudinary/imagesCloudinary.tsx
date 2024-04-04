import s from "./imagesCloudinary.module.scss";

import { useMakeRequest } from "../../hooks/useMakeRequest";
import { GetImagesFromCloudinary } from "../../interfaces/cloudinary";
import CardImage from "./cardImage/cardImage";

interface Props {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
}

export default function ImagesCloudinary({ setImage, image }: Props) {
  const { result, makeNewRequest } = useMakeRequest<GetImagesFromCloudinary>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/cloudinary/images`,
  });

  const hanlderDeleteImage = async (publicId: string): Promise<boolean> => {
    const confirm = window.confirm(
      "¿Estas seguro de que quieres borrar la imagen? Tenga en cuenta de que la borra de la nube para siempre y puede corremper un anuncio que la este usuando"
    );
    if (!confirm) return false;

    await makeNewRequest({
      method: "DELETE",
      url: `${
        import.meta.env.VITE_SOME_BASE_URL
      }/cloudinary/images?publicId=${publicId}`,
    });
    return true;
  };

  if (!result || !result.images) return <> No hay imagenes subidas </>;

  return (
    <div className={s.container}>
      {result?.images.resources.map((imageData) => (
        <CardImage
          imageData={imageData}
          onSelect={setImage}
          selectedPublicId={image}
          onDelete={hanlderDeleteImage}
        />
      ))}
    </div>
  );
}
