import React from "react";
import { NavLink } from "react-router-dom";
import { FaClipboardList, FaRegQuestionCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { TbCoinFilled } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className="absolute left-5 top-[150px]">
      <ul className="bg-[#FDFCF8] border px-3 py-7 h-[60vh] text-primary rounded-full border-[#BFC5DD] flex items-center flex-col gap-5">
        <NavLink to="active-orders">
          <FaClipboardList size={34} />
        </NavLink>
        <NavLink to="users">
          <FaUser size={34} />
        </NavLink>
        <NavLink to="payment">
          <TbCoinFilled size={36} />
        </NavLink>
        <NavLink to="help">
          <FaRegQuestionCircle size={32} />
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
