import React,{ useEffect } from "react";
import "./App.css";
import Approutes from "./routes/Approutes";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "./redux/Action";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const wallet = useSelector((state) => state.WalletConnect);
  const dispatch = useDispatch();

  useEffect(() => {
    const { web3Modal } = wallet;
    if (web3Modal.cachedProvider) {
      dispatch(connectWallet("metamask"));
    }
  },[]);
  return (
    <div className="App">
      {location.pathname !== "/profile" && location.pathname !== "/collection/mycollections" ? <Navbar/> : null}
      <Approutes />
      <Footer/>
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
