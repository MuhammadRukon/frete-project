import React from "react";

const ToggleSwitch = ({ status, setChange }) => {
  const handleToggle = () => {
    console.log("toggled");
    const newStatus = status === "active" ? "inactive" : "active";
    setChange(newStatus);
  };

  return (
    <label className="flex items-center w-fit cursor-pointer">
      <div
        className={`relative block  w-14 h-8 rounded-full ${
          status === "active" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={status === "active"}
          onChange={handleToggle}
        />
        <div className=""></div>
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform ${
            status === "active" ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
