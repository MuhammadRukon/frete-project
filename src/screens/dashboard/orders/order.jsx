import React, { useEffect, useState } from "react";
import "./order.css";
import { Grid } from "@mui/material";
import arrow from "../../../assets/imgs/arrow.png";
import calendarIcon from "../../../assets/imgs/calendarIcon.png";
import eyeIcon from "../../../assets/imgs/eyeIcon.png";
import Btn from "../../../components/btn/Btn";
import { getOrderById, getPlaceOrder } from "../../../firebaseService";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import OrderModal from "./orderModal/OrderModal";
import CustomizedSwitches from "../../../components/switch/ToggleSwitch";
import moment from "moment";
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
export default function Activeorder() {
  const [estado, setEstado] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [effect, setEffect] = useState("");
  const [orders, setOrders] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order
  const [filter, setFilter] = useState(false);
  const [filterDate, setFilterDate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const datas = await getPlaceOrder();
      setOrders(datas);
      if (filterDate?.from && filterDate?.to) {
        const filtered = datas.filter(
          (data) => data.date >= filterDate.from && data.date <= filterDate.to
        );
        console.log(filtered, "filtered");
        setOrders(filtered);
      } else {
        setOrders(datas);
      }
    };

    fetchData();
  }, [effect, filter]);
  /////
  console.log(orders);
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
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  };

  // Create a function to fetch a single order by ID
  // const fetchOrderDetails = async (orderId) => {
  //   try {
  //     const order = await getOrderById(orderId);
  //     console.log(order);
  //     setSelectedOrder(order);
  //     setOpenModal(true);
  //   } catch (error) {
  //     console.error("Error fetching order details:", error);
  //   }
  // };

  return (
    <div className="flex">
      <div className="w-[65vw] px-4 font-inter  font-extrabold sm:px-8">
        <div className="py-8">
          <div className="flex justify-between">
            <h2 className="text-left flex-1 text-4xl mb-6">Wishlists</h2>
            <h2 className="text-center flex-1 text-4xl mb-6">
              Active orders: {orders?.length}
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full px-3  overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead className="border-none">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 pr-14 py-3   w-0  border-gray-200 text-gray-800  text-left text-sm uppercase font-inter font-extrabold"
                    >
                      Order
                    </th>
                    <th
                      scope="col"
                      className="px-4 pr-32 py-3  w-0  border-gray-200 text-gray-800  text-left text-sm uppercase font-inter font-extrabold"
                    >
                      Origin
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 pr-28 w-0   border-gray-200 text-gray-800  text-left text-sm uppercase font-inter font-extrabold"
                    >
                      Destiny
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 pr-16 w-0 whitespace-nowrap   border-gray-200 text-gray-800  text-left text-sm uppercase font-inter font-extrabold"
                    >
                      Gives you
                    </th>
                    <th
                      scope="col"
                      className="pr-10  py-3 text-left   border-gray-200 text-gray-800  text-sm uppercase font-inter font-extrabold"
                    >
                      View
                    </th>
                  </tr>
                </thead>
              </table>
              {/* User data table row */}
              {/* orders */}
              {orders &&
                orders.map((o) => {
                  return (
                    <div key={o?.id}>
                      <div className="desktop-card">
                        <div className="wishlist-data-values">
                          <Grid container spacing={1}>
                            <Grid item xs={1.25}>
                              <div className="wishlist-data-id">
                                #{o?.orderID}
                              </div>
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
                                <div>
                                  {formatDate(o?.step1Data?.dateOfChange)}
                                </div>
                              </div>
                            </Grid>
                            <Grid item xs={4.25}>
                              <div className="wishlist-data-views">
                                <div className="views-eyeBox">
                                  <img src={eyeIcon} alt="eyeIcon" />
                                  1/10
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                  <Btn
                                    label="Visualize"
                                    onClick={() => {
                                      setOpenModal(true);
                                      setSelectedOrder(o);
                                      // fetchOrderDetails(o?.orderID); // Fetch the order details when the button is clicked
                                      // fetchOrderDetails(o?.orderId); // Fetch the order details when the button is clicked
                                    }}
                                    style={{
                                      background: "#00B812",
                                      width: "153px",
                                    }}
                                  />
                                  <div className="ml-2 flex items-center gap-2">
                                    <AiFillEdit size={24} cursor="pointer" />
                                    <div className="text-customRed">
                                      <RiDeleteBin6Line
                                        cursor="pointer"
                                        size={20}
                                      />
                                    </div>
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
                              <div>
                                {formatDate(o?.step1Data?.dateOfChange)}
                              </div>
                            </div>
                            <div className="wishlist-data-id1">
                              #{o?.orderID}
                            </div>
                            <div className="views-eyeBox1">
                              <img src={eyeIcon} alt="eyeIcon" />
                              1/10
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "5px" }}>
                            <Btn
                              label="Visualize"
                              onClick={() => {
                                setOpenModal(true);
                                // fetchOrderDetails(o.orderID); // Fetch the order details when the button is clicked
                              }}
                              style={{
                                background: "#00B812",
                                width: "100%",
                                height: "38px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[27vw] pt-10">
        <div className="border-primary p-3 border-2 w-5/6  rounded-2xl">
          <p className="font-bold">Origin:</p>
          <div className="mx-auto mt-1 flex gap-3">
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
              {!cities.length && <option disabled>Loading</option>}
              {cities?.map((city, index) => (
                <option key={index}>{city.nome}</option>
              ))}
            </select>
          </div>
          <p className="font-bold">Destiny:</p>
          <div className="mx-auto mt-1  flex gap-3">
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
              {!cities.length && <option disabled>Loading</option>}
              {cities?.map((city, index) => (
                <option key={index}>{city.nome}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center  px-1 mt-5">
            <div className=" border-gray-300 p-2 border w-full rounded-lg">
              <input
                type="date"
                name=""
                id=""
                onChange={(e) =>
                  setFilterDate({
                    ...filterDate,
                    from: moment(e.target.value).format("MM-DD-yyyy"),
                  })
                }
              />
            </div>
            <p className="px-2">ATÉ</p>
            <div className=" border-gray-300 p-2 border w-full rounded-lg">
              <input
                type="date"
                name=""
                id=""
                onChange={(e) =>
                  setFilterDate({
                    ...filterDate,
                    to: moment(e.target.value).format("MM-DD-yyyy"),
                  })
                }
              />
            </div>
          </div>
          <div className="text-center mt-5">
            <button
              onClick={() => {
                setEffect(!effect);
                setFilter(true);
              }}
              className="btn text-white font-bold bg-primary w-24 py-2 rounded-[50px]"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      <OrderModal
        order={selectedOrder}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedOrder(selectedOrder);
        }}
      />
    </div>
  );
}
