import { useEffect } from "react";

interface UseModalProps {
  isOpen:  boolean;
  onClose: () => void;
}

const useModal = ({ isOpen, onClose }: UseModalProps) => {

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
};

export default useModal;