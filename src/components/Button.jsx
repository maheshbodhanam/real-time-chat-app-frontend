import React from "react";

const Button = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 font-semibold rounded-lg focus:outline-none transition-all duration-200";

  const variantStyles = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    disabled: "bg-gray-400 text-gray-200 cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={variant === "disabled"}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
