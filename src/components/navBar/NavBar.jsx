import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/imgs/logo.png";
import Btn from "../btn/Btn";
import GradeIcon from "@mui/icons-material/Grade";
import profileImg from "../../assets/imgs/profileImg.png";
import EditIcon from "@mui/icons-material/Edit";
import useAuth from "../../hook/useAuth";
import useAdmin from "../../hook/useAdmin";
import { getSingleUser } from "../../firebaseService";

export default function NavBar({ active, isLoggedIn }) {
  const [isAdmin, isLoading] = useAdmin();
  const [loggedInUser, setLoggedInUser] = useState({});
  const { user,loading, logOut } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSingleUser(user?.email);
      if (data) {
        setLoggedInUser(data);
      }
    };
    fetchData();
  }, [user]);
  let [menu, setMenu] = useState(true);
  let [activeMenu, setActiveMenu] = useState("navLinks");
  let [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await logOut();
  };
  useEffect(() => {
    menu ? setActiveMenu("navLinks") : setActiveMenu("navLinks active");
  }, [menu]);

  useEffect(() => {
    setActiveLink(active);
  }, []);
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="navBar">
        <img onClick={() => navigate("/")} src={logo} className="logo-nb" />

        <div>
          <div className={activeMenu}>
            {isAdmin && (
              <div
                onClick={() => {
                  navigate("/dashboard");
                }}
                className="link-nb"
              >
                Dashboard
              </div>
            )}
            <div
              onClick={() => navigate("/")}
              className={activeLink === "Home" ? "link-nb" : "link-nb1"}
            >
              Home
            </div>
            {!isLoggedIn && <div className="link-nb">Companies</div>}
            <div className="link-nb" onClick={() => navigate("/wishlist")}>
              Wishlist
            </div>
            {isLoggedIn && (
              <>
                <div className="link-nb">About Us</div>
                <div onClick={handleLogOut} className="link-nb">
                  Logout
                </div>
                <Btn
                  label="View Favorite Orders"
                  afterIcon={<GradeIcon sx={{ color: "#FF9C1B" }} />}
                  style={{ border: "2px solid #FF9C1B", borderRadius: "50px" }}
                />
                <div className="wishlist-profile1">
                  <img
                    src={loggedInUser?.image || user?.photoURL || profileImg}
                    className="wishlist-profile-img1 rounded-full"
                  />
                  <div>
                    <div className="wishlist-profile-name1">
                      {loggedInUser?.tradeName ||
                        user?.displayName ||
                        "Transsol Moves"}
                      <span>
                        <EditIcon sx={{ fontSize: "16px" }} />
                      </span>
                    </div>
                    <div className="wishlist-profile-number1">
                      {loggedInUser?.telephone1 || loggedInUser?.telephone2 || "55 (48) 3524-8547"}
                    </div>
                  </div>
                </div>
              </>
            )}
            {!isLoggedIn && (
              <>
                <div className="link-nb">Get a Quote</div>
                <Btn
                  onClick={handleRegister}
                  label="Register Your Company"
                  style={{ border: "2px solid white" }}
                />
                <Btn
                  onClick={handleLogin}
                  label="Login"
                  style={{
                    backgroundColor: "white",
                    color: "#0026AB",
                    fontSize: "20px",
                  }}
                />
              </>
            )}
          </div>
          <div className="icon">
            {menu ? (
              <MenuIcon
                sx={{ color: "white" }}
                onClick={() => setMenu(!menu)}
              />
            ) : (
              <CloseIcon
                sx={{ color: "white" }}
                onClick={() => setMenu(!menu)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
