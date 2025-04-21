import React, { useState } from "react";
import openeye from "../../assets/images/openeye.svg";
import closeeye from "../../assets/images/closeeye.svg";

const Passwordfield = ({ className = "", placeholder = "", error = "", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={showPassword ? "text" : "password"}
        className={`px-4 py-2 border border-[rgba(0,0,0,0.1)] rounded-[8px] w-[100%] focus:ring-2 focus:ring-[#CC0202] outline-none ${error ? "border-red-500" : ""}`}
        placeholder={placeholder}
        {...props}
      />
      <img
        src={showPassword ? closeeye : openeye}
        alt="Toggle Password Visibility"
        className="absolute right-[1rem] top-[2rem] transform -translate-y-2/2  cursor-pointer w-5 h-5"
        onClick={() => setShowPassword(!showPassword)}
      />
      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Passwordfield;
