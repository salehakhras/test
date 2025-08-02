import { MdEdit } from "react-icons/md";
import Button from "../../common/button/button";
import { t } from "i18next";

interface EditButton {
  onClick?: (event: React.FormEvent) => void;
}

const EditButton = ({ onClick }: EditButton) => {
  return (
    <Button title={t("edit")} onClick={onClick} color="bg-base-300" Icon={MdEdit} />
  );
};

export default EditButton;
