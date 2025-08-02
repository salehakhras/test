import { t } from "i18next";
import type { Clinic } from "../../schemas/clinicInfoSchema";
import EditButton from "../../../../../components/specific/dashboard/EditButton";
import OpenModal from "../../../../../components/specific/dashboard/OpenModal";
import InputField from "../../../../../components/common/InputField";
import Button from "../../../../../components/common/button/button";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useEditClinic } from "../../hooks/useEditClinic";

interface EditClinicInfoModalProps {
  clinicData: Clinic;
}

const EditClinicInfoModal = ({ clinicData }: EditClinicInfoModalProps) => {
  const {
    errors,
    updateField,
    handleOpenModal,
    onSubmit,
    editedData,
    hasChanges,
  } = useEditClinic(clinicData, "edit_clinic_info_modal");

  return (
    <>
      <EditButton onClick={handleOpenModal} />
      <OpenModal
        id="edit_clinic_info_modal"
        title={`${t("edit")} ${t("create_clinic.clinic_info")}`}
        modalButton={
          <Button
            title={t("submit")}
            isPrimary={true}
            isWidthFull={false}
            onClick={onSubmit}
            isDisabled={!hasChanges}
          ></Button>
        }
      >
        <div className="flex flex-col gap-2">
          <InputField
            labelName={t("credintals.name")}
            type={"text"}
            placeholder={""}
            Icon={MdDriveFileRenameOutline}
            onChange={updateField("name")}
            value={editedData.name ?? clinicData.name}
            error={errors.name}
          ></InputField>
          <InputField
            labelName={t("credintals.bio")}
            type={"text"}
            placeholder={""}
            onChange={updateField("bio")}
            value={editedData.bio ?? clinicData.bio}
            error={errors.bio}
            isTextArea={true}
          ></InputField>
        </div>
      </OpenModal>
    </>
  );
};

export default EditClinicInfoModal;
