import React from "react";

const InputField = ({
  type = "text",
  className = "",
  placeholder = "",
  label = "",
  error = "",
  value,
  onChange,
  onBlur,
  name,
  iconSrc, // Pass an image source
  rows = 4, // Default rows for textarea
  ...props
}) => {
  const numberStyles =
    type === "number"
      ? "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
      : "";

  // Prevent negative numbers
  const preventNegativeInput = (e) => {
    if (e.key === "-" || e.key === "e") {
      e.preventDefault();
    }
  };

  const commonStyles = `px-4 py-2 border border-[rgba(0,0,0,0.1)] rounded-[8px] w-full focus:ring-1 focus:ring-[#CC0202] outline-none ${
    iconSrc ? "pr-10" : ""
  } ${className} ${error ? "border-1 border-[#cc0202]" : ""}`;

  return (
    <div className="w-full relative">
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <div className="relative w-full">
        {type === "textarea" ? (
          <textarea
            name={name}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            className={`${commonStyles} resize-none`} // Prevent manual resizing
            {...props}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            min={type === "number" ? 0 : undefined}
            onKeyDown={type === "number" ? preventNegativeInput : undefined}
            className={`${commonStyles} ${numberStyles}`}
            placeholder={placeholder}
            {...props}
          />
        )}
        {iconSrc && type !== "textarea" && (
          <span className="absolute inset-y-0 right-3 flex items-center">
            <img src={iconSrc} alt="icon" className="w-5 h-5" />
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-[#cc0202]">{error}</p>}
    </div>
  );
};

export default InputField;
