import React from "react";
import CloseIcon from "./CloseIcon";

interface AlertProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const getColor = () => {
    switch (type) {
      case "success":
        return "text-green-700 dark:text-green-500 bg-secondary-50 dark:bg-black border-green-700 dark:border-green-500";
      case "error":
        return "text-red-700 dark:text-red-500 bg-secondary-50 dark:bg-black border-red-700 dark:border-red-600";
      case "info":
        return "text-primary-800 dark:text-primary-500 bg-secondary-50 dark:bg-black border-primary-700 dark:border-primary-600";
      default:
        return "";
    }
  };

  return (
    <div
      className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 p-4 mb-4 text-sm md:text-base transition-all duration-300 ease-in-out ${getColor()} rounded-lg border shadow-lg max-w-lg w-full mx-auto flex justify-between items-center`}
      role="alert"
      style={{ animation: "fadeIn 0.5s" }}
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-lg leading-none font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Alert;
