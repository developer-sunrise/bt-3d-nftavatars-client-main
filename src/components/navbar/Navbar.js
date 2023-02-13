import React, { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import { Grid, Box, Button } from "@mui/material";
import { Navbar, Modal, Nav } from "react-bootstrap";
// import logo from "../../assets/images/logo.png";
// import droplogo from "../../assets/images/navdropdownicon.svg";
// import plusicon from "../../assets/images/plusicon.png";
import "./navbar.css";
import { BiSearch } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
// import { RiLogoutCircleRLine } from "react-icons/ri";
// import { CgProfile } from "react-icons/cg";
import { BsList } from "react-icons/bs";
// import rightLogo from "../../assets/images/navRightlogo.png";
import textlogo from "../../assets/metaverselogo.svg";
import WalletConnect from "../modals/walletConnect";
import { useNavigate, useLocation } from "react-router-dom";
import SignInmodal from "../modals/SignInmodal";
import { useDispatch, useSelector } from "react-redux";
import { connectFailed } from "../../redux/Action";
// import { toast,ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { getMethod } from "../../apis";
function Newnavbar() {

  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.WalletConnect);

  let width = window.innerWidth;
  const navigate = useNavigate();
  const location = useLocation();
  const [val, setval] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [logOut, setLogout] = useState(false);
  const [typewalletConnected, setTypewalletconnected] = useState("");
  const [collectionDirection, setCollectionsDirection] = useState([]);
  // const LoginType = localStorage.getItem("@logintype");

  const change = async () => {
    if (val === true) {
      setval(false);
    }
    else {
      setval(true);
    }
  };

  const handleBuilters = () => {
    if (collectionDirection?.length !== 0) {
      navigate("/nft/create");
    }
    else {
      navigate("/collection/create");
    }
  };

  const onLogout = () => {
    setLogout(false);
    localStorage.clear();
    navigate("/");
  };

  const connect = (check) => {
    if (check === "wallet") {
      setOpen(true);
    }
    else if (check === "builter") {
      setOpen(true);
      setTypewalletconnected(check);
    }
  };

  const getCollections = async () => {
    try {
      let url = "viewCollection";
      let response = await getMethod({ url });
      if (response.status) {
        let result = response.result.filter((val) => val.walletAddress === wallet.address);
        setCollectionsDirection(result);
      }
    }
    catch (e) {
      console.log("error in getcollections", e);
    }
  }

  const errorDiv = () => {
    return <p>Wallet Disconnected!</p>;
  };
  const disconnect = () => {
    const { web3Modal } = wallet;
    web3Modal.clearCachedProvider();
    dispatch(connectFailed(errorDiv()));
  };

  useEffect(() => {
    getCollections();
  }, [wallet]);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg">
        <Container fluid style={{ padding: "0% 1%" }}>
          <Navbar.Brand>
            <Image src={textlogo} className="textlogoinnavbar pointer" fluid role="presentation" onClick={() => navigate("/")} />
          </Navbar.Brand>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => change(true)}>
            <BsList className="text-light" size={30} />
          </button>
          {width > 600 ? (<></>) : (<>
            {location.pathname !== "/collection/create" && location.pathname !== "/nft/create" ? (<>
              <Grid lg={12} xs={12} container justifyContent="center" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <Grid lg={10} xs={10} container className="nav-input p-3 mt-2">
                  <input placeholder="Search" />
                  <span style={{ width: "10%" }}><BiSearch className="text-muted" size={25} /></span>
                </Grid>
              </Grid>
            </>) : (<></>)}
          </>)}
          {val === false ? (<>
            <Navbar.Collapse id="responsive-navbar-nav" className="">
              <Nav className="mx-auto w-100 justify-content-center">
                <Nav.Link>
                  <h6 className="text-light m-0 pointer textsbluehovering" role="presentation" onClick={() => navigate("/activity")}>Activity</h6>
                </Nav.Link>
                <Nav.Link className="mx-4">
                  <h6 className="text-light m-0 textsbluehovering pointer" role="presentation" onClick={() => navigate("/collections")}>Collections</h6>
                </Nav.Link>
              </Nav>
              <Nav className="mx-auto justify-content-between align-items-center w-100">
                <Nav.Link className="nav-input">
                  <input placeholder="Search" />
                  <BiSearch style={{ color: "#707470" }} size={18} />
                </Nav.Link>
                <Nav.Link className="buildernavlink">
                  <Button className="btns btnsbg radius-md text-bold" onClick={() => { !wallet.connected ? (<>{connect("builter")}</>) : (<>{handleBuilters()}</>) }}>
                    <span style={{ position: "relative" }}>
                      <AiFillPlusCircle size={28} className="plusiconscolor" />
                      <FiPlus size={22} className="text-light" style={{ position: "absolute", left: "2.8px", top: "3.1px" }} />
                    </span>
                    <font className="builterColors mx-2" size={4}>BUILDER</font>
                  </Button>
                </Nav.Link>
                <Nav.Link className="connectnavlink">
                  {!wallet.connected ? (<>
                    <Button className="connectpad" onClick={() => connect("wallet")}>Connect Wallet</Button>
                  </>) : (<>
                    <button
                      className="btns disconnectbtn w-auto d-grid"
                      onClick={disconnect}
                    >
                      <small className="px-2 py-1 text-white">{wallet.address?.slice(0, 5) + "..." + wallet.address?.slice(-5)}</small>
                      {/* <small className="px-2 text-white">Disconnect</small> */}
                    </button>
                    {/* <Button className="connectpad" onClick={disconnect}>Disconnect Wallet</Button> */}
                  </>)}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>) : (<>
            <Grid lg={12} xs={12} container alignItems="flex-end" direction="column" className="mt-3 mr-3">
              <h6 className="text-light m-0 pointer textsbluehovering" role="presentation" onClick={() => navigate("/activity")}>Activity</h6>
              <h6 className="text-light m-0 mt-2 textsbluehovering pointer" role="presentation" onClick={() => navigate("/collections")}>Collections</h6>
              <Grid lg={4.4} xs={4.4} container justifyContent="flex-end" className="mt-2">
                <Button className="btns btnsbg p-1 text-bold" onClick={() => { !wallet.connected ? (<>{connect("builter")}</>) : (<>{handleBuilters()}</>) }}>
                  <span style={{ position: "relative" }}>
                    <AiFillPlusCircle size={28} className="plusiconscolor" />
                    <FiPlus size={22} className="text-light" style={{ position: "absolute", left: "2.8px", top: "3.1px" }} />
                  </span>
                  <font className="builterColors mx-2" size={4}>BUILDER</font>
                </Button>
              </Grid>
              <Grid lg={4.4} xs={4.4} container justifyContent="flex-end" className="mt-2">
                {!wallet.connected ? (<>
                  <Button className="connectpad" onClick={() => connect("wallet")}>Connect Wallet</Button>
                </>) : (<>
                  <button
                    className="btns disconnectbtn w-auto d-grid"
                    onClick={disconnect}
                  >
                    <small className="px-2 py-1 text-white">{wallet.address?.slice(0, 5) + "..." + wallet.address?.slice(-5)}</small>
                    {/* <small className="px-2 text-white">Disconnect</small> */}
                  </button>
                  {/* <Button className="connectpad" onClick={disconnect}>Disconnect Wallet</Button> */}
                </>)}
              </Grid>
            </Grid>
          </>)}
        </Container>
      </Navbar>

      <WalletConnect openWallet={open} setOpenWallet={setOpen} value={typewalletConnected} />
      <SignInmodal openSignupmodal={show} setSignupmodal={setShow} />
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={logOut} centered>
        <Box className="signupmodal" sx={{ padding: "6% 4%" }}>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
            <h5 className="text-light">ARE YOU SURE WANT TO LOGOUT?</h5>
            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" className="mt-2">
              <Grid lg={5.5} xs={5.5} container>
                <button className="glow-on-hover" onClick={() => setLogout(false)}>Close</button>
              </Grid>
              <Grid lg={5.5} xs={5.5} container>
                <button className="glow-on-hover" onClick={() => onLogout()}>Logout</button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
export default Newnavbar;