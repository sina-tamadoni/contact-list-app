import "./Toast.css";
import { useEffect } from "react";

function Toast({ toast, setToast, selectedImage, isToast, setIsToast }) {
  useEffect(() => {
    setTimeout(() => {
      setToast(null);
      setIsToast(false);
    }, 5000);
  }, [toast]);

  return (
    <div className={`toast-container ${isToast && "toast-container__active"}`}>
      {selectedImage && <img src={selectedImage} alt="" />}
      {toast}
    </div>
  );
}

export default Toast;
