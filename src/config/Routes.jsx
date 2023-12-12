import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../screens/home/Home";
import Wishlist from "../screens/wishlist/Wishlist";
import DashboardLayout from "../screens/dashboard/DashboardLayout";
import Activeorder from "../screens/dashboard/orders/order";
import Payment from "../screens/dashboard/payment/Payment";
import AllUsers from "../screens/dashboard/allusers/AllUsers";
import Help from "../screens/dashboard/help/Help";
import AuthProvider from "../provider/AuthProvider";
import Login from "../screens/login/Login";
import SignUp from "../screens/signup/Signup";
import AdminRoute from "./AdminRoute";
import PurchaseCredit from "../screens/purchaseCredit/PurchaseCredit";

import PaidBugets from "../screens/paidBudget/PaidBudget";
import FavouriteList from "../screens/FavouriteList/FavouriteList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/paid-budgets",
    element: <PaidBugets />,
  },
  {
    path: "/favourite-list",
    element: <FavouriteList />,
  },
  {
    path: "/purchase-credit",
    element: <PurchaseCredit />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <div className="h-[70vh] justify-center items-center flex">
            <h1 className="text-4xl font-bold">Welcome to Dashboard</h1>
          </div>
        ),
      },
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "active-orders",
        element: <Activeorder />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
]);
export default function AppRouter() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
