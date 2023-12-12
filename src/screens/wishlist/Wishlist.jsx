import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import { Grid } from "@mui/material";
import DefaultUser from "../../assets/img/avatar.jpeg";
import EditIcon from "@mui/icons-material/Edit";
import IconInputField from "../../components/iconInputField/IconInputField";
import GradeIcon from "@mui/icons-material/Grade";
import filterRight from "../../assets/imgs/filterRight.png";
import arrow from "../../assets/imgs/arrow.png";
import calendarIcon from "../../assets/imgs/calendarIcon.png";
import eyeIcon from "../../assets/imgs/eyeIcon.png";
import Btn from "../../components/btn/Btn";
import {
  addToFavouriteList,
  getOrderById,
  getPlaceOrder,
  getSingleUser,
  getUserFavouriteList,
} from "../../firebaseService";
import WishlistModal from "./wishlistModal/WishlistModal";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Wishlist() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [effect, setEffect] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order
  useEffect(() => {
    getPlaceOrder().then((data) => setOrders(data));
    const fetchData = async () => {
      const data = await getSingleUser(user?.email);
      setLoggedInUser(data);
    };
    fetchData();
  }, [user, effect]);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  };
  useEffect(() => {
    getUserFavouriteList(user?.email).then((data) => setFavourites(data));
    const fetchData = async () => {
      const data = await getSingleUser(user?.email);
      setLoggedInUser(data);
    };
    fetchData();
  }, [user, effect]);
  // Create a function to fetch a single order by ID
  const fetchOrderDetails = async (orderId) => {
    try {
      const order = await getOrderById(orderId);
      setSelectedOrder(order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  const handleAddToFavouriteList = async (id) => {
    const response = await addToFavouriteList(user?.email, id);
    if (response) {
      toast.success("Successfully Added to favourite list.");
      setEffect(!effect);
    } else {
      toast.error("already in favourite list or error occured");
    }
  };
  return (
    <>
      <NavBar isLoggedIn={user ? true : false} />
      <div className="wishlist-main">
        <div className="wishlist-upper">
          <Grid container spacing={5}>
            <Grid item md={6} xs={12}>
              {user && (
                <>
                  <div className="wishlist-heading">
                    {user && "Welcome back!"}
                  </div>
                  <div className="wishlist-profile">
                    <img
                      src={loggedInUser?.image || user?.photoURL}
                      className="wishlist-profile-img rounded-full"
                    />
                    <div>
                      <div className="wishlist-profile-name">
                        {loggedInUser?.tradeName || user?.displayName || ""}
                        <span>
                          <EditIcon />
                        </span>
                      </div>
                      <div className="wishlist-profile-number">
                        {loggedInUser?.telephone1 ||
                          loggedInUser?.telephone2 ||
                          ""}
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-2xl my-3">
                    CREDITS:{" "}
                    <span className="text-primary text-2xl">
                      {loggedInUser?.credit || 0}
                    </span>
                  </p>
                  <Btn
                    label="Buy Credit"
                    onClick={() => {
                      navigate("/purchase-credit");
                    }}
                    style={{
                      background: "#00B812",
                      width: "300px",
                    }}
                  />
                </>
              )}
            </Grid>

            <Grid item md={6} xs={12}>
              <div className="wishlist-search-outer">
                <IconInputField placeholder="Enter value" />
              </div>
              <div className="wishlist-btns">
                <div className="wishlist-btn1">Order List</div>
                {user && (
                  <>
                    <div
                      className="wishlist-btn6"
                      onClick={() => navigate("/paid-budgets")}
                    >
                      Paid Budget
                      <span></span>
                    </div>
                    <div
                      className="wishlist-btn2"
                      onClick={() => navigate("/favourite-list")}
                    >
                      Favourites
                      <span>
                        <GradeIcon />
                      </span>
                    </div>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="wishlist-center">
          <div className="wishlist-heading1">Order List</div>
          <img src={filterRight} alt="" />
        </div>
        <div className="wishlist-data">
          <div className="wishlist-data-headings">
            <Grid container spacing={1}>
              <Grid item xs={1.25}>
                Order
              </Grid>
              <Grid item xs={2.75}>
                Origin
              </Grid>
              <Grid item xs={2}>
                Destination
              </Grid>
              <Grid item xs={1.75}>
                Date
              </Grid>
              <Grid item xs={4.25}>
                Views
              </Grid>
            </Grid>
          </div>
          {orders &&
            orders.map((o) => {
              return (
                <div key={o?.id}>
                  <div className="desktop-card">
                    <div className="wishlist-data-values">
                      <Grid container spacing={1}>
                        <Grid item xs={1.25}>
                          <div className="wishlist-data-id">#{o?.orderID}</div>
                        </Grid>
                        <Grid item xs={2.75}>
                          <div className="wihlist-data-origin">
                            <div>
                              <span>From:</span>
                              {o?.step1Data?.originCity} /{" "}
                              {o?.step1Data?.originState}
                            </div>
                            <img src={arrow} alt="arrow" />
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <div className="wihlist-data-origin">
                            <div>
                              <span>To:</span>
                              {o?.step1Data?.destinationCity} /{" "}
                              {o?.step1Data?.destinationState}
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={1.75}>
                          <div className="wihlist-data-date">
                            <img src={calendarIcon} alt="calendar" />
                            <div>{formatDate(o?.step1Data?.dateOfChange)}</div>
                          </div>
                        </Grid>
                        <Grid item xs={4.25}>
                          <div className="wishlist-data-views">
                            <div className="views-eyeBox">
                              <img src={eyeIcon} alt="eyeIcon" />
                              {o.views || 0}/10
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                              {o.views < 10 ? (
                                <Btn
                                  label="Visualize"
                                  onClick={() => {
                                    setOpenModal(true);
                                    fetchOrderDetails(o?.id); // Fetch the order details when the button is clicked
                                  }}
                                  style={{
                                    background: "#00B812",
                                    width: "153px",
                                  }}
                                />
                              ) : (
                                <button
                                  disabled
                                  className="w-[153px] h-[38px] bg-slate-300 text-white rounded-md"
                                >
                                  Visualize
                                </button>
                              )}
                              <div
                                className="fav-btn"
                                onClick={() =>
                                  handleAddToFavouriteList(o.orderID)
                                }
                              >
                                {favourites?.find((id) => id === o.orderID) ? (
                                  <GradeIcon sx={{ color: "#FFC700" }} />
                                ) : (
                                  <GradeIcon />
                                )}
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <div className="mobile-card">
                    <div className="wishlist-data-values1">
                      <div className="mobile-origin-des">
                        <div className="wihlist-data-origin1">
                          <span>From:</span>
                          {o?.step1Data?.originCity} /{" "}
                          {o?.step1Data?.originState}
                        </div>
                        <img
                          src={arrow}
                          alt="arrow"
                          className="wishlist-arrow"
                        />
                        <div className="wihlist-data-origin1">
                          <span>To:</span>
                          {o?.step1Data?.destinationCity} /{" "}
                          {o?.step1Data?.destinationState}
                        </div>
                      </div>
                      <div className="mobile-card-center">
                        <div className="wishlist-data-date1">
                          <img src={calendarIcon} alt="calendar" />
                          <div>{formatDate(o?.step1Data?.dateOfChange)}</div>
                        </div>
                        <div className="wishlist-data-id1">#{o?.orderID}</div>
                        <div className="views-eyeBox1">
                          <img src={eyeIcon} alt="eyeIcon" />
                          {o.views || 0}/10
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "5px" }}>
                        {o?.views < 10 ? (
                          <Btn
                            label="Visualize"
                            onClick={() => {
                              setOpenModal(true);
                              fetchOrderDetails(o.id); // Fetch the order details when the button is clicked
                            }}
                            style={{
                              background: "#00B812",
                              width: "100%",
                              height: "38px",
                            }}
                          />
                        ) : (
                          <button
                            disabled
                            className="w-full h-[38px] bg-slate-300 text-white rounded-md"
                          >
                            Visualize
                          </button>
                        )}
                        <div
                          className="fav-btn1"
                          onClick={() => handleAddToFavouriteList(o.orderID)}
                        >
                          <GradeIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {selectedOrder && (
        <WishlistModal
          setEffect={setEffect}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedOrder(null);
            setEffect(!effect);
          }}
          order={selectedOrder}
        />
      )}
      <Footer />
    </>
  );
}
