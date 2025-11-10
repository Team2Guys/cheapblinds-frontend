import { toast } from "react-toastify";

export const Toaster = (
  type: "success" | "error" | "warning",
  message: string,
  position: "top-right" | "top-center" | "bottom-right" | "bottom-center" = "top-right",
) => {
  if (type === "success") {
    toast.success(message, { position });
  } else if (type === "error") {
    toast.error(message, { position });
  } else if (type === "warning") {
    toast.warning(message, { position });
  }
};
