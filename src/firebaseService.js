import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 } from "uuid";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { axiosInstance } from "./config/apiCalls";
// get all orders
const getPlaceOrder = async () => {
  const data = await getDocs(collection(db, "orders"));
  return data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
//create order
const createOrder = async (formData) => {
  await addDoc(collection(db, "orders"), formData);
};
// get order by id
const getOrderById = async (orderId) => {
  const orderDocRef = doc(db, "orders", orderId);
  const orderDoc = await getDoc(orderDocRef);
  if (orderDoc.exists()) {
    return { id: orderDoc.id, ...orderDoc.data() };
  } else {
    throw new Error("Order not found");
  }
};
const updateOrderViews = async (orderId) => {
  const orderDocRef = doc(db, "orders", orderId);
  try {
    const orderDoc = await getDoc(orderDocRef);
    if (orderDoc.exists()) {
      await updateDoc(orderDocRef, {
        views: (orderDoc.data().views || 0) + 1,
      });
    } else {
      await setDoc(orderDocRef, {
        views: 1,
      });
    }
    console.log("views updated");
    return true;
  } catch (error) {
    console.error("Error updating views:", error);
    return false;
  }
};
// save image to db and get url
const uploadImgAndGetURL = async (image) => {
  const imgRef = ref(storage, `images/${v4()}`);
  await uploadBytes(imgRef, image);
  const imgURL = await getDownloadURL(imgRef);
  return imgURL;
};
//save userInfo to db
const saveUser = async (userInfo) => {
  await addDoc(collection(db, "users"), userInfo);
};
////////////// to make admin ////////////////////////
// const makeAdmin = async () => {
//   const info = { email: "suportfrete7@gmail.com" }; // enter email to create new admin then call the makeAdmin function
//   await addDoc(collection(db, "admin"), info);
// };
////////////// to make admin ////////////////////////

//get admin
const getAdmin = async (email) => {
  const data = await getDocs(collection(db, "admin"));
  // Map over the documents and return an array with document IDs and data
  const documents = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const result = documents.find((doc) => doc.email === email);
  if (result?.email) {
    return true;
  } else return false;
};
//update user status
const updateUserStatus = async (email, status) => {
  const usersCollection = collection(db, "users");
  const userQuery = query(usersCollection, where("email", "==", email));
  const userSnapshot = await getDocs(userQuery);
  if (!userSnapshot.empty) {
    const userDoc = userSnapshot.docs[0];
    await updateDoc(userDoc.ref, {
      status: status,
    });
    return true;
  }
  return false;
};
//get users
const getAllUsers = async () => {
  const data = await getDocs(collection(db, "users"));
  return data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
// get user status
const getUserStatus = async (email) => {
  const data = await getDocs(collection(db, "users"));
  const documents = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const result = documents.find((doc) => doc.email === email);

  if (result?.status === "active") {
    return true;
  } else return false;
};
//get single user
const getSingleUser = async (email) => {
  const data = await getDocs(collection(db, "users"));
  const documents = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const result = documents.find((doc) => doc.email === email);
  return result;
};
//get user paid budget**** named wrong as favourites
const getUserFavourites = async (email) => {
  const data = await getDocs(collection(db, "users"));
  const documents = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const user = documents.find((doc) => doc.email === email);
  return user ? user.favourites || [] : [];
};
// get user favourite List
const getUserFavouriteList = async (email) => {
  const data = await getDocs(collection(db, "users"));
  const documents = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const user = documents.find((doc) => doc.email === email);
  return user ? user.favouriteList || [] : [];
};
//get favourite orders
const getOrderDetails = async (orderIds) => {
  const ordersCollection = collection(db, "orders");

  const ordersQuery = query(ordersCollection, where("orderID", "in", orderIds));
  const ordersSnapshot = await getDocs(ordersQuery);

  const matchingOrders = ordersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return matchingOrders;
};
//filter
const filterUserByStatus = async (status) => {
  const data = await getDocs(collection(db, "users"));
  const documents = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const result = documents.find((doc) => doc.status === status);
  return result;
};
//update credit and viewedBudget
const updateUserCreditAndViewedBudget = async (
  email,
  budgetIdToAddToFavourites
) => {
  const usersCollection = collection(db, "users");
  const userQuery = query(usersCollection, where("email", "==", email));
  const userSnapshot = await getDocs(userQuery);
  if (!userSnapshot.empty) {
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    if (userData.credit > 0) {
      const favouritesArray = userData.favourites || [];
      console.log(favouritesArray);
      console.log(budgetIdToAddToFavourites);
      if (!favouritesArray.includes(budgetIdToAddToFavourites)) {
        await updateDoc(userDoc.ref, {
          credit: userData.credit - 1,
          viewedBudgets: userData.viewedBudgets + 1,
          favourites: [...favouritesArray, budgetIdToAddToFavourites],
        });

        return true;
      } else {
        return false;
      }
    }
  }

  return false;
};
//create favourites
const addToFavouriteList = async (email, budgetIdToAddToFavourites) => {
  const usersCollection = collection(db, "users");
  const userQuery = query(usersCollection, where("email", "==", email));
  const userSnapshot = await getDocs(userQuery);
  if (!userSnapshot.empty) {
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    if (userData.credit > 0) {
      const favouritesArray = userData.favouriteList || [];
      if (!favouritesArray.includes(budgetIdToAddToFavourites)) {
        await updateDoc(userDoc.ref, {
          favouriteList: [...favouritesArray, budgetIdToAddToFavourites],
        });

        return true;
      } else {
        return false;
      }
    }
  }

  return false;
};
// create payment intent
const createPaymentIntent = async (amount) => {
  const { data } = await axiosInstance.post(
    "https://us-central1-frete-a8155.cloudfunctions.net/createPaymentIntent",
    amount,
    { withCredentials: true }
  );
  return data;
};
//save payment to db
const createPaymentToDB = async (info) => {
  console.log(info);
  await addDoc(collection(db, "payments"), info);
};
//get all payment info
const getAllPayments = async () => {
  const data = await getDocs(collection(db, "payments"));
  return data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
//add credit
const increaseUserCredit = async (email, purchasedCredit) => {
  const usersCollection = collection(db, "users");
  const userQuery = query(usersCollection, where("email", "==", email));
  const userSnapshot = await getDocs(userQuery);
  console.log(email, purchasedCredit);
  if (!userSnapshot.empty) {
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    await updateDoc(userDoc.ref, {
      credit: userData.credit + purchasedCredit,
    });
    return true;
  }
  return false;
};
export {
  getPlaceOrder,
  createOrder,
  getOrderById,
  uploadImgAndGetURL,
  saveUser,
  getAllUsers,
  getAdmin,
  getUserStatus,
  updateUserCreditAndViewedBudget,
  updateUserStatus,
  getSingleUser,
  createPaymentIntent,
  filterUserByStatus,
  createPaymentToDB,
  getAllPayments,
  increaseUserCredit,
  getUserFavourites,
  getOrderDetails,
  updateOrderViews,
  addToFavouriteList,
  getUserFavouriteList,
};
