import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hook/useAuth";
import Footer from "../../components/footer/Footer";
import { Grid } from "@mui/material";
import "../home/Home.css";
import NavBar from "../../components/navBar/NavBar";
import { LuImagePlus } from "react-icons/lu";
import Btn from "../../components/btn/Btn";
import card1 from "../../assets/imgs/card1.png";
import card2 from "../../assets/imgs/card2.png";
import card3 from "../../assets/imgs/card3.png";
import Slider from "../../components/slider/Slider";
import axios from "axios";
import { saveUser, uploadImgAndGetURL } from "../../firebaseService";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  // set city by estate
  const fetchCitiesByEstado = async (estado) => {
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
      );
      const cities = response.data;
      setCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]); // Clear the cities list in case of an error
    }
  };
  const fetchCities = (estado) => {
    if (estado) {
      fetchCitiesByEstado(estado);
    } else {
      setCities([]); // Clear the cities list if no state is selected
    }
  };

  const [errormsg, setErrorMsg] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();

    const cnpj = e.target.cnpj.value;
    const imageFile = e.target.image?.files[0];
    const tradeName = e.target.tradeName.value;
    const personResponsible = e.target.personResponsible.value;
    const corporateReason = e.target.corporateReason.value;
    const publicPlace = e.target.publicPlace.value;
    const telephone1 = e.target.telephone1?.value;
    const telephone2 = e.target.telephone2?.value;
    const neighborhood = e.target.neighborhood?.value;
    const rawEmail = e.target.email.value;
    const email = rawEmail?.toLowerCase();
    const zipcode = e.target.zipcode.value;
    const firstpassword = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    let password;
    if (estado === "UF" || estado === "") {
      setErrorMsg("Invalid UF");
      return;
    }
    if (city === "City" || city === "") {
      setErrorMsg("Invalid city");
      return;
    }
    if (firstpassword === confirmPassword) {
      password = firstpassword || confirmPassword;
    } else {
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password needs to be at least six characters");
      return;
    }

    try {
      // upload image and get data
      const image = await uploadImgAndGetURL(imageFile);
      console.log(image);
      if (!image) {
        return;
      }
      // create user
      const result = await createUser(email, password);
      console.log(result);
      if (!result) {
        return;
      }
      // update user

      await updateUserProfile(personResponsible, image);
      const user = {
        cnpj,
        image,
        tradeName,
        personResponsible,
        corporateReason,
        telephone1,
        telephone2,
        publicPlace,
        neighborhood,
        email,
        zipcode,
        estado,
        city,
        status: "inactive",
        credit: 5,
        viewedBudgets: 0,
      };
      //save user
      await saveUser(user);
    } catch (error) {
      setErrorMsg(error.message);
    }

    navigate("/");
  };
  const estadoOptions = [
    { name: "Acre", code: "AC" },
    { name: "Alagoas", code: "AL" },
    { name: "Amapá", code: "AP" },
    { name: "Amazonas", code: "AM" },
    { name: "Bahia", code: "BA" },
    { name: "Ceará", code: "CE" },
    { name: "Distrito Federal", code: "DF" },
    { name: "Espírito Santo", code: "ES" },
    { name: "Goiás", code: "GO" },
    { name: "Maranhão", code: "MA" },
    { name: "Mato Grosso", code: "MT" },
    { name: "Mato Grosso do Sul", code: "MS" },
    { name: "Minas Gerais", code: "MG" },
    { name: "Pará", code: "PA" },
    { name: "Paraíba", code: "PB" },
    { name: "Paraná", code: "PR" },
    { name: "Pernambuco", code: "PE" },
    { name: "Piauí", code: "PI" },
    { name: "Rio de Janeiro", code: "RJ" },
    { name: "Rio Grande do Norte", code: "RN" },
    { name: "Rio Grande do Sul", code: "RS" },
    { name: "Rondônia", code: "RO" },
    { name: "Roraima", code: "RR" },
    { name: "Santa Catarina", code: "SC" },
    { name: "São Paulo", code: "SP" },
    { name: "Sergipe", code: "SE" },
    { name: "Tocantins", code: "TO" },
  ];
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
    <>
      <NavBar />

      <div className="home-sec1  content-padding">
        <Grid container>
          <Grid item md={6} sm={12}>
            <div className="home-sec1-heading hidden 2xl:block">
              Want to receive more
              <div> change requests? </div>
            </div>
            <div className="home-sec1-heading1">
              Register your company for free right now! <br /> free right now!
            </div>
            <div className="home-sec1-subHeading w-5/6">
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
              dolor sit amet Lorem ipsum dolor sit amet dolor sit amet Lorem
              ipsum dolor sit amet dolor sit amet Lorem ipsum dolor
            </div>

            <div className="w-1/2">
              <button
                onClick={() => navigate("/signup")}
                className="btn text-primary border-2  py-3 mb-4 rounded-md text-xl font-extrabold capitalize bg-white w-full"
              >
                Register your company
              </button>
              <button
                onClick={() => navigate("/wishlist")}
                className="btn text-white border-2 border-white py-3 mb-4 rounded-md text-xl font-extrabold capitalize bg-primary w-full"
              >
                View order lists
              </button>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="home-sec1-right">
              {/* sign up form */}
              {/* sign up form */}
              {/* sign up form */}
              <div className="min-h-screen">
                <div className="flex flex-col  rounded-md text-gray-900">
                  <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl text-white font-bold">
                      Regsiter
                    </h1>
                  </div>
                  <form
                    onSubmit={handleSignUp}
                    className="p-5 rounded-xl bg-[#FDFCF8] ng-untouched ng-pristine ng-valid"
                  >
                    <div className="space-y-4 ">
                      <div className="flex flex-col  xl:flex-row gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            name="cnpj"
                            id="cnpj"
                            required
                            style={{ border: "2px solid #CFCFCF" }}
                            placeholder="CNPJ"
                            className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                            data-temp-mail-org="0"
                          />
                        </div>
                        <div className="flex-1">
                          <label>
                            <input
                              className="text-sm cursor-pointer w-36 hidden"
                              type="file"
                              name="image"
                              id="image"
                              accept="image/*"
                              hidden
                            />
                            <div className="flex h-10 2xl:pl-3 gap-3 items-center justify-start text-gray-400 rounded-md font-semibold cursor-pointer">
                              <LuImagePlus size={49} />
                              <div className="leading-4">
                                <p className="text-black underline">
                                  Add your company logo here
                                </p>
                                <p className="">
                                  this photo will be used for validation
                                </p>{" "}
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col  xl:flex-row gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            name="tradeName"
                            id="tradeName"
                            required
                            style={{ border: "2px solid #CFCFCF" }}
                            placeholder="Trade Name"
                            className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                            data-temp-mail-org="0"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            name="personResponsible"
                            id="personResponsible"
                            required
                            style={{ border: "2px solid #CFCFCF" }}
                            placeholder="Name of person responsible"
                            className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                            data-temp-mail-org="0"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col  xl:flex-row gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            name="corporateReason"
                            id="corporateReason"
                            required
                            style={{ border: "2px solid #CFCFCF" }}
                            placeholder="Corporate reason"
                            className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                            data-temp-mail-org="0"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="number"
                            name="telephone1"
                            id="telephone1"
                            required
                            style={{ border: "2px solid #CFCFCF" }}
                            placeholder="Telephone 1 (xx) xxxx-xxxx"
                            className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col  xl:flex-row gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            name="publicPlace"
                            id="publicPlace"
                            required
                            style={{ border: "2px solid #CFCFCF" }}
                            placeholder="Public Place"
                            className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                            data-temp-mail-org="0"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="number"
                            name="telephone2"
                            id="telephone2"
                            required
                            style={{ border: "2px solid #CFCFCF" }}
                            placeholder="Telephone 2 (xx) xxxx-xxxx"
                            className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col  xl:flex-row gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            name="neighborhood"
                            id="neighborhood"
                            required
                            style={{ border: "2px solid #CFCFCF" }}
                            placeholder="neighborhood"
                            className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            style={{ border: "2px solid #CFCFCF" }}
                            placeholder="Email"
                            className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex flex-col flex-1 h-10  gap-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              name="zipcode"
                              id="zipcode"
                              required
                              style={{ border: "2px solid #CFCFCF" }}
                              placeholder="Zipcode"
                              className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                            />
                          </div>
                          <div className="flex-1 flex gap-3">
                            <select
                              defaultValue={"UF"}
                              style={{
                                border: "2px solid #CFCFCF",
                                borderRadius: "6px",
                              }}
                              onChange={(e) => {
                                setCities([]);
                                setEstado(e.target.value);
                                const val = e.target.value;
                                const selectedState = estadoOptions.find(
                                  (state) => state.name === val
                                );
                                if (selectedState) {
                                  // Set state code as value
                                  fetchCities(selectedState.code); // Fetch cities based on the selected state code
                                }
                              }}
                              className="select h-[40px] md:h-[48px] focus:outline-none select-bordered w-5/12 max-w-xs"
                            >
                              <option disabled>UF</option>
                              {estadoOptions?.map((estado, index) => (
                                <option key={index}>{estado.name}</option>
                              ))}
                            </select>
                            <select
                              onChange={(e) => setCity(e.target.value)}
                              defaultValue={"City"}
                              style={{
                                border: "2px solid #CFCFCF",
                                borderRadius: "6px",
                              }}
                              className="select h-[40px] md:h-[48px] focus:outline-none text-gray-700 select-bordered w-7/12 max-w-xs"
                            >
                              <option disabled>City</option>
                              {!cities.length && (
                                <option disabled>Loading</option>
                              )}
                              {cities?.map((city, index) => (
                                <option key={index}>{city.nome}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col  flex-1 gap-3">
                          <div className="flex-1">
                            <input
                              type="password"
                              name="password"
                              required
                              style={{ border: "2px solid #CFCFCF" }}
                              placeholder="Create a Password"
                              className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                            />
                          </div>
                          <div className="flex-1 ">
                            <input
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              required
                              style={{ border: "2px solid #CFCFCF" }}
                              placeholder="Confirm Password"
                              className="w-full p-3 rounded-md placeholder:text-lg bg-white text-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className=" h-3 text-red-700 italic text-sm">
                      {errormsg}
                    </p>
                    <button
                      type="submit"
                      className="btn text-white py-4 mb-4 mt-5 rounded-md text-xl font-extrabold capitalize bg-primary w-full"
                    >
                      register
                    </button>
                  </form>
                </div>
              </div>
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
      <Footer />
    </>
  );
};

export default SignUp;
