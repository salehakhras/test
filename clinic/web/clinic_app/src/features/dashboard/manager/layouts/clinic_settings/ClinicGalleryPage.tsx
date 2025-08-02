import { useEffect, useRef } from "react";
import Card from "../../../../../components/specific/dashboard/Card";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import { getClinicImages } from "../../slices/clinicSettingsThunk";
import { useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import UploadImageModal from "../../component/clinic_settings/UploadImageModal ";
import GalleryImage from "../../component/clinic_settings/GalleryImage";
import { t } from "i18next";

const ClinicGalleryPage = () => {
  const hasFetched = useRef(false);
  const { clinicId } = useParams<{ clinicId: string }>();
  const { images } = useAppSelector((state) => state.clinic_info);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenUploadModal = () => {
    const modal = modalRef.current;
    if (modal) {
      if (modal.open) {
        modal.close(); // Ensure it's reset before opening again
      }
      modal.showModal();
    }
  };
  useEffect(() => {
    console.log("clinic id", clinicId, "images", images, hasFetched.current);
    if (!hasFetched.current && clinicId) {
      hasFetched.current = true;
      dispatch(getClinicImages({ clinic_id: Number(clinicId) }));
    }
  }, [clinicId, dispatch, images]);

  return (
    <div className="">
      <Card
        width="w-full"
        title={t("gallery")}
        className="shadow-none lg:shadow-md min-h-screen lg:min-h-fit lg:h-fit"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            onClick={handleOpenUploadModal}
            className="shadow-md aspect-square bg-base-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-500/50 transition"
          >
            <IoMdAdd className="text-4xl text-gray-600" />
          </div>
          {images.map((image) => {
            return <GalleryImage key={image.id} image={image} />;
          })}
        </div>
      </Card>
      {/* Upload Modal */}

      <UploadImageModal ref={modalRef} clinicId={Number(clinicId)} />
    </div>
  );
};

export default ClinicGalleryPage;
