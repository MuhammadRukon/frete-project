import React from "react";
import "./Btn.css";

export default function Btn({
  type,
  label,
  onClick,
  className,
  style,
  icon,
  afterIcon,
  isDisabled,
}) {
  return (
    <button
   disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={className ?? "button"}
      style={style}
    >
      {icon}
      {label}
      {afterIcon}
    </button>
  );
}
