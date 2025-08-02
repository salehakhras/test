import { forwardRef, useState } from "react";
import OpenModal from "../../../../../components/specific/dashboard/OpenModal";
import Button from "../../../../../components/common/button/button";
import { useAppDispatch } from "../../../../../hooks/hooks";
import { addClinicImage } from "../../slices/clinicSettingsThunk";
import { t } from "i18next";

const UploadImageModal = forwardRef<HTMLDialogElement, { clinicId: number }>(
  ({ clinicId }, ref) => {
    const dispatch = useAppDispatch();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleUpload = async () => {
      if (!selectedImage) return;
      try {
        const formData = new FormData();
        formData.append("image", selectedImage); // selectedFile is a File object
        formData.append("clinic_id", String(clinicId)); // include any other data if needed

        await dispatch(addClinicImage(formData));
        setSelectedImage(null);
        setPreviewImage(null);
        if (ref && typeof ref !== "function" && ref.current) {
          ref.current.close();
        }
      } catch (e) {
        console.log("error dispatch add image", e);
      }
    };

    return (
      <OpenModal
        ref={ref}
        id={"upload_image_modal"}
        title={t("upload_image")}
        modalButton={
          <Button
            title={t("upload")}
            isPrimary={true}
            isWidthFull={false}
            onClick={handleUpload}
            isDisabled={!previewImage}
          ></Button>
        }
      >
        <label
          htmlFor="image-upload"
          className={`h-64 w-full aspect-square border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
            previewImage ? "hidden" : "flex"
          }`}
        >
          <span className="text-gray-500 text-center px-4">
            {t("click_upload_image")}
          </span>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        {previewImage && (
          <div className="relative group">
            <img
              src={previewImage}
              alt="Uploaded"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              className="absolute top-2 right-2 btn btn-xs z-10 "
              onClick={() => {
                setSelectedImage(null);
                setPreviewImage(null);
              }}
            >
              X
            </button>
            <label
              htmlFor="image-upload"
              className="w-full absolute bottom-0 btn btn-sm bg-opacity-50 border-none shadow-md transition-all transform opacity-0 group-hover:opacity-50 scale-90 group-hover:scale-100"
            >
              {t("change_image")}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        )}
      </OpenModal>
    );
  }
);

export default UploadImageModal;
