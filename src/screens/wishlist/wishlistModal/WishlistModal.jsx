import { Grid, Modal } from "@mui/material";
import "./WishlistModal.css";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Btn from "../../../components/btn/Btn";
import useAuth from "../../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { PiCoinsFill, PiSteeringWheelFill } from "react-icons/pi";
import useStatus from "../../../hook/useStatus";
import {
  updateOrderViews,
  updateUserCreditAndViewedBudget,
} from "../../../firebaseService";

export default function WishlistModal({ open, onClose, order }) {
  const [isActive, isLoading] = useStatus();
  const [loading, setLoading] = useState(false);
  const [useCredit, setUseCredit] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  };
  // Assuming `order?.step2Data?.changeTime` is your Firestore timestamp
  const firestoreTimestamp = order?.step2Data?.changeTime;

  // Convert Firestore timestamp to a JavaScript Date object
  const jsDate = firestoreTimestamp
    ? new Date(firestoreTimestamp.seconds * 1000)
    : null;

  // Format the JavaScript Date object as "2:05:00 AM"
  const formatTime = (date) => {
    if (!date) return "";

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour time format with AM/PM
    };

    return date.toLocaleTimeString("en-US", timeOptions);
  };
  //view details
  const handleViewDetails = async () => {
    setErrorMsg("");
    if (!isLoading && !isActive) {
      setErrorMsg("not active user");
      return;
    }
    setLoading(true);
    // check if user is active
    if (!isLoading && isActive) {
      const response = await updateUserCreditAndViewedBudget(
        user?.email,
        order?.orderID
      );
      if (response) {
        console.log(order?.id);
        updateOrderViews(order?.id).then((data) => console.log(data));
        setUseCredit(true);
        setLoading(false);
      } else {
        setErrorMsg("Not enought credit / check favourites / other issues");
      }
      setLoading(false);
    }
    //set useCredit true
  };

  const innerDivClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the outer div
  };
  return (
    <div>
      <Modal open={open}>
        <div className="wishlist-modal-style" onClick={onClose}>
          <div className="wishlist-modal-content" onClick={innerDivClick}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="wishlist-modal-header">
                  <div className="wishlist-modal-heading">
                    Order Details
                    <div onClick={onClose}>
                      <CancelIcon sx={{ fontSize: 29 }} />
                    </div>
                  </div>
                  <div className="wishlist-modal-id">
                    <div>#{order.orderID}</div>
                    {formatDate(order?.step1Data?.dateOfChange)}
                  </div>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="wishlist-modal-body">
                  <div className="wishlist-modal-subHeading">Data:</div>
                  <p className="text-customRed">{errorMsg}</p>
                  {user ? (
                    useCredit ? (
                      <>
                        <div>
                          <div className="wishlist-text-heading">Name:</div>
                          <div className="wishlist-text-content">
                            {order.step4Data.name}
                          </div>
                        </div>
                        <div>
                          <div className="wishlist-text-heading">Email:</div>
                          <div className="wishlist-text-content">
                            {order.step4Data.email}
                          </div>
                        </div>
                        <div>
                          <div className="wishlist-text-heading">Phone:</div>
                          <div className="wishlist-text-content">
                            {order.step4Data.phone}
                          </div>
                        </div>
                        <Btn
                          icon={<WhatsAppIcon />}
                          label={"Call on whats app"}
                          onClick={() => {}}
                          style={{
                            width: "100%",
                            height: "45px",
                            background: "#029711",
                            margin: "20px 0px",
                          }}
                        />
                      </>
                    ) : (
                      <button
                        onClick={handleViewDetails}
                        className="w-full h-[45px] bg-primary font-bold rounded-md  text-white"
                      >
                        {loading ? (
                          <p className="flex justify-center items-center">
                            <span className="animate-spin">
                              <PiSteeringWheelFill size={24} />
                            </span>
                          </p>
                        ) : (
                          <p className="flex justify-center items-center gap-2">
                            View Data (1)
                            <PiCoinsFill color="#FFC700" />
                          </p>
                        )}
                      </button>
                    )
                  ) : (
                    <Btn
                      label={"Login to view the Data"}
                      onClick={() => {
                        navigate("/login");
                      }}
                      style={{
                        width: "100%",
                        height: "45px",
                        background: "#0026AB",
                        margin: "20px 0px",
                      }}
                    />
                  )}

                  <div className="wishlist-modal-subHeading line-above">
                    Move Details:
                  </div>
                  <div>
                    <div className="wishlist-text-heading1">Origin:</div>
                    <div className="wishlist-text-content">
                      {order?.step1Data?.originCity} /{" "}
                      {order?.step1Data?.originState}
                    </div>
                  </div>
                  <div>
                    <div className="wishlist-text-heading1">Destination:</div>
                    <div className="wishlist-text-content">
                      {order?.step1Data?.destinationCity} /{" "}
                      {order?.step1Data?.destinationState}
                    </div>
                  </div>
                  {order?.step2Data?.preferedTimeForMoving === "true" && (
                    <div>
                      <div className="wishlist-text-heading1">Moving Date:</div>
                      <div className="wishlist-text-content">
                        {formatTime(jsDate)}
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="wishlist-modal-body">
                  <div
                    className="desktop-description-modal"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="wishlist-text-heading1">Description:</div>
                    <div className="wishlist-text-content1">
                      {order.step3Data.moreDetailInformation}
                    </div>
                  </div>
                  <div className="wishlist-text-heading1 mt-desktop">
                    Listing:
                  </div>
                  <div>
                    <div
                      className="wishlist-text-heading bolded"
                      style={{ fontWeight: "bold" }}
                    >
                      Item
                    </div>
                    <div
                      className="wishlist-text-content bolded"
                      style={{ fontWeight: "bold" }}
                    >
                      Quantity
                    </div>
                  </div>
                  {order.step3Data.items.map((item, index) => (
                    <div key={index} className="wishlist-modal-underline-item">
                      <div className="wishlist-text-heading11">
                        {item.description}
                      </div>
                      <div className="wishlist-text-content11">
                        {item.quantity}
                      </div>
                    </div>
                  ))}

                  <br />
                  <div className="wishlist-modal-underline-item2">
                    <div className="wishlist-text-heading2">
                      Preferred time for the move:
                    </div>
                    <div className="wishlist-text-content2">
                      {order.step2Data.preferedTimeForMoving === "false"
                        ? "No"
                        : "Yes"}
                    </div>
                  </div>
                  <div className="wishlist-modal-underline-item2">
                    <div className="wishlist-text-heading2">
                      Need for disassembly/assembly:
                    </div>
                    <div className="wishlist-text-content2">
                      {order.step2Data.disassembleOrAssemble === "false"
                        ? "No"
                        : "Yes"}
                    </div>
                  </div>
                  <div className="wishlist-modal-underline-item2">
                    <div className="wishlist-text-heading2">
                      Need packing by the moving company:
                    </div>
                    <div className="wishlist-text-content2">
                      {order.step2Data.needMovingCompany === "false"
                        ? "No"
                        : "Yes"}
                    </div>
                  </div>
                  <div className="wishlist-modal-underline-item2">
                    <div className="wishlist-text-heading2">
                      Is the date flexible:
                    </div>
                    <div className="wishlist-text-content2">
                      {order.step2Data.isDateFlexible === "false"
                        ? "No"
                        : "Yes"}
                    </div>
                  </div>

                  <div className="wishlist-modal-underline-item2">
                    <div className="wishlist-text-heading2">
                      Traffic restriction or fee:
                    </div>
                    <div className="wishlist-text-content2">
                      {order.step2Data.restrictionOrFees === "false"
                        ? "No"
                        : "Yes"}{" "}
                      - $15
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
    </div>
  );
}
