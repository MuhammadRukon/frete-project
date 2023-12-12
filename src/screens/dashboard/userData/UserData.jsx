import React, { useState } from "react";
// import "./user_data.css"; // Import your CSS file
// import logo from "../../assets/imgs/logo.png";

// import UserDataRow from "../../components/dashboard/UserDataRow";

const UserData = () => {
  const [formData, setFormData] = useState({
    corporateReason: "",
    cnpj: "",
    publicPlace: "",
    neighborhood: "",
    zipCode: "",
    uf: "",
    city: "",
    responsiblePerson: "",
    phone1: "",
    phone2: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
        background: "#FDFCF8",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.12)",
        borderRadius: 10,
        border: "1px #DADADA solid",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15,
        display: "inline-flex",
      }}
    >
      <div className="user_data">USER DATA</div>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        {/* Your image upload section */}
        <div
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            display: "flex",
          }}
        >
          {/* Your image upload code goes here */}
        </div>

        {/* Company name section */}
        <div
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 15,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              color: "#414141",
              fontSize: 20,
              fontFamily: "Roboto",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            Transsol removals and transport
          </div>
        </div>

        {/* Form input fields */}
        <div
          style={{
            width: 709,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left column */}
          <div style={{ flexDirection: "column", gap: 15 }}>
            {/* Corporate reason */}
            <div>
              <input
                type="text"
                name="corporateReason"
                placeholder="Corporate reason"
                value={formData.corporateReason}
                onChange={handleChange}
              />
            </div>

            {/* CNPJ */}
            <div>
              <input
                type="text"
                name="cnpj"
                placeholder="CNPJ"
                value={formData.cnpj}
                onChange={handleChange}
              />
            </div>

            {/* Public place */}
            <div>
              <input
                type="text"
                name="publicPlace"
                placeholder="Public place"
                value={formData.publicPlace}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right column */}
          <div style={{ flexDirection: "column", gap: 15 }}>
            {/* Neighborhood */}
            <div>
              <input
                type="text"
                name="neighborhood"
                placeholder="Neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
              />
            </div>

            {/* ZIP code */}
            <div>
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP code"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>

            {/* UF and City */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 15,
              }}
            >
              <input
                type="text"
                name="uf"
                placeholder="UF"
                value={formData.uf}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Contact information */}
        <div
          style={{
            width: 890,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 15,
          }}
        >
          {/* Left column */}
          <div style={{ flexDirection: "column", gap: 15 }}>
            {/* Responsible person */}
            <div>
              <input
                type="text"
                name="responsiblePerson"
                placeholder="Name of person responsible"
                value={formData.responsiblePerson}
                onChange={handleChange}
              />
            </div>

            {/* Phone 1 */}
            <div>
              <input
                type="tel"
                name="phone1"
                placeholder="Telephone 1 (xx) xxxx-xxxx"
                value={formData.phone1}
                onChange={handleChange}
              />
            </div>

            {/* Phone 2 */}
            <div>
              <input
                type="tel"
                name="phone2"
                placeholder="Telephone 2 (xx) xxxx-xxxx"
                value={formData.phone2}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right column (chart) */}
          <div style={{ width: 355, height: 223, position: "relative" }}>
            {/* Your chart code goes here */}
          </div>
        </div>

        {/* Submit button */}
        <div
          style={{
            width: 707,
            height: 45,
            padding: 10,
            background: "#0026AB",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            display: "flex",
          }}
        >
          <button
            type="submit"
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontFamily: "Roboto",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            To save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserData;
