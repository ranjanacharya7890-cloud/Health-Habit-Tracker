// Toast is a slide-up notification for user feedback after actions like saving or deleting.
// It auto-dismisses after 2.5 seconds by calling onClose from a useEffect timer.

import { useEffect } from "react";
import styles from "./Toast.module.css";

// Typing the props — message and type are both strings, onClose is a void function
interface ToastProps {
  message: string;
  type?: "success" | "error"; // optional — defaults to "success"
  onClose: () => void;
}

function Toast({ message, type = "success", onClose }: ToastProps) {
  // Setting a timer to auto-close the toast after 2.5 seconds.
  // The cleanup function cancels the timer if the component unmounts early.
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  // Not rendering anything if there is no message
  if (!message) return null;

  return (
    <div className={`${styles.toast} ${type === "error" ? styles.error : styles.success}`}>
      {/* Coloured dot indicating success (green) or error (red) */}
      <div className={styles.dot} />
      <span>{message}</span>
    </div>
  );
}

export default Toast;
