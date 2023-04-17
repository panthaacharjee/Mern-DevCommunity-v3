import React, { useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";
import LoginSignup from "./components/User/LoginSignup";
import Profile from "./components/User/Profile";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import MetaData from "./components/MetaData";
import Resgister from "./components/User/Resgister";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Posts from "./components/Posts/Posts";
import { useSelector } from "react-redux";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
function App() {
  const { error } = useSelector((state) => state.posts);
  //Load User
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  //Sidebar open and close
  const [sidebar, setSidebar] = useState(false);

  //React Notification
  const option = {
    position: "bottom-center",
    autoClose: 5000,
    // hideProgressBar: false,
    newestOnTop: true,

    rtl: false,
    // pauseOnFocusLoss,
    // draggable,
    // pauseOnHover,
    theme: "dark",
    type: "warning",
  };
  useEffect(() => {
    if (
      error ===
      "getaddrinfo ENOTFOUND ac-pwsxx4i-shard-00-00.wv215zp.mongodb.net"
    ) {
      toast("Network Error");
    }
  });
  return (
    <>
      <MetaData title={"My Profile"} />
      <ToastContainer {...option} />

      <Navigation sidebar={sidebar} setSidebar={setSidebar} />
      <div className="body">
        <div className={sidebar ? "sidebar" : "sidebar sidebar-hidden"}>
          <Sidebar sidebar={sidebar} />
        </div>
        <div className="content container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<LoginSignup />} />
            <Route exact path="/register" element={<Resgister />} />
            <Route exact path="/forgot/password" element={<ForgotPassword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            />

            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
