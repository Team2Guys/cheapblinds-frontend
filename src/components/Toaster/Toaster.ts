import { toast } from 'react-toastify';
type ToastMethod = 'success' | 'error' | 'info' | 'warn';
export default function showToast(ToastType: ToastMethod, message: string) {
  toast[ToastType](message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
}
