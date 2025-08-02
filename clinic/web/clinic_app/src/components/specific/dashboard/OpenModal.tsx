import type { Ref } from "react";

interface OpenModal {
  id: string;
  title: string;
  children: React.ReactNode;
  modalButton?: React.ReactNode;
  ref?: Ref<HTMLDialogElement>
}

const OpenModal = ({ id, title, children, modalButton, ref }: OpenModal) => {
  return (
    <dialog ref={ref} id={id} className="modal ">
      <div className="modal-box  bg-base-200 ">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        {children}
        <div className="modal-action">{modalButton}</div>
      </div>
    </dialog>
  );
};

export default OpenModal;
