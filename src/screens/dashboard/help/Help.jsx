import { useEffect, useState } from "react";
import Btn from "../../../components/btn/Btn";
import PaymentRow from "../../../components/dashboard/PaymentRow";
import HelpRow from "../../../components/dashboard/HelpRow";
import CustomizedSwitches from "../../../components/switch/ToggleSwitch";

const Payment = () => {
  const [loadedData, setLoadedData] = useState([]);
  useEffect(() => {
    fetch("/help.json")
      .then((res) => res.json())
      .then((data) => setLoadedData(data));
  }, []);
  return (
    <div className="flex">
      <div className="w-[65vw] px-4 font-inter  font-extrabold sm:px-8">
        <div className="py-8">
          <h2 className=" pl-44 flex-1 text-center text-5xl mb-6 font-inter">
            Help
          </h2>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="w-full flex items-center">
              <div className=" bg-[#D9D9D9] w-1/5  text-left  border-b py-3 pl-10  border-gray-200 text-gray-800   text-sm uppercase font-inter font-extrabold">
                Name
              </div>
              <div className=" bg-[#D9D9D9] w-1/5 xl:pl-14  text-left  border-b py-3  border-gray-200 text-gray-800   text-sm uppercase font-inter font-extrabold">
                ID
              </div>

              <div className=" bg-[#D9D9D9] w-1/5  text-left   border-b py-3 px-10  border-gray-200 text-gray-800   text-sm uppercase font-inter font-extrabold">
                Gives you
              </div>
              <div className=" bg-[#D9D9D9] w-1/5  text-center   2xl:pl-16 border-b py-3 px-4  border-gray-200 text-gray-800   text-sm uppercase font-inter font-extrabold">
                status
              </div>
              <div className=" bg-[#D9D9D9] w-1/5  text-center xl:pl-20  2xl:pl-32 border-b py-[25px] px-4  border-gray-200 text-gray-800   text-sm uppercase font-inter font-extrabold"></div>
            </div>

            {/* User data table row */}
            {loadedData?.map((data, index) => (
              <HelpRow help={data} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-[27vw] pt-10">
        <div className="border-primary p-3 border-2 w-5/6  rounded-2xl">
          <div className="flex justify-between items-center  px-1 mt-5">
            <div className=" border-gray-300 p-2 border w-full rounded-lg">
              <input type="date" name="" id="" />
            </div>
            <p className="px-2">ATÉ</p>
            <div className=" border-gray-300 p-2 border w-full rounded-lg">
              <input type="date" name="" id="" />
            </div>
          </div>
          <div className="text-center ml-8 mt-2">
            <CustomizedSwitches />
          </div>
          <div className="text-center mt-5">
            <button
              onClick={() => {
                setEffect(!effect);
                setFilter(true);
              }}
              className="btn text-white font-bold bg-primary w-24 py-2 rounded-[50px]"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
