import toast from "react-hot-toast";

// Success toast
export const showSuccess = (message: string) => {
  toast.success(message);
};

// Error toast
export const showError = (message: string) => {
  toast.error(message);
};

// Loading toast
export const showLoading = (message: string) => {
  return toast.loading(message);
};

// Custom toast
export const showToast = (message: string, type: "success" | "error" | "loading" = "success") => {
  switch (type) {
    case "success":
      return showSuccess(message);
    case "error":
      return showError(message);
    case "loading":
      return showLoading(message);
    default:
      return showSuccess(message);
  }
};

// Order-specific toast messages
export const orderToasts = {
  ready: (orderId: number) => showSuccess(`Order #${orderId} marked as ready!`),
  cancel: (orderId: number) => showSuccess(`Order #${orderId} cancelled successfully!`),
  readyError: (orderId: number) => showError(`Failed to mark order #${orderId} as ready`),
  cancelError: (orderId: number) => showError(`Failed to cancel order #${orderId}`),
  loading: (action: string) => showLoading(`${action} order...`),
};

// Item-specific toast messages
export const itemToasts = {
  available: (itemId: number) => showSuccess(`Item #${itemId} marked as Available!`),
  unavailable: (itemId: number) => showSuccess(`Item #${itemId} marked as Unavailable!`),
  unavailableError: (itemId: number) => showError(`Failed to mark item #${itemId} as Unavailable`),
  availableError: (itemId: number) => showError(`Failed to mark item #${itemId} as Available`),
  loading: (action: string) => showLoading(`${action} item...`),
};
// Dismiss toast
export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};
