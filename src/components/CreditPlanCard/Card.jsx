import React, { useState } from "react";
import { PiCoinBold } from "react-icons/pi";
import Btn from "../btn/Btn";
import PurchaseModal from "../Modal/PurchaseModal";
import useAuth from "../../hook/useAuth";

const Card = ({ credit, price }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const { user } = useAuth();
  const transactionInfo = {
    displayName: user?.displayName,
    email: user?.email,
    amount: price,
    credit: credit,
  };
  return (
    <div
      className={`card border-[3px] relative w-[280px] rounded-lg group mb-10 hover:hoverBtn:block transition-all  h-[360px]  border-[#BFACAC]  text-black`}
    >
      <div className="flex flex-col justify-center gap-5 h-full text-center">
        <p className="text-customGolden w-fit mx-auto">
          <PiCoinBold size={40} />
        </p>
        <h2 className="card-title text-primary font-inter font-extrabold text-5xl">
          {credit}
        </h2>
        <p className="font-bold text-2xl text-black">CREDITS</p>
        <p className="font-bold text-gray-600 text-3xl">R${price}.00</p>
      </div>
      <div className="mx-auto absolute opacity-100 transition-all -bottom-16 left-1/2 translate-x-[-50%]">
        <Btn
          label="Purchase"
          onClick={() => {
            setIsOpen(true);
          }}
          style={{
            background: "#00B812",
            width: "200px",
          }}
        />
      </div>
      <PurchaseModal
        closeModal={closeModal}
        isOpen={isOpen}
        transactionInfo={transactionInfo}
      />
    </div>
  );
};

export default Card;
