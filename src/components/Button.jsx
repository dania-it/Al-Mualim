import React from "react";

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ...props
}) {
  const handleClick = (event) => {
    if (type !== "submit") {
      event.preventDefault();
    }

    if (disabled) {
      return;
    }

    if (typeof onClick === "function") {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}