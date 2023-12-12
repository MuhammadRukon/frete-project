import React from "react";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import useAuth from "../../hook/useAuth";
import Card from "../../components/CreditPlanCard/Card";
import BestCard from "../../components/CreditPlanCard/BestCard";
import Btn from "../../components/btn/Btn";

const PurchaseCredit = () => {
  const { user } = useAuth();
  return (
    <>
      <NavBar active={user} isLoggedIn={user} />
      <p className="text-center mt-16 text-2xl font-bold text-gray-500">
        CREDITS
      </p>
      <div className="container mx-auto min-h-[70vh] mb-16 flex justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="justify-self-center">
            <Card credit={30} price={30} />
          </div>
          <div className="justify-self-center">
            <BestCard credit={120} price={89} />
          </div>
          <div className="justify-self-center">
            <Card credit={60} price={60} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PurchaseCredit;
