import { createContext, useEffect, useState } from "react";
import { ResultCloudinary } from "../../interfaces/cloudinary";

interface Props {
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
}

// Create a context to manage the script loading state
// @ts-expect-error no se puede tipar bien

const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ setPublicId }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      // @ts-expect-error no se puede tipar bien
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_SOME_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_SOME_UPLOAD_PRESET,
          // cropping: true, //add a cropping step
          // showAdvancedOptions: true,  //add advanced options (public_id and tag)
          // sources: [ "local", "url"], // restrict the upload sources to URL and local files
          // multiple: false,  //restrict upload to a single file
          // folder: "user_images", //upload files to the specified folder
          // tags: ["users", "profile"], //add the given tags to the uploaded files
          // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
          // clientAllowedFormats: ["images"], //restrict uploading to image files only
          // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
          // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
          // theme: "purple", //change to a purple theme
        },
        (error: unknown, result: ResultCloudinary) => {
          if (!error && result && result.event === "success") {
            setPublicId(result.info.public_id);
          }
        }
      );
      // @ts-expect-error no se puede tipar bien

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
        type="button"
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
