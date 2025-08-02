import { t } from "i18next";
import type { Clinic } from "../../schemas/clinicInfoSchema";
import EditButton from "../../../../../components/specific/dashboard/EditButton";
import OpenModal from "../../../../../components/specific/dashboard/OpenModal";
import InputField from "../../../../../components/common/InputField";
import Button from "../../../../../components/common/button/button";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useEditClinic } from "../../hooks/useEditClinic";

interface EditAddressAndContactModalProps {
  clinicData: Clinic;
}

const EditAddressAndContactModal = ({
  clinicData,
}: EditAddressAndContactModalProps) => {
  const {
    errors,
    updateField,
    handleOpenModal,
    onSubmit,
    editedData,
    hasChanges,
  } = useEditClinic(clinicData, "edit_address_contact_modal");

  return (
    <>
      <EditButton onClick={handleOpenModal} />
      <OpenModal
        id="edit_address_contact_modal"
        title={`${t("edit")} ${t("create_clinic.contact_address")}`}
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
            labelName={t("credintals.phone")}
            type={"tel"}
            placeholder={""}
            Icon={MdDriveFileRenameOutline}
            onChange={updateField("phone")}
            value={editedData.phone ?? clinicData.phone}
            error={errors.phone}
          ></InputField>
          <InputField
            labelName={t("credintals.city")}
            type={"text"}
            placeholder={""}
            Icon={MdDriveFileRenameOutline}
            onChange={updateField("city_name")}
            value={editedData.city_name ?? clinicData.city_name}
            error={errors.city_name}
          ></InputField>
          <InputField
            labelName={t("credintals.street")}
            type={"text"}
            placeholder={""}
            Icon={MdDriveFileRenameOutline}
            onChange={updateField("street_name")}
            value={editedData.street_name ?? clinicData.street_name}
            error={errors.street_name}
          ></InputField>
        </div>
      </OpenModal>
    </>
  );
};

export default EditAddressAndContactModal;
