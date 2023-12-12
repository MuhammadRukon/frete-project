import { useEffect, useState } from "react";

import Btn from "../../../components/btn/Btn";
import PaymentRow from "../../../components/dashboard/PaymentRow";
import { getAllPayments } from "../../../firebaseService";

import moment from "moment";

const Payment = () => {
  const [loadedData, setLoadedData] = useState([]);
  const [overAllData, setOverAllData] = useState([]);
  const balance = overAllData?.reduce((acc, data) => acc + data?.amount, 0);
  const [filter, setFilter] = useState(false);
  const [filterDate, setFilterDate] = useState({});
  const [effect, setEffect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const datas = await getAllPayments();
      setOverAllData(datas);
      if (filterDate?.from && filterDate?.to) {
        const filtered = datas.filter(
          (data) => data.date >= filterDate.from && data.date <= filterDate.to
        );
        console.log(filtered, "filtered");
        setLoadedData(filtered);
      } else {
        setLoadedData(datas);
      }
    };

    fetchData();
  }, [effect, filter]);

  console.log(filterDate);
  return (
    <div className="flex">
      <div className="w-[65vw] px-4 font-inter  font-extrabold sm:px-8">
        <div className="py-8">
          <h2 className=" pl-44 flex-1 text-center text-5xl mb-6 font-inter">
            Payment
          </h2>
          <div className="flex w-full justify-between items-center border p-4 rounded-xl ">
            <div className="text-5xl font-inter tracking-tighter font-extrabold">
              Balance: {balance} R$
            </div>
            <Btn
              label="Withdraw"
              onClick={() => {
                setOpenModal(true);
                fetchOrderDetails(o?.id); // Fetch the order details when the button is clicked
              }}
              style={{
                background: "#00B812",
                width: "153px",
                borderRadius: "50px",
              }}
            />
          </div>
          <div className="flex justify-between mt-14">
            <h2 className="text-left flex-1  text-4xl mb-6">Last Payment</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="w-full flex items-center">
              <div className="  w-1/4 text-left   py-3 pl-10  border-gray-200 text-gray-800   text-sm uppercase font-inter font-extrabold">
                Name
              </div>
              <div className="  w-1/4 xl:pr-14  text-center   py-3  border-gray-200 text-gray-800   text-sm uppercase font-inter font-extrabold">
                gives you
              </div>

              <div className="   text-left    py-3 px-4  border-gray-200 text-gray-800   text-sm uppercase font-inter font-extrabold">
                Amount of credit
              </div>
              <div className="  flex-1 text-center xl:pl-20  2xl:pl-32  py-3 px-4  border-gray-200 text-gray-800   text-sm uppercase font-inter font-extrabold">
                Value
              </div>
            </div>

            {/* User data table row */}
            {loadedData?.map((data, index) => (
              <PaymentRow user={data} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-[27vw] pt-10">
        <div className="border-primary p-3 border-2 w-5/6  rounded-2xl">
          <div className="flex justify-between items-center  px-1 mt-5">
            <div className=" border-gray-300 p-2 border w-full rounded-lg">
              <input
                type="date"
                name=""
                id=""
                onChange={(e) =>
                  setFilterDate({
                    ...filterDate,
                    from: moment(e.target.value).format("MM-DD-yyyy"),
                  })
                }
              />
            </div>
            <p className="px-2">ATÉ</p>
            <div className=" border-gray-300 p-2 border w-full rounded-lg">
              <input
                type="date"
                name=""
                id=""
                onChange={(e) =>
                  setFilterDate({
                    ...filterDate,
                    to: moment(e.target.value).format("MM-DD-yyyy"),
                  })
                }
              />
            </div>
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
