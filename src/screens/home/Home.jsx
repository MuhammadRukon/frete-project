import React, { useState } from "react";
import "./Home.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import { Grid } from "@mui/material";
import arrow from "../../assets/imgs/home-arrow.png";
import Btn from "../../components/btn/Btn";
import card1 from "../../assets/imgs/card1.png";
import card2 from "../../assets/imgs/card2.png";
import card3 from "../../assets/imgs/card3.png";
import Slider from "../../components/slider/Slider";
import homeSec4 from "../../assets/imgs/homeSec4.png";
import FormHome from "./formHome/FormHome";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const reviews = [
    {
      id: "01",
    },
    {
      id: "02",
    },
    {
      id: "03",
    },
    {
      id: "04",
    },
    {
      id: "05",
    },
  ];

  return (
    <div>
      <NavBar active={user} isLoggedIn={user} />
      {/* Home section 1 */}
      {/* Home section 1 */}
      <div className="home-sec1 content-padding">
        <Grid container spacing={5}>
          <Grid item md={6} sm={12}>
            <div className="home-sec1-heading">
              Receive multiple quotes
              <div> for your move! </div>
            </div>
            <div className="home-sec1-heading1">
              Get to know Frete Brasil, it's quick, <br /> easy, and free
            </div>
            <div className="home-sec1-subHeading">
              Complete the steps next to this section
            </div>
            <img
              className="home-sec1-arrow"
              src={arrow}
              alt="arrow"
              width="340px"
            />
            <div className="home-sec1-semiCircle">
              Would you like to see the <span>list of requests?</span>
              <Btn
                onClick={() => navigate("/login")}
                label="Login"
                style={{
                  backgroundColor: "white",
                  color: "#0026AB",
                  fontSize: "17px",
                  border: "2px solid #0026AB",
                  height: "35px",
                  width: "229px",
                  marginTop: "25px",
                }}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="home-sec1-right">
              <FormHome />

              <div className="home-sec1-semiCircle1">
                Would you like to see the <span>list of requests?</span>
                <Btn
                  label="Login"
                  style={{
                    backgroundColor: "white",
                    color: "#0026AB",
                    fontSize: "17px",
                    border: "2px solid #0026AB",
                    height: "35px",
                    width: "229px",
                    marginTop: "25px",
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="wavy-div1" />

      {/* Home section 2 */}
      <div className="home-sec2 content-padding">
        <div className="home-sec2-heading">
          Trust those who <span>understand shipping</span>
        </div>
        <div className="home-sec2-subHeading">
          Get to know Frete Brasil, it's quick, easy, and free
        </div>
        <div className="home-sec2-cards">
          <Grid container spacing={4}>
            <Grid item md={4} sm={12}>
              <div className="home-sec2-card">
                <img src={card1} alt="card1" />
                <div className="home-sec2-card-heading">Low-cost shipments</div>
                <div className="home-sec2-card-text">
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                  ipsum dolor sit amet Lorem ipsum dolor sit amet
                </div>
              </div>
            </Grid>
            <Grid item md={4} sm={12}>
              <div className="home-sec2-card">
                <img src={card2} alt="card1" />
                <div className="home-sec2-card-heading">Low-cost shipments</div>
                <div className="home-sec2-card-text">
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                  ipsum dolor sit amet Lorem ipsum dolor sit amet
                </div>
              </div>
            </Grid>
            <Grid item md={4} sm={12}>
              <div className="home-sec2-card">
                <img src={card3} alt="card1" />
                <div className="home-sec2-card-heading">Low-cost shipments</div>
                <div className="home-sec2-card-text">
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                  ipsum dolor sit amet Lorem ipsum dolor sit amet
                </div>
              </div>
            </Grid>
          </Grid>
          <Btn
            label="Get your quote"
            style={{ width: "341px", maxWidth: "100%", margin: "40px auto" }}
          />
        </div>
      </div>
      <div className="wavy-div2" />

      {/* Home section 3 */}
      <div className="home-sec3 content-padding">
        <div className="home-sec3-heading">
          Testimonials from
          <span> those who use Frete Brasil</span>
        </div>
        <div className="home-sec3-subHeading">
          Get to know Frete Brasil, it's quick, easy, and free
        </div>
        <div className="home-sec3-cards">
          <Slider slides={reviews} />
        </div>
      </div>
      <div className="wavy-div3" />

      {/* Home section 4 */}
      <div className="home-sec4 content-padding">
        <Grid container spacing={5}>
          <Grid item sm={5} xs={12}>
            <div className="home-sec4-left">
              <div className="home-sec4-heading">
                Want to receive{" "}
                <span>
                  {" "}
                  more <br /> moving requests?
                </span>
              </div>
              <div className="home-sec4-subHeading">
                Register your company <br /> for free right now!
              </div>
              <div className="home-sec4-description">
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                ipsum dolor sit amet Lorem ipsum dolor sit amet dolor sit amet
                Lorem ipsum dolor sit amet dolor sit amet Lorem ipsum dolor
              </div>
            </div>
            <div className="home-sec4-desktop-btns">
              <Btn
                label="Register your company"
                style={{
                  width: "370px",
                  maxWidth: "100%",
                  marginTop: "50px",
                  marginBottom: "15px",
                }}
              />
              <Btn
                label="View list of requests"
                style={{
                  width: "370px",
                  maxWidth: "100%",
                  border: "2px solid #0026AB",
                  color: "#0026AB",
                  backgroundColor: "white",
                }}
              />
            </div>
          </Grid>
          <Grid item sm={7} xs={12}>
            <div className="home-sec4-right">
              <img
                src={homeSec4}
                className="home-sec4-img"
                alt="home-sec4-img"
              />
            </div>
            <div className="home-sec4-mobile-btns">
              <Btn
                label="Register your company"
                style={{
                  width: "370px",
                  maxWidth: "100%",
                  marginTop: "50px",
                  marginBottom: "15px",
                }}
              />
              <Btn
                label="View list of requests"
                style={{
                  width: "370px",
                  maxWidth: "100%",
                  border: "2px solid #0026AB",
                  color: "#0026AB",
                  backgroundColor: "white",
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
