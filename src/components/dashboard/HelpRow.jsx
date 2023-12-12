import Btn from "../btn/Btn";
import CustomizedSwitches from "../switch/ToggleSwitch";
import ToggleSwitch from "../switch/ToggleSwitchNew";

const HelpRow = ({ help }) => {
  console.log(help);
  return (
    <div className="rounded-full overflow-hidden text-primary border-2 border-[#D9D9D9] mt-5 flex items-center">
      <div className="px-5 flex items-center gap-3  overflow-hidden py-[10px]  w-full font-inter  bg-white text-sm">
        <div className="w-10 rounded-full overflow-hidden h-10 bg-slate-400">
          <img className="" alt="" />
        </div>
        <p className="  whitespace-no-wrap font-inter font-bold">
          {help?.name}
        </p>
      </div>
      <div className="px-5 py-[10px] w-full font-inter ml-14 bg-white text-sm">
        <p className=" whitespace-no-wrap font-inter font-bold ">{help?.id}</p>
      </div>

      <div className="px-5 py-[10px] mr-14 w-full font-inter  bg-white text-sm">
        <p className=" whitespace-no-wrap font-inter font-bold ">
          {help?.date}
        </p>
      </div>
      <div className="px-5 py-[10px] w-full font-inter text-center bg-white text-sm">
        <p className=" whitespace-no-wrap font-inter font-bold ">
          {/* <CustomizedSwitches /> */}
          <div className="flex justify-center mr-6">
            <ToggleSwitch status={help?.status} />
          </div>
        </p>
      </div>
      <div className=" py-[10px] w-full mr-4 font-inter text-right bg-white text-sm">
        <Btn
          label="view"
          onClick={() => {
            setOpenModal(true);
            fetchOrderDetails(o?.id); // Fetch the order details when the button is clicked
          }}
          style={{
            background: "#00B812",
            width: "140px",
            borderRadius: "50px",
            display: "inline-block",
          }}
        />
      </div>
    </div>
  );
};

export default HelpRow;
