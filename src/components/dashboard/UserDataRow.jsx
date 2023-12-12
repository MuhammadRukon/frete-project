import { useEffect, useState } from "react";
import CustomizedSwitches from "../switch/ToggleSwitch";
import { updateUserStatus } from "../../firebaseService";
import ToggleSwitch from "../switch/ToggleSwitchNew";

const UserDataRow = ({ user, effect, setEffect }) => {
  const [statusChange, setStatusChange] = useState(user?.status);
  useEffect(() => {
    if (setStatusChange?.length) {
      const setUserStatusOnDb = async () =>
        await updateUserStatus(user?.email, statusChange);
      setUserStatusOnDb();
      setEffect(!effect);
    }
  }, [statusChange, effect]);
  return (
    <div className="rounded-full overflow-hidden border-2 border-[#D9D9D9] mt-5 flex items-center">
      <div className="px-5 flex items-center gap-3  overflow-hidden py-[10px]  w-full  bg-white text-sm">
        <div className="w-10 rounded-full overflow-hidden h-10 bg-slate-400">
          <img src={user?.image} alt="" />
        </div>
        <p className="text-gray-900  whitespace-no-wrap">{user?.tradeName}</p>
      </div>
      <div className="px-5 py-[4px] w-full ml-6 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-semibold">
          {user?.credit}
        </p>
      </div>

      <div className="px-5 py-[6px] w-full  bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-semibold">
          {user?.viewedBudgets}
        </p>
      </div>
      <div className="px-5 py-[10px] w-full  bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-semibold">
          {user?.city}
        </p>
      </div>
      <div className="px-5 py-[10px] ml-5  text-right   bg-white text-sm">
        <ToggleSwitch status={user?.status} setChange={setStatusChange} />
      </div>
    </div>
  );
};

export default UserDataRow;
