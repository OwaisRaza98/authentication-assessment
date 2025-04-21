import React from "react";

const Button = ({
  className,
  type = "submit",
  buttonText,
  color = "red",
  width = "",
  onClick,
  iconSrc,
  iconAlt = "icon",
  iconClassName = "",
  loading = false,
  loadingText = "Processing...", 
  ...props
}) => {
  const isRed = color === "red";

  return (
    <button
      disabled={loading}
      className={`flex items-center justify-center gap-2 py-[5px] h-[40px] border-1 rounded-[6px] font-medium transition duration-300 ease-in-out px-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
        isRed
          ? "bg-[#CC0202] text-white border-[#CC0202] hover:bg-[#b50000] hover:border-[#b50000]"
          : "bg-white text-black border-[#262626] hover:bg-[#CC0202] hover:text-white hover:border-[#CC0202]"
      } ${className}`}
      style={{ width, boxSizing: "border-box" }}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>{loadingText}</span> 
        </>
      ) : (
        <>
          {iconSrc && (
            <img
              src={iconSrc}
              alt={iconAlt}
              className={`w-5 h-5 ${iconClassName}`}
            />
          )}
          {buttonText}
        </>
      )}
    </button>
  );
};

export default Button;
