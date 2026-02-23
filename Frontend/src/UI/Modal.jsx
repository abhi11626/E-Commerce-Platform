import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className="modal rounded-lg shadow-2xl"
      onClose={onClose}
      style={{
        backgroundColor: "black",
        border: "none",
        padding: 0,
      }}
    >
      <div>{children}</div>
    </dialog>,
    document.getElementById("modal"),
  );
}
