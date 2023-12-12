import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import Sidebar from "./sidebar/Sidebar";
const DashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen">
      <div>
        <div className="bg-primary flex justify-center">
          <img
            className="h-[39px] cursor-pointer my-[27px] w-[78px]"
            onClick={() => navigate("/")}
            src={logo}
          />
        </div>
        <Sidebar />
        <div className="flex-1 mt-6 ml-24">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
