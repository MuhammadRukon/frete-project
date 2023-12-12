import React, { useEffect, useState } from "react";
import "../wishlist/Wishlist.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import { Grid } from "@mui/material";
import profileImg from "../../assets/imgs/profileImg.png";
import EditIcon from "@mui/icons-material/Edit";
import IconInputField from "../../components/iconInputField/IconInputField";
import GradeIcon from "@mui/icons-material/Grade";
import filterRight from "../../assets/imgs/filterRight.png";
import arrow from "../../assets/imgs/arrow.png";
import calendarIcon from "../../assets/imgs/calendarIcon.png";
import eyeIcon from "../../assets/imgs/eyeIcon.png";
import Btn from "../../components/btn/Btn";
import {
  getOrderById,
  getOrderDetails,
  getSingleUser,
  getUserFavourites,
} from "../../firebaseService";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import FavouriteWishlistModal from "./PaidBudgetModal";

export default function PaidBugets() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [favourites, setFavorites] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order
  useEffect(() => {
    getUserFavourites(user?.email).then((data) => setFavorites(data));
  }, [user]);

  useEffect(() => {
    if (favourites?.length) {
      getOrderDetails(favourites).then((data) => setOrders(data));
      const fetchData = async () => {
        const data = await getSingleUser(user?.email);
        setLoggedInUser(data);
      };
      fetchData();
    }
  }, [favourites]);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  };
  console.log(orders);
  // Create a function to fetch a single order by ID
  const fetchOrderDetails = async (orderId) => {
    try {
      const order = await getOrderById(orderId);
      setSelectedOrder(order);
    } catch (error) {
      console.error("Error fetching order details:", error);
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
                  <div className="wishlist-heading">Welcome back!</div>
                  <div className="wishlist-profile">
                    <img
                      src={loggedInUser?.image || user?.photoURL || profileImg}
                      className="wishlist-profile-img rounded-full"
                    />
                    <div>
                      <div className="wishlist-profile-name">
                        {loggedInUser?.tradeName ||
                          user?.displayName ||
                          "Transsol Mudanças"}
                        <span>
                          <EditIcon />
                        </span>
                      </div>
                      <div className="wishlist-profile-number">
                        {loggedInUser?.telephone1 ||
                          loggedInUser?.telephone2 ||
                          "55 (48) 3524-8547"}
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
                <div
                  className=" wishlist-btn3"
                  onClick={() => navigate("/wishlist")}
                >
                  Order List
                </div>

                <div
                  className="wishlist-btn4"
                  onClick={() => navigate("/paid-budgets")}
                >
                  Paid Budget
                  <span></span>
                </div>

                <div
                  className="wishlist-btn2"
                  onClick={() => navigate("/favourite-list")}
                >
                  Favorites
                  <span>
                    <GradeIcon />
                  </span>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="wishlist-center">
          <div className="wishlist-heading1">Paid Budget List</div>
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
                              <div className="text-white flex justify-center items-center w-10 rounded-md bg-[#F2F2F2]">
                                <GradeIcon />
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
                        <div>
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
        <FavouriteWishlistModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
        />
      )}
      <Footer />
    </>
  );
}
