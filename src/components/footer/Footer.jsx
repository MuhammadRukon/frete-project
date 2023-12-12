import React, { useState } from "react";
import "./Footer.css";
import logo from "../../assets/imgs/logo.png";
import logo2 from "../../assets/imgs/logo2.png";
import instagram from "../../assets/imgs/instagram.png";
import whatsapp from "../../assets/imgs/whatsapp.png";
import home from "../../assets/imgs/home.png";
import orders from "../../assets/imgs/orders.png";
import favorites from "../../assets/imgs/favorites.png";
import profile from "../../assets/imgs/profile.png";

import { Grid } from "@mui/material";

export default function Footer({}) {
  let [selected, setSelected] = useState("home");

  return (
    <div className="footer-main content-padding ">
      <Grid container spacing={5}>
        <Grid item sm={5} xs={12}>
          <div className="footer-left">
            <div className="footer-items-mobile">
              <div
                className={
                  selected === "home" ? "selected-nav-item" : "nav-item-mobile"
                }
              >
                <img src={home} alt="home" />
              </div>
              <div
                className={
                  selected === "orders"
                    ? "selected-nav-item"
                    : "nav-item-mobile"
                }
              >
                <img src={orders} alt="orders" />
              </div>
              <div
                className={
                  selected === "favorites"
                    ? "selected-nav-item"
                    : "nav-item-mobile"
                }
              >
                <img src={favorites} alt="favorites" />
              </div>
              <div
                className={
                  selected === "profile"
                    ? "selected-nav-item"
                    : "nav-item-mobile"
                }
              >
                <img src={profile} alt="profile" />
              </div>
            </div>
            <img src={logo2} alt="logo" className="mobile-logo" />
            <div className="footer-logo-box">
              <img src={logo} alt="logo" className="desktop-logo" />
              <div>Shipping</div>
              <div style={{ color: "#FF9C1B" }}>Brazil</div>
            </div>
            <div className="footer-social">
              <img
                src={whatsapp}
                className="footer-social-img"
                alt="whatsapp"
              />
              <img
                src={instagram}
                className="footer-social-img"
                alt="instagram"
              />
            </div>
            <div className="footer-left-description">
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
              dolor sit amet Lorem ipsum dolor sit amet
            </div>
          </div>
        </Grid>
        <Grid item sm={3} xs={12}>
          <div className="footer-center">
            <div className="footer-main-link">Moving?</div>
            <div className="footer-link">Get a quote</div>
            <div className="footer-link">Check companies</div>
            <div className="footer-link">FAQ</div>
            <div className="footer-link">Login</div>
          </div>
        </Grid>
        <Grid item sm={4} xs={12}>
          <div className="footer-center">
            <div className="footer-main-link">Terms of use</div>
            <div className="footer-link">Carriers</div>
            <div className="footer-link">Privacy policies</div>
            <div className="footer-link">Users</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
