import React, { useState, useEffect } from "react";
import { Grid, Avatar, Box, Button } from "@mui/material";
import { Container, Image, Stack } from "react-bootstrap";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { BsThreeDots, BsSortUpAlt, BsFillPersonFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { CgSortAz } from "react-icons/cg";
import { TbUnlink, TbWaveSawTool } from "react-icons/tb";
import { SiEthereum } from "react-icons/si";
import Slider from "@mui/material/Slider";
import "./nftlist.css";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { nftcardData } from "../../helpers/datafile";
import WalletConnect from "../../components/makeOffers/index";
import ActivityTables from "../../components/table/ActivityTable/Active";
// import Activity from "../Userprofile/Profile";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import ScrollToTop from "../../helpers/scrollTop";
import Select from "react-select";
import CountdownTimer from "../../components/timer/CountDownTimer";
// import { ActivityTB } from "../../helpers/datafile";
import { getMethod, putMethod } from "../../apis/index";

function Nftlist() {

  let width = window.innerWidth;

  const { id } = useParams();
  const navigate = useNavigate();
  const wallet = useSelector((state) => state.WalletConnect);

  const nfticons2 = require("../../assets/images/ethereumimg.svg").default;

  const [checkitems, setCheckitem] = useState("");
  const [carddata, setCarddata] = useState([]);
  const [open, setOpen] = useState(false);
  const [ActiveTableData, setActiveTableData] = useState([]);
  const [ActiveTableData1, setActiveTableData1] = useState([]);
  const [sortbydrop, sortbBydDrops] = useState(false);
  const [users, setUsers] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusFilterData, setStatusFilterData] = useState("");
  const [CollectionsNfts, setCollectionsNft] = useState("");
  const [Nfts, setNfts] = useState([]);

  const handlechange = async (val) => {
    if (val === "item") {
      setCheckitem("item");
    }
    else if (val === "active") {
      setCheckitem("active");
    }
  };

  const ActivitySelect = [
    { value: "All", label: "All" },
    { value: "1Day", label: "1Day" },
    { value: "2Days", label: "2Days" },
    { value: "7Days", label: "7Days" },
  ];

  const getCollections = async () => {
    try {
      let url = "Getcollections";
      let response = await getMethod({ url });
      if (response.status) {
        let result = response.result.filter((val) => val._id === id);
        setCollectionsNft(result[0]);
        setCarddata(result[0]?.totalnfts);
        setNfts(result[0]?.totalnfts);
        getUsers(result[0]);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  // console.log("colllectuo",CollectionsNfts,carddata,Nfts);
  const getUsers = async (datas) => {
    try {
      let url = "viewUser";
      let response = await getMethod({ url });
      if (response.status) {
        const data = response.result.filter((val) => val.walletAddress === datas?.walletAddress);
        setUsers(data[0]);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const getActivity = async () => {
    try {
      let url = "viewActivities";
      let response = await getMethod({ url });
      if (response.status) {
        let data = response.result.filter((val) => val.collectionId === id);
        setActiveTableData(data);
        setActiveTableData1(data);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };
  const handleSelectChange = (e) => {
    if (e === "All") {
      setActiveTableData(ActiveTableData1);
    }
    else if (e === "1Day") {
      let data = ActiveTableData1.filter((val) => (Math.abs(parseInt((new Date(val?.createdOn).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))) + "Day" === "0Day" && "1Day");
      setActiveTableData(data);
    }
    else if (e === "2Days") {
      let data = ActiveTableData1.filter((val) => (Math.abs(parseInt((new Date(val?.createdOn).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))) + "Days" === "2Days");
      setActiveTableData(data);
    }
    else if (e === "7Days") {
      let data = ActiveTableData1.filter((val) => (Math.abs(parseInt((new Date(val?.createdOn).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))) + "Days" === "7Days");
      setActiveTableData(data);
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
          getCollections();
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
          getCollections();
        }
      }
    }
    catch (e) {
      console.log("error in updateLikes", e);
    }
  };


  const updateView = async (item) => {
    try {
      let Datas = item.views;
      Datas.push({ nftId: item._id, walletAddress: wallet.address })
      let url = "updateViews";
      let params = {
        nftId: item._id,
        views: Datas,
      };
      let response = await putMethod({ url, params });
      if (response.status) {
        getCollections();
      }
    }
    catch (e) {
      console.log("error in updateViews", e);
    }
  };

  const [value, setValue] = useState([0, 1]);
  const [value1, setValue1] = useState([0, 100]);

  const handleinputchange = (e) => {
    setValue(e);
    let start = value[0];
    let end = value[1];
    let data = Nfts.filter((res) => {
      return ((res?.nftPrice >= (start) && res?.nftPrice <= (end)));
    });
    setCarddata(data);
  };

  const handleinputchange1 = (e) => {
    setValue1(e);
    let start = value1[0];
    let end = value1[1];
    let data = Nfts.filter((res) => {
      return ((Number(res?.likes) >= (start) && Number(res?.likes) <= (end)));
    });
    setCarddata(data);
  };

  const reset = async () => {
    setCarddata(Nfts);
    setStatusFilterData(Nfts);
    setChainsData();
    setValue([0, 1]);
    setValue1([0, 100]);
  };

  // const likeCards = (check, i) => {
  //   if (check === "like") {
  //     carddata[i].status = true;
  //     carddata[i].text3 = carddata[i].text3 + 1;
  //   }
  //   else if (check === "dislike") {
  //     carddata[i].status = false;
  //     carddata[i].text3 = carddata[i].text3 - 1;
  //   }
  // }

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgb(22 22 45)",
      color: "white",
      border: "0px",
      outline: "0px",
      boxShadow: "0px",
      borderRadius: "10px",
      padding: "2% 6%",
      cursor: "pointer"
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
        color: "white",
        cursor: "pointer"
      };
    },
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "white",
      }
    }
  };

  // console.log("statusFilter",statusFilter,statusFilterData);
  const [chainsDatas, setChainsData] = useState("");


  const handleallfilters = (value, val1) => {
    if (statusFilter === "status") {
      if (val1 === "chain") {
        if (value === "Eth" || value === "Mumbai" || value === "Bnb") {
          let data = statusFilterData.filter((val) => val.blockchainType === value);
          setCarddata(data);
          setChainsData(data);
        }
      }
      else if(val1 === "item"){
        if (value === "all") {
          let values = (!chainsDatas ? statusFilterData : chainsDatas);
          setCarddata(values);
        }
        else if (value === "ongoing") {
          let values = (!chainsDatas ? statusFilterData : chainsDatas);
          let data = values.filter((val) => val.nftStatus === ("onSale" || "onAuction"));
          setCarddata(data);
        }
        else if (value === "upcoming") {
          let values = (!chainsDatas ? statusFilterData : chainsDatas);
          let data = values.filter((val) => val.nftStatus === "active");
          setCarddata(data);
        }
      }
      else if(val1 === "sort"){
        if (value === "highest") {
          let values = (!chainsDatas ? statusFilterData : chainsDatas);
          let data = values.sort(function (a, b) { return (Number(!b.nftPrice ? 0 : b.nftPrice)) - (Number(!a.nftPrice ? 0 : a.nftPrice)) });
          setCarddata(data);
        }
        else if (value === "lowest") {
          let values = (!chainsDatas ? statusFilterData : chainsDatas);
          let data = values.sort(function (a, b) { return (Number(!a.nftPrice ? 0 : a.nftPrice)) - (Number(!b.nftPrice ? 0 : b.nftPrice)) });
          setCarddata(data);
        }
        else if (value === "recent") {
          let values = (!chainsDatas ? statusFilterData : chainsDatas);
          const data = values.sort(function (a, b) { return (new Date(b.createdOn)).getTime() - (new Date(a.createdOn)).getTime() });
          setCarddata(data);
        }
        else if (value === "oldest") {
          let values = (!chainsDatas ? statusFilterData : chainsDatas);
          let oldest = values.sort(function (a, b) { return (new Date(a.createdOn)).getTime() - (new Date(b.createdOn)).getTime() });
          setCarddata(oldest);
        }
      }
    }
    // else if(statusFilter === "chains"){
    //   if (value === "Eth" || value === "Mumbai" || value === "Bnb") {
    //     let data = statusFilterData.filter((val) => val.blockchainType === value);
    //     setCarddata(data);
    //     setChainsData(data);
    //   }
    //   else if (value === "all") {
    //     setCarddata(chainsDatas);
    //   }
    //   else if (value === "ongoing") {
    //     let data = chainsDatas.filter((val) => val.nftStatus === "onSale");
    //     setCarddata(data);
    //   }
    //   else if (value === "upcoming") {
    //     let data = chainsDatas.filter((val) => val.nftStatus === "active");
    //     setCarddata(data);
    //   }
    // }
  }

  const onStatusFilters = (value) => {
    if (value === "onSale") {
      let data = Nfts.filter((val) => val.nftStatus === "onSale");
      setCarddata(data);
      setStatusFilter("status");
      setStatusFilterData(data);
    }
    else if (value === "onAuction") {
      let data = Nfts.filter((val) => val.nftStatus === "onAuction");
      setCarddata(data);
      setStatusFilter("status");
      setStatusFilterData(data);
    }
  }

  const onChainsFilters = (value) => {
    let data = Nfts.filter((val) => val.blockchainType === value);
    setCarddata(data);
    setStatusFilter("chains");
    setStatusFilterData(data);
  }

  const onItemsfilter = (value) => {
    if (value === "all") {
      setCarddata(Nfts);
    }
    else if (value === "ongoing") {
      let data = Nfts.filter((val) => val.nftStatus === ("onSale" || "onAuction"));
      setCarddata(data);
    }
    else if (value === "upcoming") {
      let data = Nfts.filter((val) => val.nftStatus === "active");
      setCarddata(data);
    }
  }

  const onSortbyfilter = (value) => {
    if (value === "highest") {
      let data = Nfts.sort(function (a, b) { return (Number(!b.nftPrice ? 0 : b.nftPrice)) - (Number(!a.nftPrice ? 0 : a.nftPrice)) });
      setCarddata(data);
    }
    else if (value === "lowest") {
      let data = Nfts.sort(function (a, b) { return (Number(!a.nftPrice ? 0 : a.nftPrice)) - (Number(!b.nftPrice ? 0 : b.nftPrice)) });
      setCarddata(data);
    }
    else if (value === "recent") {
      const data = Nfts.sort(function (a, b) { return (new Date(b.createdOn)).getTime() - (new Date(a.createdOn)).getTime() });
      setCarddata(data);
    }
    else if (value === "oldest") {
      let oldest = Nfts.sort(function (a, b) { return (new Date(a.createdOn)).getTime() - (new Date(b.createdOn)).getTime() });
      setCarddata(oldest);
    }
  }

  useEffect(() => {
    getCollections();
    getUsers();
    getActivity();
    setCheckitem("item");
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Container fluid className="mt-5" style={{ width: "95%" }}>
        <Fade bottom>
          <Stack gap={4}>
            <Grid lg={12} xs={12} container justifyContent={{ lg: "space-between", xs: "center" }} alignItems="center">
              <Grid lg={8} xs={12} container justifyContent={{ lg: "space-between", xs: "center" }} alignItems="center">
                <Grid lg={3} xs={7} container justifyContent="flex-start" sx={{ overflow: "hidden" }}>
                  {!CollectionsNfts?.logoImage ? (<>
                    <Avatar alt="user" className="img-zoom-animation w-100 h-100" />
                  </>) : (<>
                    <Avatar src={process.env.REACT_APP_S3_LINK + CollectionsNfts?.logoImage} alt="user" className="img-zoom-animation w-100 h-100" />
                  </>)}
                  {/* <Image src={robot} className="img-zoom-animation w-100 h-100" alt="nftlist" fluid /> */}
                </Grid>
                <Grid lg={8.7} xs={12} container alignItems={{ lg: "flex-start", xs: "center" }} direction="column">
                  <h4 className="text-light text-start m-0">{CollectionsNfts?.collectionName}</h4>
                  <font className="nftlist-text text-justify text-start mt-2">{CollectionsNfts?.collectionDescription}</font>
                  {/* <font className="nftlist-text text-justify text-start">Lorem Ipsum has been the industry&apos;s standard dummy text ever since</font>
                  <font className="nftlist-text text-justify text-start">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </font>
                  <font className="nftlist-text text-justify text-start">Lorem Ipsum has been the industry&apos;s standard dummy text ever since</font> */}
                  <Grid lg={6} xs={12} container className="mt-2" justifyContent={{ lg: "flex-start", xs: "center" }}>
                    <button className="glow-on-hover mb-2">
                      <small className="text-light">Created By-<span className="text-info text-capitalize">{users?.userName}</span></small>
                    </button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid lg={3.6} xs={12}  >
                <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                  <Grid lg={3} xs={3} container alignItems="flex-start" direction="column">
                    <div className="d-flex justify-content-between">
                      <HiClipboardDocumentList className="text-light mr-1" />
                      <h6 className="text-light m-0">{Nfts?.length}</h6>
                    </div>
                    <small className="nftlist-text text-bold">Items</small>
                  </Grid>
                  <Grid lg={3} xs={3} container alignItems="flex-start" direction="column">
                    <div className="d-flex justify-content-between">
                      <BsFillPersonFill className="text-light mr-1" />
                      <h6 className="text-light m-0">1</h6>
                    </div>
                    <small className="nftlist-text text-bold">Owners</small>
                  </Grid>
                  <Grid lg={3} xs={3} container alignItems="flex-start" direction="column">
                    <div className="d-flex justify-content-between">
                      <SiEthereum className="text-light mr-1" />
                      <h6 className="text-light m-0">{!CollectionsNfts?.floorPrice ? "0" : CollectionsNfts?.floorPrice}</h6>
                    </div>
                    <small className="nftlist-text text-bold">Floor Price</small>
                  </Grid>
                  <Grid lg={12} xs={12} className="mt-2">
                    <Button className="collectionbutton">
                      <h6 className="text-muted m-0" >Volume  Price -</h6>
                      <img src={nfticons2} className="img-fluid mx-2" alt="nftlist" />
                      <h6 className="text-light m-0">0 ETH</h6>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid lg={12} xs={12} container justifyContent={{ lg: "space-between", xs: "center" }}>
              {width > 600 ? (<>
                <Grid lg={3} xs={12} className="mt-2">
                  <Grid lg={12} xs={12} container>
                    <Grid lg={6} xs={6} container justifyContent="flex-start">
                      <h6 className="text-light text-muted">Price</h6>
                    </Grid>
                    <Grid lg={6} xs={6} container justifyContent={{ lg: "flex-start", xs: "flex-end" }}>
                      <h6 className="text-light text-muted text-start">Rarity</h6>
                    </Grid>
                  </Grid>
                  <Grid lg={12} xs={12} container >
                    <Grid lg={6} xs={6} container justifyContent="flex-start" sx={{ position: "relative" }}>
                      <input className="nav-input" style={{ width: "68%", height: "50px", color: "#adb5bd", borderRadius: "12px", fontSize: "14px", fontWeight: "400", paddingLeft: "18%" }} value={value[0] + "-" + value[1]} />
                    </Grid>
                    <Grid lg={6} xs={6} container justifyContent={{ lg: "flex-start", xs: "flex-end" }} sx={{ position: "relative" }}>
                      <input className="nav-input" style={{ width: "68%", height: "50px", color: "#adb5bd", borderRadius: "12px", fontSize: "14px", fontWeight: "400", paddingLeft: "18%" }} value={value1[0] + "-" + value1[1]} />
                    </Grid>
                  </Grid>
                  <Grid lg={10} xs={12} container justifyContent="space-between" alignItems="center" className="mt-2">
                    <font className="text-light">Filter</font>
                    <font className="text-warning pointer" role="presentation" onClick={() => reset()}>Reset</font>
                  </Grid>
                  <Grid lg={9.7} xs={12} container className="mt-2">
                    <font size={2} className="text-light text-bold" >Price</font>
                    <Slider
                      getAriaLabel={() => "Minimum distance"}
                      valueLabelDisplay="auto"
                      className="sliding mx-2 mt-2"
                      value={value}
                      onChange={(e) => { handleinputchange(e.target.value); }}
                      min={0}
                      max={0.9}
                      step={0.002}
                      disableSwap
                    />
                  </Grid>
                  <Grid lg={9.7} xs={12} container className="mt-2">
                    <font size={2} className="text-light text-bold">Rarity</font>
                    <Slider
                      getAriaLabel={() => "Minimum distance"}
                      className="sliding mx-2 mt-2"
                      valueLabelDisplay="auto"
                      value={value1}
                      onChange={(e) => { handleinputchange1(e.target.value); }}
                      min={0}
                      max={100}
                      step={1}
                      disableSwap
                    />
                  </Grid>
                  <Grid lg={11.5} xs={12} container className="mt-3">
                    <Grid lg={3} xs={3} container direction="column">
                      <div className="dropdown2">
                        <Avatar className="chaincircle">
                          <TbWaveSawTool />
                        </Avatar>
                        <font size={2} className="text-light">Status</font>
                        <div className="dropdown2-content pointer">
                          <li href="Sale" className="listinprofiletab" role="presentation" onClick={() => onStatusFilters("onSale")}>On Sale</li>
                          <li href="Auction" className="listinprofiletab1" role="presentation" onClick={() => onStatusFilters("onAuction")}>On Auction</li>
                        </div>
                      </div>
                    </Grid>
                    <Grid lg={3} xs={3} container direction="column">
                      <div className="dropdown2">
                        <Avatar className="chaincircle">
                          <TbUnlink />
                          {/* <Image src={chain} fluid className="img-zoom-animation" /> */}
                        </Avatar>
                        <font size={2} className="text-muted">Chains</font>
                        <div className="dropdown2-content pointer">
                          {statusFilter === "status" ? (<>
                            <li className="listinprofiletab" role="presentation" onClick={() => handleallfilters("Eth","chain")}>ETH</li>
                            <li role="presentation" onClick={() => handleallfilters("Bnb","chain")}>BNB</li>
                            <li className="listinprofiletab1" role="presentation" onClick={() => handleallfilters("Mumbai","chain")}>Matic</li>
                          </>) : (<>
                            <li className="listinprofiletab" role="presentation" onClick={() => onChainsFilters("Eth")}>ETH</li>
                            <li role="presentation" onClick={() => onChainsFilters("Bnb")}>BNB</li>
                            <li className="listinprofiletab1" role="presentation" onClick={() => onChainsFilters("Mumbai")}>Matic</li>
                          </>)}
                        </div>
                      </div>
                    </Grid>
                    <Grid lg={3} xs={3} container direction="column">
                      <div className="dropdown2">
                        <Avatar className="chaincircle">
                          <HiClipboardDocumentList className="text-light" />
                        </Avatar>
                        <font size={2} className="text-muted">Items</font>
                        <div className="dropdown2-content pointer">
                          {statusFilter === "status" ? (<>
                            <li className="listinprofiletab" role="presentation" onClick={() => handleallfilters("all","item")}>All</li>
                            <li role="presentation" onClick={() => handleallfilters("ongoing","item")}>OnGoging</li>
                            <li className="listinprofiletab1" role="presentation" onClick={() => handleallfilters("upcoming","item")}>Upcoming</li>
                          </>) : (<>
                            <li className="listinprofiletab" role="presentation" onClick={() => onItemsfilter("all")}>All</li>
                            <li role="presentation" onClick={() => onItemsfilter("ongoing")}>OnGoging</li>
                            <li className="listinprofiletab1" role="presentation" onClick={() => onItemsfilter("upcoming")}>Upcoming</li>
                          </>)}
                        </div>
                      </div>
                    </Grid>
                    <Grid lg={3} xs={3} container direction="column">
                      <div className="dropdown2">
                        <Avatar className="chaincircle">
                          <BsSortUpAlt />
                          {/* <Image src={sortby} fluid className="img-zoom-animation" /> */}
                        </Avatar>
                        <font size={2} className="text-muted">Sortby</font>
                        <div className="dropdown2-content pointer">
                          {statusFilter === "status" ? (<>
                            <li className="listinprofiletab" role="presentation" onClick={() => handleallfilters("highest","sort")}>Price by highest</li>
                            <li role="presentation" onClick={() => handleallfilters("lowest","sort")}>Price by lowest</li>
                            <li role="presentation" onClick={() => handleallfilters("recent","sort")}>Recent on top</li>
                            <li className="listinprofiletab1" role="presentation" onClick={() => handleallfilters("oldest","sort")}>Oldest on top</li>
                          </>) : (<>
                            <li className="listinprofiletab" role="presentation" onClick={() => onSortbyfilter("highest")}>Price by highest</li>
                            <li role="presentation" onClick={() => onSortbyfilter("lowest")}>Price by lowest</li>
                            <li role="presentation" onClick={() => onSortbyfilter("recent")}>Recent on top</li>
                            <li className="listinprofiletab1" role="presentation" onClick={() => onSortbyfilter("oldest")}>Oldest on top</li>
                          </>)}
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid lg={10} xs={12} container alignItems="center" justifyContent="space-between" className="mt-3">
                    <Grid lg={4} xs={4} container >
                      <button className="glow-on-hover">Buy Now</button>
                    </Grid>
                    <Grid lg={4} xs={4} container>
                      <button className="glow-on-hover">New</button>
                    </Grid>
                  </Grid>
                  <Grid lg={10} xs={12} container alignItems="center" justifyContent="space-between" className="mt-3">
                    <Grid lg={4} xs={4} container >
                      <button className="glow-on-hover">On Auction</button>
                    </Grid>
                    <Grid lg={4} xs={4} container>
                      <button className="glow-on-hover">Featured</button>
                    </Grid>
                  </Grid>
                </Grid>
              </>) : (<></>)}
              <Grid lg={9} xs={12} className="mobileviewnftitems">
                <Grid lg={12} xs={12} container justifyContent="space-between">
                  <Grid lg={2} xs={3} container justifyContent={{ lg: "space-between", xs: "flex-start" }} alignItems="center">
                    <div className={checkitems === "item" ? "nft-click d-flex text-light pointer" : "d-flex text-muted nft-click1 pointer"} role="presentation" onClick={() => handlechange("item")}>
                      <HiClipboardDocumentList className="mr-1" />
                      <h6 className="m-0">Items</h6>
                    </div>
                  </Grid>
                  <Grid lg={10} xs={3} container justifyContent={{ lg: "space-between", xs: "center" }} alignItems="center">
                    <div className={checkitems === "active" ? "nft-click d-flex align-items-center text-light pointer" : "d-flex text-muted align-items-center nft-click1 pointer"} role="presentation" onClick={() => { handlechange("active"); }}>
                      <MdNotificationsActive className="mr-1" />
                      <h6 className="m-0">Activity</h6>
                    </div>
                  </Grid>
                  {width > 600 ? (<></>) : (<>
                    <Grid lg={2} xs={3} container justifyContent={{ lg: "space-between", xs: "flex-end" }} onClick={() => { sortbydrop === false ? sortbBydDrops(true) : sortbBydDrops(false) }}>
                      <Avatar className="socialiconspf pointer"><CgSortAz /></Avatar>
                    </Grid>
                    {sortbydrop === true ? (<>
                      <Grid lg={3} xs={12} className="mt-2">
                        <Grid lg={12} xs={12} container>
                          <Grid lg={6} xs={6} container justifyContent="flex-start">
                            <h6 className="text-light text-muted">Price</h6>
                          </Grid>
                          <Grid lg={6} xs={6} container justifyContent={{ lg: "flex-start", xs: "flex-end" }}>
                            <h6 className="text-light text-muted text-start">Rarity</h6>
                          </Grid>
                        </Grid>
                        <Grid lg={12} xs={12} container justifyContent="space-between">
                          <Grid lg={6} xs={5} container>
                            <input className="mobilescreennftinput" value={value[0] + "-" + value[1]} />
                          </Grid>
                          <Grid lg={6} xs={5} container>
                            <input className="mobilescreennftinput" value={value1[0] + "-" + value1[1]} />
                          </Grid>
                        </Grid>
                        <Grid lg={10} xs={12} container justifyContent="space-between" alignItems="center" className="mt-2">
                          <font className="text-light">Filter</font>
                          <font className="text-warning pointer" role="presentation" onClick={() => reset()}>Reset</font>
                        </Grid>
                        <Grid lg={9.7} xs={12} container className="mt-2">
                          <font size={2} className="text-light text-bold" >Price</font>
                          <Slider
                            getAriaLabel={() => "Minimum distance"}
                            valueLabelDisplay="auto"
                            className="sliding mx-2 mt-2"
                            value={value}
                            onChange={(e) => { handleinputchange(e.target.value); }}
                            min={0}
                            max={0.9}
                            step={0.002}
                            disableSwap
                          />
                        </Grid>
                        <Grid lg={9.7} xs={12} container className="mt-2">
                          <font size={2} className="text-light text-bold">Rarity</font>
                          <Slider
                            getAriaLabel={() => "Minimum distance"}
                            className="sliding mx-2 mt-2"
                            valueLabelDisplay="auto"
                            value={value1}
                            onChange={(e) => { handleinputchange1(e.target.value); }}
                            min={0}
                            max={100}
                            step={1}
                            disableSwap
                          />
                        </Grid>
                        <Grid lg={11.5} xs={12} container className="mt-3">
                          <Grid lg={3} xs={3} container direction="column">
                            <div className="dropdown2">
                              <Avatar className="chaincircle">
                                <TbWaveSawTool />
                              </Avatar>
                              <font size={2} className="text-light">Status</font>
                              <div className="dropdown2-content pointer">
                                <li href="Sale" className="listinprofiletab" role="presentation" onClick={() => onStatusFilters("onSale")}>On Sale</li>
                                <li href="Auction" className="listinprofiletab1" role="presentation" onClick={() => onStatusFilters("onAuction")}>On Auction</li>
                              </div>
                            </div>
                          </Grid>
                          <Grid lg={3} xs={3} container direction="column">
                            <div className="dropdown2">
                              <Avatar className="chaincircle">
                                <TbUnlink />
                                {/* <Image src={chain} fluid className="img-zoom-animation" /> */}
                              </Avatar>
                              <font size={2} className="text-muted">Chains</font>
                              <div className="dropdown2-content pointer">
                                {statusFilter === "status" ? (<>
                                  <li className="listinprofiletab" role="presentation" onClick={() => handleallfilters("Eth","chain")}>ETH</li>
                                  <li role="presentation" onClick={() => handleallfilters("Bnb","chain")}>BNB</li>
                                  <li className="listinprofiletab1" role="presentation" onClick={() => handleallfilters("Mumbai","chain")}>Matic</li>
                                </>) : (<>
                                  <li className="listinprofiletab" role="presentation" onClick={() => onChainsFilters("Eth")}>ETH</li>
                                  <li role="presentation" onClick={() => onChainsFilters("Bnb")}>BNB</li>
                                  <li className="listinprofiletab1" role="presentation" onClick={() => onChainsFilters("Mumbai")}>Matic</li>
                                </>)}
                              </div>
                            </div>
                          </Grid>
                          <Grid lg={3} xs={3} container direction="column">
                            <div className="dropdown2">
                              <Avatar className="chaincircle">
                                <HiClipboardDocumentList className="text-light" />
                              </Avatar>
                              <font size={2} className="text-muted">Items</font>
                              <div className="dropdown2-content pointer">
                                {statusFilter === "status" ? (<>
                                  <li className="listinprofiletab" role="presentation" onClick={() => handleallfilters("all","item")}>All</li>
                                  <li role="presentation" onClick={() => handleallfilters("ongoing","item")}>OnGoging</li>
                                  <li className="listinprofiletab1" role="presentation" onClick={() => handleallfilters("upcoming","item")}>Upcoming</li>
                                </>) : (<>
                                  <li className="listinprofiletab" role="presentation" onClick={() => onItemsfilter("all")}>All</li>
                                  <li role="presentation" onClick={() => onItemsfilter("ongoing")}>OnGoging</li>
                                  <li className="listinprofiletab1" role="presentation" onClick={() => onItemsfilter("upcoming")}>Upcoming</li>
                                </>)}
                              </div>
                            </div>
                          </Grid>
                          <Grid lg={3} xs={3} container direction="column">
                            <div className="dropdownsortby">
                              <Avatar className="chaincircle">
                                <BsSortUpAlt />
                                {/* <Image src={sortby} fluid className="img-zoom-animation" /> */}
                              </Avatar>
                              <font size={2} className="text-muted">Sortby</font>
                              <div className="dropdownsortby-content pointer">
                                {statusFilter === "status" ? (<>
                                  <li className="listinprofiletab" role="presentation" onClick={() => handleallfilters("highest","sort")}>Price by highest</li>
                                  <li role="presentation" onClick={() => handleallfilters("lowest","sort")}>Price by lowest</li>
                                  <li role="presentation" onClick={() => handleallfilters("recent","sort")}>Recent on top</li>
                                  <li className="listinprofiletab1" role="presentation" onClick={() => handleallfilters("oldest","sort")}>Oldest on top</li>
                                </>) : (<>
                                  <li className="listinprofiletab" role="presentation" onClick={() => onSortbyfilter("highest")}>Price by highest</li>
                                  <li role="presentation" onClick={() => onSortbyfilter("lowest")}>Price by lowest</li>
                                  <li role="presentation" onClick={() => onSortbyfilter("recent")}>Recent on top</li>
                                  <li className="listinprofiletab1" role="presentation" onClick={() => onSortbyfilter("oldest")}>Oldest on top</li>
                                </>)}
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                        <Grid lg={10} xs={12} container alignItems="center" justifyContent="space-between" className="mt-3">
                          <Grid lg={4} xs={4} container >
                            <button className="glow-on-hover">Buy Now</button>
                          </Grid>
                          <Grid lg={4} xs={4} container>
                            <button className="glow-on-hover">New</button>
                          </Grid>
                        </Grid>
                        <Grid lg={10} xs={12} container alignItems="center" justifyContent="space-between" className="mt-3">
                          <Grid lg={4} xs={4} container >
                            <button className="glow-on-hover">On Auction</button>
                          </Grid>
                          <Grid lg={4} xs={4} container>
                            <button className="glow-on-hover">Featured</button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>) : (<></>)}
                  </>)}
                </Grid>
                <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" className="mt-3">
                  {checkitems === "item" ? (<>
                    <Grid lg={10} xs={12} container>
                      <font className="text-muted">Show Results of {carddata?.length}</font>
                    </Grid>
                    {carddata?.length > 0 ? (<>
                      <Grid lg={12} xs={12} container className="mt-4" justifyContent="space-between">
                        {carddata.map((item, i) => {
                          return (<>
                            <Grid lg={2.8} xs={12} container justifyContent="center" alignItems="center" sx={{ marginBottom: "2%" }}>
                              {/* <Box className="radius-lg homecards2 w-100 h-100 mb-3 card-zoom-animation">
                                <Grid lg={12} xs={12} container sx={{ padding: "2% 4%" }}>
                                  <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                    <h5 className="cardsworld">{item.text1}</h5>
                                    <span className="cardsworld"><BsThreeDots /></span>
                                  </Grid>
                                </Grid>
                                <Grid lg={12} xs={12} container className="" justifyContent="space-between" alignItems="center" sx={{ padding: "0% 4%" }}>
                                  <Grid lg={8} xs={8} container justifyContent="flex-start" alignItems="center">
                                    <Image src={item.img1} className="home-rightlogo img-zoom-animation" alt="homeimg" fluid width="25" height="25"/>
                                    <small className="colorart1 text-light mx-2">{item.text2}</small>
                                  </Grid>
                                  <Grid lg={4} xs={4} container justifyContent="flex-end">
                                    <Box sx={{backgroundColor:"#3e3e4f",color: "darkgrey",borderRadius:"10px",width:"52px"}}>
                                      <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                        <font size={1} className="mx-2 text-light">{item.text3}</font>
                                        {item.status === false ? (<>
                                          <Avatar className="heartsdislike" onClick={() => likeCards("like",i)}><IoMdHeart className="" style={{ color: "white" }} size={18} /></Avatar>
                                        </>) : (<>
                                          <Avatar className="heartslike" onClick={() => likeCards("dislike",i)}><IoMdHeart className="" style={{ color: "white" }} size={18} /></Avatar>
                                        </>)}
                                      </Grid>
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Grid lg={12} xs={12} container className="mt-2" justifyContent="center" alignItems="" sx={{ padding: "1%" }}>
                                  <Grid lg={11} xs={11} container className="cardsalientimer">
                                    <Grid lg={3} xs={3} container justifyContent="center"><h6 className="days">{days}</h6><span className="hours">D</span><span className="divider"></span></Grid>
                                    <Grid lg={3} xs={3} container justifyContent="center"><h6 className="days">{hours}</h6><span className="hours">H</span><span className="divider"></span></Grid>
                                    <Grid lg={3} xs={3} container justifyContent="center"><h6 className="days">{minutes}</h6><span className="hours">M</span><span className="divider"></span></Grid>
                                    <Grid lg={3} xs={3} container justifyContent="center"><h6 className="days">{seconds}</h6><span className="hours">S</span></Grid>
                                  </Grid>
                                </Grid>
                                <Grid lg={12} xs={12} container sx={{ padding: "0% 5%" }}>
                                  <Image src={item.img2} role="presentation" alt="homeimg" fluid onClick={() => navigate("/nftdetails", { state: { item: item, id: item.id } })}/>
                                </Grid>
                                <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" className="mt-2" sx={{ padding: "0% 4%" }}>
                                  <Grid lg={6} xs={6} container>
                                    <h6 className="colorart">Current Bid</h6>
                                    <h6 className="jackobson mx-1 text-light">{item.text4}</h6>
                                  </Grid>
                                  <Grid lg={3} xs={6} container justifyContent="flex-end">
                                    <button className="pushable w-100 h-75" onClick={() => setOpen(true)}>
                                      <span className="mainbutton w-100 h-75">
                                        Bid
                                      </span>
                                    </button>
                                  </Grid>
                                </Grid>
                              </Box> */}
                              {console.log("users",users)}
                              <Box className="radius-lg homecards2 w-100 h-100 mb-3" sx={{ padding: "2%" }}>
                                <Grid lg={12} xs={12} container sx={{ padding: "2% 5%" }}>
                                  <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                    <h6 className="cardsworld m-0">{item?.nftName > 18 ? item?.nftName?.slice(0, 18)+".." : item?.nftName}</h6>
                                    <span className="cardsworld"><BsThreeDots /></span>
                                  </Grid>
                                </Grid>
                                <Grid lg={12} xs={12} container className="" justifyContent="space-between" alignItems="center" sx={{ padding: "2% 5%" }}>
                                  <Grid lg={8} xs={8} container justifyContent="flex-start" alignItems="center">
                                    {item?.ownerProfile ? (<>
                                      <Image src={process.env.REACT_APP_S3_LINK + item?.ownerProfile} className="home-rightlogo img-zoom-animation pointer" alt="homeimg" fluid width="25" height="25" role="presentation" onClick={() => navigate("/profile")} />
                                      <small className="colorart1 text-light text-capitalize mx-2">{item?.ownerName?.length > 10 ? item?.ownerName?.slice(0, 12) : item?.ownerName}</small>
                                    </>) : (<>
                                      <Avatar sx={{ width: "20px", height: "20px", cursor: "pointer" }} role="presentation" onClick={() => navigate("/profile")} />
                                      <small className="colorart1 text-light text-capitalize mx-2">{item?.walletAddress?.slice(0, 5) + "..." + item?.walletAddress?.slice(-5)}</small>
                                    </>)}
                                  </Grid>
                                  <Grid lg={3} xs={3} container justifyContent="flex-end">
                                    {/* <span className="iocircle1">{item.text3}<IoHeartCircleSharp className="circleSharp" size={34} /></span> */}
                                    <Box sx={{ backgroundColor: "#3e3e4f", color: "darkgrey", borderRadius: "10px", width: "100%" }} >
                                      <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ paddingLeft: "6%" }}>
                                        <font size={1} className="text-light" >{item?.likes?.length}</font>
                                        {item.likes && item.likes.filter((val) => val.walletAddress === wallet.address).length > 0 ? (<>
                                          <Avatar className="heartslike pointer" onClick={() => updateLikes("dislike", item)}><IoMdHeart style={{ color: "white" }} size={14} /></Avatar>
                                        </>) : (<>
                                          <Avatar className="heartsdislike pointer" onClick={() => updateLikes("like", item)}><IoMdHeart style={{ color: "white" }} size={14} /></Avatar>
                                        </>)}
                                      </Grid>
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Grid lg={12} xs={12} container alignItem="center" justifyContent="center" sx={{ padding: "0% 5%", position: "relative" }}>
                                  {item?.nftStatus === "onAuction" ? (<>
                                    <Grid lg={10.9} xs={10.9} container justifyContent="center" alignItems="center" className="nftauctioncard" sx={{zIndex:"5"}}>
                                      <CountdownTimer targetDate={item?.soldTime} />
                                    </Grid>
                                  </>) : (<></>)}
                                  <Grid lg={12} xs={12} container sx={{ overflow: "hidden"}} role="presentation" onClick={() => updateView(item)}>
                                    {!item?.nftImage ? (<>
                                      <Link to={`/nftdetails/${item._id}`} className="linkProperty" rel="noopener noreferrer"><Image className="pointer img-zoom-animation" style={{ width: "500px", height: "100%" }} alt="homeimg" fluid /></Link>
                                    </>) : (<>
                                      <Link to={`/nftdetails/${item._id}`} className="linkProperty" rel="noopener noreferrer"><Image src={process.env.REACT_APP_S3_LINK + item?.nftImage} className={item?.nftStatus === "onAuction" ? "nftauctioncardimg pointer img-zoom-animation" : "pointer img-zoom-animation"} style={{ width: "500px", height: "100%" }} alt="homeimg" fluid /></Link>
                                    </>)}
                                  </Grid>
                                </Grid>
                                <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "2% 4%" }}>
                                  {item?.nftPrice !== "" && item.walletAddress !== wallet.address && item?.nftStatus === "onAuction" ? (<>
                                    <Grid lg={6} xs={6} container direction="column">
                                      <small className="colorart">Current Bid</small>
                                      <small className="mx-1 text-light">{item?.nftPrice} ETH</small>
                                    </Grid>
                                    <Grid lg={4} xs={4} container>
                                      <Button className="btns connectpad popinsMd" onClick={() => setOpen(true)}>Bid</Button>
                                    </Grid>
                                  </>) : item?.nftPrice !== "" && item.walletAddress !== wallet.address && item?.nftStatus === "onSale" ? (<>
                                    <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                      <small className="colorart">Current Bid</small>
                                      <small className="mx-1 text-light">{item?.nftPrice} ETH</small>
                                    </Grid>
                                  </>) : item?.nftPrice !== "" && item.walletAddress === wallet.address ? (<>
                                    <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                      <small className="colorart">Current Bid</small>
                                      <small className="mx-1 text-light">{!item?.nftPrice ? "0" : item?.nftPrice} ETH</small>
                                    </Grid>
                                  </>) : item?.nftPrice === "" && item.walletAddress === wallet.address ? (<>
                                    <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                      <small className="colorart">Current Bid</small>
                                      <small className="mx-1 text-light">0 ETH</small>
                                    </Grid>
                                  </>) : (<>
                                    <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                      <small className="colorart">Current Bid</small>
                                      <small className="mx-1 text-light">0 ETH</small>
                                    </Grid>
                                  </>)}
                                </Grid>
                              </Box>
                            </Grid>
                          </>);
                        })}
                      </Grid>
                    </>) : (<>
                      <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ marginTop: "15%" }}>
                        <h5 className="text-light">No items to display</h5>
                      </Grid>
                    </>)}
                  </>) : (<>
                    <Grid lg={12} xs={12} container>
                      <Grid lg={4} xs={12} container>
                        <Select
                          styles={customStyles}
                          className="w-100"
                          options={ActivitySelect}
                          placeholder="All"
                          components={{
                            IndicatorSeparator: () => null,
                          }}
                          onChange={(e) => handleSelectChange(e.value)}
                        />
                      </Grid>
                    </Grid>
                    <Grid lg={12} xs={12} sx={{ overflow: "auto" }}>
                      <ActivityTables ActiveTabledata={ActiveTableData} usersData={users} />
                    </Grid>
                  </>)}
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Fade>
      </Container>
      <WalletConnect openWallet={open} setOpenWallet={setOpen} />
    </div >
  );
}
export default Nftlist;