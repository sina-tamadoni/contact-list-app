import { MainContext } from "../../App";
import "./Toast.css";
import { useContext, useEffect } from "react";

function Toast() {
  const { toast, setToast, selectedImage, isToast, setIsToast } =
    useContext(MainContext);
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
