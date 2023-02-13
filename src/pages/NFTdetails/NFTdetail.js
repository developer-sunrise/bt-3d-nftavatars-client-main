import React, { useState, useEffect } from "react";
import { Grid, TableContainer, TableHead, TableRow, TableCell, Table, Box, Button, Avatar } from "@mui/material";
import "./nftdetails.css";
import { BsThreeDots, BsFlagFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { HiOutlineRefresh } from "react-icons/hi";
import { TbWorld } from "react-icons/tb";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { ImEmbed } from "react-icons/im";
import { BiDollarCircle } from "react-icons/bi";
// import { nftProperties } from "../../helpers/datafile";
import Linecharts from "../../components/charts/charts";
import WalletConnect from "../../components/makeOffers/index";
import BuyNowModal from "../../components/modals/buyNowModal";
import { useLocation, useParams } from "react-router-dom";
import Fade from "react-reveal/Fade";
import PropertiesTable from "../../components/table/NftTable/PropertiesTable";
import OfferTable from "../../components/table/NftTable/OfferTable";
import BidsTable from "../../components/table/NftTable/BidTable";
import ListingTable from "../../components/table/NftTable/ListingTable";
import ScrollToTop from "../../helpers/scrollTop";
import Select from "react-select";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { getMethod, putMethod } from "../../apis/index";
import { useSelector } from "react-redux";
import CountdownTimer from "../../components/timer/CountDownTimer";
import { toast } from "react-toastify";

function NftDetail() {

  const wallet = useSelector((state) => state.WalletConnect);

  // const robot = require("../../assets/images/robotimg2.svg").default;
  const Logonft = require("../../assets/banner/logonft.png").default;
  const share = require("../../assets/NFTimages/share.svg").default;
  const refresh = require("../../assets/NFTimages/refresh.svg").default;
  const nfticons2 = require("../../assets/images/ethereumimg.svg").default;
  const Remove = require("../../assets/NFTimages/remove.svg").default;
  const owner = require("../../assets/Collectionimg/iconowner.svg").default;
  const total = require("../../assets/NFTimages/total.svg").default;
  const View = require("../../assets/NFTimages/view.svg").default;

  const { id } = useParams();
  // const navigate = useNavigate();

  const { state } = useLocation();
  const item = state?.item;

  const [clickTable, setclickTable] = useState("");
  const [checkSales, setVerifysale] = useState("");

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [morePopover, setMorePopover] = useState(false);
  const [sharePopover, setSharePopover] = useState(false);
  const [nftDetails, setNftdetails] = useState("");
  const [nftCollection, setColletions] = useState("");
  const [offersData, setOffersdata] = useState([]);

  const handleChange = async (val) => {
    if (val === "Properties") {
      setclickTable("Properties");
    }
    else if (val === "Offers") {
      setclickTable("Offers");
    }
    else if (val === "Price") {
      setclickTable("Price");
    }
    else if (val === "Bids") {
      setclickTable("Bids");
    }
    else if (val === "Listings") {
      setclickTable("Listings");
    }
    else if (val === "Details") {
      setclickTable("Details");
    }
  };


  const getNfts = async () => {
    try {
      let url = "GetNfts";
      let response = await getMethod({ url });
      if (response.status) {
        const data = response.return.filter((val) => val._id === id);
        const data1 = data[0]?.makeOffers?.sort(function (offers1, offers2) { return Number(offers2.price) - Number(offers1.price) })
        setNftdetails(data[0]);
        setOffersdata(data1[0]);
        getcollections(data[0]);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };
  const getcollections = async (datas) => {
    try {
      let url = "viewCollection";
      let response = await getMethod({ url });
      if (response.status) {
        const data = response.result.filter((val) => val._id === datas.collectionId);
        setColletions(data[0]);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const acceptOffers = async () => {
    try {
      if (offersData?.saleType === "bid") {
        let url = "updateBids";
        let params = {
          id: offersData._id,
          nftId: offersData.nftId,
          fromWalletAddress: offersData.address,
          price: offersData.price,
          type: "acceptbid",
        };
        let response = await putMethod({ url, params });
        if (response.status) {
          toast("Update successfully");
          getNfts();
        }
      }
      else if (offersData?.saleType === "makeOffer") {
        let url = "updateBids";
        let params = {
          id: offersData._id,
          nftId: offersData.nftId,
          fromWalletAddress: offersData.address,
          price: offersData.price,
          type: "acceptmakeOffer",
        };
        let response = await putMethod({ url, params });
        if (response.status) {
          toast("Update successfully");
          getNfts();
        }
      }
    }
    catch (e) {
      console.log("error in updateoffers", e);
    }
  };

  const getUsers = async () => {
    try {
      let url = "viewUser";
      let response = await getMethod({ url });
      if (response.status) {
        const data = response.result.filter((val) => val.walletAddress === wallet.address);
        delistOffers(data[0]);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const delistOffers = async (val) => {
    try {
      let url = "updateNfts";
      let params = {
        nftId: id,
        nftStatus: "active",
        ownerName: val.userName,
        ownerProfile: val.profilePic,
        nftPrice: "0"
      };
      let response = await putMethod({ url, params });
      if (response.status) {
        toast("Update successfully");
        getNfts();
      }
    }
    catch (e) {
      console.log("error in updateoffers", e);
    }
  };

  const updateLikes = async (data, item) => {
    try {
      if (data === "like") {
        let Datas = item.likes;
        Datas.push({ nftId: item._id, walletAddress: wallet.address, status: true })
        let url = "updateLikes";
        let params = {
          nftId: item._id,
          likes: Datas,
        };
        let response = await putMethod({ url, params });
        if (response.status) {
          getNfts();
        }
      }
      else {
        let Datas = item.likes;
        let values = Datas.filter((val) => val.walletAddress !== item.walletAddress);
        let url = "updateLikes";
        let params = {
          nftId: item._id,
          likes: values,
        };
        let response = await putMethod({ url, params });
        if (response.status) {
          getNfts();
        }
      }
    }
    catch (e) {
      console.log("error in updateLikes", e);
    }
  };

  useEffect(() => {
    getNfts();
    setclickTable("Properties");
    handleChange();
  }, []);

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgb(22 22 45)",
      color: "white",
      border: "0px",
      outline: "0px",
      boxShadow: "0px",
      borderRadius: "10px",
      padding: "4%",
    }),
    menuList: (styles) => ({
      ...styles,
      background: "rgb(22 22 45)",
      color: "white",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        background: isFocused ? "#0BC209" : "rgb(22 22 45)",
        color: "white"
      };
    },
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "white",
      }
    }
  };

  const nftlistDta = [
    { value: "All", label: "All" },
    { value: "Ongoing", label: "Ongoing" },
    { value: "Upcoming", label: "Upcoming" },
    { value: "Completed", label: "Completed" },
  ];

  const handleDropdowns = (check) => {
    if (check === "more") {
      if (morePopover === false) {
        setMorePopover(true);
        setSharePopover(false);
      }
      else {
        setMorePopover(false);
        setSharePopover(false);
      }
    }
    else if (check === "share") {
      if (sharePopover === false) {
        setSharePopover(true);
        setMorePopover(false);
      }
      else {
        setSharePopover(false);
        setMorePopover(false);
      }
    }
  };

  console.log("new Date(nftDetails?.soldTime)", nftDetails);
  return (
    <div>
      <ScrollToTop />
      <Grid lg={12} xs={12} container sx={{ padding: "4%" }} role="presentation">
        <Grid lg={4} xs={12} container className="backgroundnftdetails">
          {!nftDetails?.nftImage ? (<>
            <img className="img-fluid bgimg" style={{ zIndex: "5" }} alt="nftdetails" />
          </>) : (<>
            <Fade left>
              <img src={process.env.REACT_APP_S3_LINK + nftDetails?.nftImage} className="img-fluid bgimg" style={{ zIndex: "5" }} alt="nftdetails" />
            </Fade>
          </>)}
        </Grid>
        <Grid lg={8} xs={12} container alignItems={"flex-start"} sx={{ padding: "1%" }} className="mt-2">
          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
            <Grid lg={6} xs={6} container justifyContent="flex-start" alignItems="center" role="presentation" className="pointer" onClick={() => window.history.back()}>
              {!nftCollection?.logoImage ? (<>
                <Avatar />
              </>) : (<>
                <Avatar src={process.env.REACT_APP_S3_LINK + nftCollection?.logoImage} />
              </>)}
              {/* <img src={robot} className="backimg" alt="nftdetails" /> */}
              <h6 className="text-light mx-2 m-0">{nftDetails?.nftName}</h6>
            </Grid>
            <Grid lg={6} xs={6} container justifyContent="flex-end" alignItems="center" sx={{ position: "relative" }}>
              <OverlayTrigger
                placement="top"
                delay={{ show: 210, hide: 400 }}
                overlay={<Popover id="popover-basic" style={{ padding: "0.4%" }}><strong>More</strong></Popover>}
              >
                <span className="dots" role="presentation" onClick={() => handleDropdowns("more")}><BsThreeDots /></span>
              </OverlayTrigger>
              {morePopover === true ? (<>
                <Box className="popoverinnftdetailspage">
                  <Grid lg={12} xs={12} container justifyContent="" alignItems="center" className="border-bottom moreoptionszoom" sx={{ padding: "4%", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                    <Grid lg={2} xs={2} container justifyContent={"center"}>
                      <HiOutlineRefresh size={24} />
                    </Grid>
                    <Grid lg={8} xs={8} container justifyContent={""}>
                      <h6 className="m-0 mx-2">Refresh metadata</h6>
                    </Grid>
                  </Grid>
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" className="border-bottom moreoptionszoom" sx={{ padding: "4%" }}>
                    <Grid lg={2} xs={2} container justifyContent={"center"}>
                      <TbWorld size={24} />
                    </Grid>
                    <Grid lg={10} xs={10} container >
                      <h6 className="m-0 mx-2">View website</h6>
                    </Grid>
                  </Grid>
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" className="moreoptionszoom" sx={{ padding: "4%", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}>
                    <Grid lg={2} xs={2} container justifyContent={"center"}>
                      <BsFlagFill size={20} />
                    </Grid>
                    <Grid lg={10} xs={10} container >
                      <h6 className="m-0 mx-2">Report</h6>
                    </Grid>
                  </Grid>
                </Box>
              </>) : (<></>)}
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Popover id="popover-basic" style={{ padding: "0.4%" }}><strong>Share</strong></Popover>}
              >
                <img src={share} className="share" alt="nftdetails" role="presentation" onClick={() => handleDropdowns("share")} />
              </OverlayTrigger>
              {sharePopover === true ? (<>
                <Box className="popoverinnftdetailspage">
                  <Grid lg={12} xs={12} container justifyContent="" alignItems="center" className="border-bottom moreoptionszoom" sx={{ padding: "4%", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                    <Grid lg={2} xs={4} container justifyContent={"center"}>
                      <img src={Logonft} className="img-fluid logosindropdownnftd" alt="logo" />
                    </Grid>
                    <Grid lg={8} xs={8} container justifyContent={""}>
                      <h6 className="m-0 mx-2">Copy link</h6>
                    </Grid>
                  </Grid>
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" className="border-bottom moreoptionszoom" sx={{ padding: "4%" }}>
                    <Grid lg={2} xs={4} container justifyContent={"center"}>
                      <FaFacebook size={24} className="text-primary" />
                    </Grid>
                    <Grid lg={10} xs={8} container >
                      <h6 className="m-0 mx-2">Share on Facebook</h6>
                    </Grid>
                  </Grid>
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" className="border-bottom moreoptionszoom" sx={{ padding: "4%" }}>
                    <Grid lg={2} xs={4} container justifyContent={"center"}>
                      <FaTwitter size={22} className="text-primary" />
                    </Grid>
                    <Grid lg={10} xs={8} container >
                      <h6 className="m-0 mx-2">Share on Twitter</h6>
                    </Grid>
                  </Grid>
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" className="moreoptionszoom" sx={{ padding: "4%", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}>
                    <Grid lg={2} xs={4} container justifyContent={"center"}>
                      <ImEmbed size={22} />
                    </Grid>
                    <Grid lg={10} xs={8} container >
                      <h6 className="m-0 mx-2">Embed item</h6>
                    </Grid>
                  </Grid>
                </Box>
              </>) : (<></>)}
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Popover id="popover-basic" style={{ padding: "0.4%" }}><strong>Refresh</strong></Popover>}
              >
                <img src={refresh} className="share" alt="nftdetails" />
              </OverlayTrigger>
            </Grid>
            <span className="spliter"></span>
            <h6 className="text-light mt-3">{item?.text2}</h6>
            <small className="text-light mt-3" style={{ marginRight: "3%" }}>{item?.text3}</small>
            <Grid lg={12} xs={12} container alignItems="center" className="mt-2">
              <h6 className="text-light">Owner -</h6>
              <h6 className="text-info mx-2 text-capitalize">{nftDetails?.walletAddress === wallet.address ? "You" : nftDetails?.ownerName !== "" ? nftDetails?.ownerName : nftDetails?.walletAddress?.slice(0, 5) + "..." + nftDetails?.walletAddress?.slice(-5)}</h6>
            </Grid>
            <Grid lg={12} xs={12} container className="mt-2" justifyContent="space-between">
              {nftDetails?.nftStatus === "active" || nftDetails?.nftStatus === "onSale" ? (<>
                <Grid lg={6} xs={12} container>
                  <Button className="bell">
                    <div className="d-flex justify-content-center align-items-center">
                      <h6 className="text-light m-0">Current Price</h6>
                      <img src={nfticons2} className="img-fluid mx-2" alt="nftdetails" />
                      <h6 className="text-warning m-0">{!nftDetails?.nftPrice ? "0" : nftDetails?.nftPrice} ETH</h6>
                    </div>
                  </Button>
                </Grid>
              </>) : nftDetails?.nftStatus === "onAuction" ? (<>
                <Grid lg={8} xs={12} container>
                  <Box className="bell">
                    <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "1%" }}>
                      <Grid lg={6} xs={6} container direction="column">
                        <div className="d-flex align-items-center">
                          <TfiTimer className="text-light" />
                          <font className="text-light mx-1 m-0">Sales ends</font>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <BiDollarCircle className="text-light" />
                          <h6 className="text-light mx-1 m-0">Minimum bid</h6>
                        </div>
                      </Grid>
                      <Grid lg={6} xs={6} container direction="column" alignItems="flex-end">
                        <div className="text-green">
                          <CountdownTimer targetDate={nftDetails?.soldTime} />
                        </div>
                        <div className="d-flex mt-2">
                          <img src={nfticons2} className="img-fluid mx-1" alt="nftdetails" />
                          <h6 className="text-warning  m-0">{!nftDetails?.nftPrice ? "0" : nftDetails?.nftPrice} ETH</h6>
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </>) : (<></>)}
              {/* <Grid lg={6} xs={12} container justifyContent={{lg:"flex-end",xs:"center"}} alignItems="center" className="mt-2">
                <h6 className="text-muted m-0">Last Sale -</h6>
                <h6 className="text-light mx-1 m-0">{nftDetails?.nftPrice }</h6>
              </Grid> */}
            </Grid>
            {(nftDetails?.nftStatus === "active" && nftDetails?.walletAddress === wallet.address) || (nftDetails?.nftStatus === "buy" && nftDetails?.walletAddress === wallet.address) ? (<>
              <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }} className="mt-3">
                <Grid lg={3} xs={4.6} container className="mx-3" >
                  <Button className="btns connectpad popinsMd" onClick={() => { setOpen(true); setVerifysale("sale"); }}>Sell</Button>
                </Grid>
                {offersData ? (<>
                  {offersData.status === "pending" ? (<>
                    <Grid lg={3} xs={4.6} container >
                      <button className="glow-on-hover" onClick={acceptOffers}>
                        <small className="text-light">Accept Offer - {offersData?.price?.length > 6 ? offersData?.price?.slice(0, 6) : offersData?.price} ETH</small>
                      </button>
                    </Grid>
                  </>) : (<></>)}
                </>) : (<></>)}
              </Grid>
            </>) : nftDetails?.nftPrice !== "" && nftDetails?.walletAddress !== wallet.address && nftDetails?.nftStatus === "onSale" ? (<>
              <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }} className="mt-3">
                <Grid lg={2.5} xs={4.6} container >
                  <button className="glow-on-hover" onClick={() => { setOpen(true); setVerifysale("makeoffer"); }}>
                    <img src={Remove} className="img-fluid" alt="nftdetails" />
                    <font className="text-light mx-2">Make Offer</font>
                  </button>
                </Grid>
                <Grid lg={2.5} xs={4.6} container className="mx-3" >
                  <Button className="btns connectpad popinsMd" onClick={() => { setOpen1(true); }}>Buy Now</Button>
                </Grid>
              </Grid>
            </>) : nftDetails?.nftPrice !== "" && nftDetails?.walletAddress !== wallet.address && nftDetails?.nftStatus === "onAuction" ? (<>
              <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }} className="mt-3">
                <Grid lg={3} xs={4.6} container className="mx-3" >
                  <Button className="btns connectpad popinsMd" onClick={() => { setOpen(true) }}>Place Bid</Button>
                </Grid>
              </Grid>
            </>) : (nftDetails?.nftStatus === "active" || nftDetails?.nftStatus === "buy") && nftDetails?.walletAddress !== wallet.address ? (<>
              <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }} className="mt-3">
                <Grid lg={3} xs={4.6} container >
                  <button className="glow-on-hover" onClick={() => { setOpen(true); setVerifysale("makeoffer"); }}>
                    <img src={Remove} className="img-fluid" alt="nftdetails" />
                    <font className="text-light mx-2">Make Offer</font>
                  </button>
                </Grid>
                {offersData ? (<>
                  {offersData.status === "accepted" ? (<>
                    <Grid lg={3} xs={4.6} container className="mx-3" >
                      <Button className="btns connectpad popinsMd" onClick={() => { setOpen1(true); }}>Buy Now</Button>
                    </Grid>
                  </>) : (<></>)}
                </>) : (<></>)}
              </Grid>
            </>) : nftDetails?.nftPrice !== "" && nftDetails?.walletAddress === wallet.address && nftDetails?.nftStatus === "onAuction" && nftDetails?.makeOffers?.length !== 0 && offersData?.status === "pending" ? (<>
              <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }} className="mt-3">
                <Grid lg={3} xs={4.6} container >
                  <button className="glow-on-hover" onClick={acceptOffers}>
                    <small className="text-light">Accept Offer - {offersData?.price?.length > 6 ? offersData?.price?.slice(0, 6) : offersData?.price} ETH</small>
                  </button>
                </Grid>
                <Grid lg={3} xs={4.6} container className="mx-3">
                  <button className="glow-on-hover" onClick={getUsers}>
                    <small className="text-light">Delist</small>
                  </button>
                </Grid>
              </Grid>
            </>) : (<></>)}
            <Grid lg={12} xs={12} justifyContent={{ lg: "flex-start", xs: "center" }} container className="mt-3">
              <Box className="nftlistindetailspage">
                <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                  <Grid lg={3} xs={3} container alignItems="center" direction="column">
                    <div className="d-flex justify-content-start">
                      <img src={owner} className="img-fluid" alt="nftdetails" />
                      <font className="text-light mx-1">{nftDetails?.totalOwners}</font>
                    </div>
                    <font className="text-muted" size={2}>Owners</font>
                  </Grid>
                  <Grid lg={3} xs={3} container alignItems="center" direction="column">
                    <div className="d-flex justify-content-start">
                      <img src={total} className="img-fluid" alt="nftdetails" />
                      <font className="text-light mx-1">0</font>
                    </div>
                    <font className="text-muted" size={2}>Total</font>
                  </Grid>
                  <Grid lg={3} xs={3} container alignItems="center" direction="column">
                    <div className="d-flex justify-content-start">
                      <img src={View} className="img-fluid" alt="nftdetails" />
                      <font className="text-light mx-1">{nftDetails?.views?.length}</font>
                    </div>
                    <font className="text-muted" size={2}>Views</font>
                  </Grid>
                  <Grid lg={3} xs={3} container alignItems="center" direction="column">
                    {nftDetails?.likes && nftDetails?.likes.filter((val) => val.walletAddress === wallet.address).length > 0 ? (<>
                      <Avatar className="heartslike pointer" onClick={() => updateLikes("dislike", nftDetails)}><IoMdHeart style={{ color: "white" }} size={14} /></Avatar>
                    </>) : (<>
                      <Avatar className="heartsdislike pointer" onClick={() => updateLikes("like", nftDetails)}><IoMdHeart style={{ color: "white" }} size={14} /></Avatar>
                    </>)}
                    <font size={1} className="mx-2 text-light">{nftDetails?.likes?.length} Likes</font>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid lg={12} xs={12} sx={{ padding: "1%", overflow: "auto" }}>
          <TableContainer className="nftdetailpageproptable">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    className={clickTable === "Properties" ? "nfttable" : "nfttable1"}
                    onClick={() => handleChange("Properties")}
                  >
                    Properties
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clickTable === "Offers" ? "nfttable" : "nfttable1"}
                    onClick={() => handleChange("Offers")}
                  >
                    Offers
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clickTable === "Price" ? "nfttable" : "nfttable1"}
                    onClick={() => handleChange("Price")}
                  >
                    Price History
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clickTable === "Bids" ? "nfttable" : "nfttable1"}
                    onClick={() => handleChange("Bids")}
                  >
                    Bids
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clickTable === "Listings" ? "nfttable" : "nfttable1"}
                    onClick={() => handleChange("Listings")}
                  >
                    Listings
                  </TableCell>
                  {/* <TableCell
                    align="right"
                    className={clickTable === "Details" ? "nfttable" : "nfttable1"}
                    onClick={() => handleChange("Details")}
                  >
                    Details
                  </TableCell> */}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
        <Grid lg={12} xs={12} >
          {clickTable === "Properties" ? (<>
            <PropertiesTable nftDetails={nftDetails} />
          </>) : clickTable === "Offers" ? (<>
            <OfferTable nftDetails={nftDetails} getNfts={getNfts} floorPrice={nftCollection} />
          </>) : clickTable === "Price" ? (<>
            <Grid lg={12} xs={12} container className="mt-3" sx={{ overflow: "auto" }}>
              <Box className="chartstableinnftdetails">
                <Grid lg={12} xs={12} container justifyContent={{ lg: "space-between", xs: "center" }} alignItems="center">
                  <Grid lg={6} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }}>
                    <h6 className="text-light m-0"><span className="text-muted">Average Time Price - </span>0.056 ETH</h6>
                  </Grid>
                  <Grid lg={2} xs={12} container justifyContent={{ lg: "flex-end", xs: "center" }} className="spaceinmobileviewornftdeatils">
                    <Select
                      styles={customStyles}
                      className="w-100"
                      options={nftlistDta}
                      placeholder="All"
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box className="nftdetailpageproptable1 border-gray radius-md mb-2 mt-3" >
                <Linecharts />
              </Box>
            </Grid>
          </>) : clickTable === "Bids" ? (<>
            <BidsTable nftDetails={nftDetails} getNfts={getNfts} floorPrice={nftCollection}/>
          </>) : clickTable === "Listings" ? (<>
            <ListingTable nftDetails={nftDetails} />
          </>) : (<></>)}
        </Grid>
      </Grid>
      <WalletConnect openWallet={open} setOpenWallet={setOpen} value={checkSales} nftDetailsData={nftDetails} getNfts={getNfts} />
      <BuyNowModal open1={open1} setOpen1={setOpen1} nftDetailsData={nftDetails} offers={offersData?.price} getNfts={getNfts} />
    </div >
  );
}
export default NftDetail;