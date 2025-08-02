import { BsThreeDotsVertical } from "react-icons/bs";
import { AppLink } from "../../../../../AppLink";
import { useAppDispatch } from "../../../../../hooks/hooks";
import { deleteClinicImage } from "../../slices/clinicSettingsThunk";
import type { imagesModel } from "../../schemas/clinicImagesSchema";
import { t } from "i18next";

interface GalleryImageProps {
  image: imagesModel;
}

const GalleryImage = ({ image }: GalleryImageProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteImage = () => {
    dispatch(deleteClinicImage({ image_id: image.id }));
    console.log("deleting image ", image.id);
  };

  return (
    <div
      key={image.id}
      className="aspect-square overflow-hidden rounded-lg relative shadow-md group"
    >
      <img
        src={`${AppLink.images}/${image.path}`}
        alt="Clinic"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />

      {/* Dropdown trigger */}
      <div className="dropdown dropdown-hover absolute top-1 right-1 z-20">
        <button
          tabIndex={0}
          role="button"
          className="btn btn-xs text-white bg-gray-400/30 border-none shadow-none opacity-0 group-hover:opacity-100"
        >
          <BsThreeDotsVertical />
        </button>

        {/* Dropdown menu */}
        <ul
          tabIndex={0}
          className="dropdown-content menu absolute right-0 mt-1 bg-white shadow-lg rounded-md text-sm overflow-hidden border border-gray-200 z-30"
        >
          <li>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() =>
                window.open(`${AppLink.images}/${image.path}`, "_blank")
              }
            >
              {t("view")}
            </button>
          </li>
          <li>
            <button
              className="block w-full text-left px-4 py-2 text-error hover:bg-red-50"
              onClick={handleDeleteImage}
            >
             {t("delete")}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GalleryImage;
