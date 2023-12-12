
import useAuth from "../../hook/useAuth";

const PaymentRow = ({ user }) => {
const {user: firebaseUser} = useAuth()


  return (
    <div className="rounded-full overflow-hidden text-primary border-2 border-[#D9D9D9] mt-5 flex items-center">
      <div className="px-5 flex items-center gap-3  overflow-hidden py-[10px]  w-full font-inter  bg-white text-sm">
        <div className="w-10 rounded-full overflow-hidden h-10 bg-slate-400">
          <img src={firebaseUser?.photoURL} className="" alt="" />
        </div>
        <p className="  whitespace-no-wrap font-inter font-bold">
          {user?.displayName}
        </p>
      </div>
      <div className="px-5 py-[10px] w-full font-inter ml-14 bg-white text-sm">
        <p className=" whitespace-no-wrap font-inter font-bold ">
          {user?.date}
        </p>
      </div>

      <div className="px-5 py-[10px] w-full font-inter  bg-white text-sm">
        <p className=" whitespace-no-wrap font-inter font-bold ">
          {user?.credit}
        </p>
      </div>
      <div className="px-5 py-[10px] w-full font-inter text-center bg-white text-sm">
        <p className=" whitespace-no-wrap font-inter font-bold ">
          {user?.amount}
        </p>
      </div>
    </div>
  );
};

export default PaymentRow;
