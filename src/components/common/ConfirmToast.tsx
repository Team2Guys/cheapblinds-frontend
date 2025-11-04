import { toast } from "react-toastify";

interface ConfirmToastProps {
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmToast = ({
  onConfirm,
  onCancel,
  message = "You have unsaved changes. Do you want to discard them?",
  confirmText = "Discard",
  cancelText = "Cancel",
}: ConfirmToastProps) => {
  toast.info(
    <div className="flex flex-col gap-2 items-start">
      <p>{message}</p>
      <div className="flex gap-2 justify-end mt-2 self-end">
        <button
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
        >
          {confirmText}
        </button>
        <button
          onClick={() => {
            toast.dismiss();
            onCancel();
          }}
          className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 cursor-pointer"
        >
          {cancelText}
        </button>
      </div>
    </div>,
    {
      autoClose: false,
      closeOnClick: false,
      position: "top-center",
    }
  );
};
