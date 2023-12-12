import { Link, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import useAuth from "../../hook/useAuth";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import logo from "../../assets/imgs/logo1.png";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [errormsg, setErrorMsg] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const rawEmail = e.target.email?.value;
    const email = rawEmail?.toLowerCase();
    const password = e.target.password.value;
    try {
      await signIn(email, password);
      navigate("/wishlist");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };
  return (
    <>
      <NavBar />
      <div className="min-h-[70vh]">
        <div className="flex flex-col  rounded-md text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl text-white font-bold">Regsiter</h1>
          </div>
          <form
            onSubmit={handleLogin}
            className="p-5 rounded-xl bg-[#FDFCF8] max-w-lg mx-auto border-[#CFCFCF] border-2"
          >
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <img className="w-20 text-center" src={logo} alt="" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                required
                style={{ border: "2px solid #CFCFCF" }}
                placeholder="Email"
                className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
              />

              <input
                type="password"
                name="password"
                required
                style={{ border: "2px solid #CFCFCF" }}
                placeholder="Create a Password"
                className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
              />
            </div>
            <p className="pl-2 pt-2 h-4 block  text-red-700 italic text-sm">
              {errormsg}
            </p>
            <button
              type="submit"
              className="btn text-white py-3 mb-4 mt-6 rounded-md text-xl font-extrabold  bg-primary w-full"
            >
              Login
            </button>
            <p className="btn text-center border-2 text-primary cursor-pointer py-[11px] mb-4 rounded-md text-xl font-extrabold  border-primary w-full">
              I'm going back
            </p>
            <p className="text-center cursor-pointer mt-2 text-sm">
              Forgot your password?
            </p>
            <div className="flex text-sm justify-center gap-2 mt-1">
              <p className="text-center text-sm">Don't have an Account?</p>{" "}
              <Link className="text-primary text-sm" to="/signup">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
