import { useEffect, useState } from "react";
import UserDataRow from "../../../components/dashboard/UserDataRow";
import { getAllUsers } from "../../../firebaseService";
import axios from "axios";
import CustomizedSwitches from "../../../components/switch/ToggleSwitch";
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
const AllUsers = () => {
  const [estado, setEstado] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [filter, setFilter] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("inactive");
  const [effect, setEffect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const datas = await getAllUsers();
      if (city && estado && filterStatus) {
        const filtered = datas.filter(
          (data) =>
            data.estado === estado &&
            data.city === city &&
            data.status === filterStatus
        );
        setLoadedData(filtered);
      }
      if (city && estado) {
        const filtered = datas.filter(
          (data) => data.estado === estado && data.city === city
        );
        setLoadedData(filtered);
      }
      if (filter) {
        if (filterStatus) {
          const filtered = datas.filter((data) => data.status === filterStatus);
          setLoadedData(filtered);
        }
      } else {
        setLoadedData(datas);
      }
    };

    fetchData();
  }, [effect, filter]);

  ///fetch city

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
  return (
    <div className="flex justify-between">
      <div className="w-[65vw] px-4 font-inter  font-extrabold sm:px-8">
        <div className="py-8">
          <div className="flex justify-between">
            <h2 className="text-left flex-1 text-4xl mb-6">
              List of Active users
            </h2>
            <h2 className="text-center flex-1 text-4xl mb-6">
              Assets: {loadedData?.length}
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full  overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-[#D9D9D9]  border-b  border-gray-200 text-gray-800  text-left text-sm uppercase font-inter font-extrabold"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-[#D9D9D9]  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-inter font-extrabold"
                    >
                      Credit
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-[#D9D9D9]  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-inter font-extrabold"
                    >
                      Budget seen
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-[#D9D9D9]  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-inter font-extrabold"
                    >
                      city
                    </th>
                    <th
                      scope="col"
                      className="pr-10 text-right py-3 bg-[#D9D9D9]  border-b border-gray-200 text-gray-800  text-sm uppercase font-inter font-extrabold"
                    >
                      status
                    </th>
                  </tr>
                </thead>
              </table>
              {/* User data table row */}
              {loadedData?.map((data, index) => (
                <UserDataRow
                  user={data}
                  key={index}
                  effect={effect}
                  setEffect={setEffect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[27vw] py-10">
        <div className="border-primary p-3 border-2 w-5/6 h-56 rounded-2xl">
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
          <p className="font-bold">Status:</p>
          <CustomizedSwitches
            status={filterStatus}
            setChange={setFilterStatus}
          />
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
    </div>
  );
};

export default AllUsers;
