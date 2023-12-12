import React, { useState } from "react";
import { PiCoinBold } from "react-icons/pi";
import Btn from "../btn/Btn";
import PurchaseModal from "../Modal/PurchaseModal";
import useAuth from "../../hook/useAuth";

const BestCard = ({ credit, price }) => {
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
    <div className="border-[5px] w-[350px]  relative transition-all rounded-xl  h-[450px]  border-primary  text-black">
      <div className="bg-customRed w-52 top-0 right-0 translate-x-[20%] translate-y-[20%] z-10 rotate-[35deg] text-white font-bold text-xl items-center flex justify-center h-12 absolute ">
        Best Seller
      </div>
      <div className="flex flex-col justify-center gap-5 h-full text-center">
        <div>
          <p className="text-customGolden w-fit mx-auto ">
            <PiCoinBold size={40} />
          </p>
        </div>
        <div>
          <h2 className=" text-primary font-inter font-extrabold text-5xl">
            {credit}
          </h2>
        </div>
        <div>
          <p className="font-bold text-2xl text-black">CREDITS</p>
        </div>
        <div>
          <p className="font-bold text-gray-600 text-3xl">R${price}.00</p>
        </div>
      </div>
      <div className="mx-auto absolute -bottom-16 left-1/2 translate-x-[-50%]">
        <Btn
          label="Purchase"
          onClick={() => {
            setIsOpen(true);
          }}
          style={{
            background: "#00B812",
            width: "300px",
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

export default BestCard;
