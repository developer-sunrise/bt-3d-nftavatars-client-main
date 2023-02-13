import React, { useState, useEffect } from "react";
import { Grid, Avatar, Box, Button } from "@mui/material";
import { Container, Image, Stack } from "react-bootstrap";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { BsThreeDots, BsSortUpAlt, BsBoxArrowLeft } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { CgSortAz } from "react-icons/cg";
import { TbUnlink, TbWaveSawTool } from "react-icons/tb";
import Slider from "@mui/material/Slider";
import "./nftlist.css";
import { Link, useNavigate,useLocation } from "react-router-dom";
// import { nftcardData } from "../../helpers/datafile";
import WalletConnect from "../../components/makeOffers/index";
import ActivityTables from "../../components/table/ActivityTable/TotalActivityTable";
// import Activity from "../Userprofile/Profile";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import ScrollToTop from "../../helpers/scrollTop";
import Select from "react-select";
import CountdownTimer from "../../components/timer/CountDownTimer";
// import { ActivityTB } from "../../helpers/datafile";
import { getMethod, putMethod } from "../../apis/index";

function TotalNftlist() {

  const location = useLocation();
  let HomeNfts = location?.state?.nfts;

  let width = window.innerWidth;
  const navigate = useNavigate();
  const wallet = useSelector((state) => state.WalletConnect);

  const [checkitems, setCheckitem] = useState("");
  const [carddata, setCarddata] = useState([]);
  const [open, setOpen] = useState(false);
  const [sortbydrop, sortbBydDrops] = useState(false);
  const [statusFilterData, setStatusFilterData] = useState("");
  const [Nfts, setNfts] = useState([]);
  const [ActiveTableData, setActiveTableData] = useState([]);
  const [ActiveTableData1, setActiveTableData1] = useState([]);

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

  const getNFTs = async () => {
    try {
      let url = "GetNfts";
      let response = await getMethod({ url });
      if (response.status) {
        const results = response.return;
        setCarddata(results);
        setNfts(results);
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
        if(!HomeNfts){
          setActiveTableData(response.result);
          setActiveTableData1(response.result);
        }
        else{
          let result = response.result;
          let result1 = [];
          for(let i=0;i<HomeNfts.length;i++){
            let data = result.filter((val) => val.nftId === HomeNfts[i]._id);
            result1.push(...data);
          }
          setActiveTableData(result1);
          setActiveTableData1(result1);
        }
      }
    }
    catch (e) {
      console.log("error in addusers", e);
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
          getNFTs();
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
          getNFTs();
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
        getNFTs();
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

  const reset = async () => {
    setCarddata(Nfts);
    setStatusFilterData("");
    setValue([0, 1]);
    setValue1([0, 100]);
  };

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


  const onStatusFilters = (value) => {
    if (value === "onSale") {
      let data = Nfts.filter((val) => val.nftStatus === "onSale");
      setCarddata(data);
      setStatusFilterData("onSale");
    }
    else if (value === "onAuction") {
      let data = Nfts.filter((val) => val.nftStatus === "onAuction");
      setCarddata(data);
      setStatusFilterData("onAuction");
    }
  }

  const onChainsFilters = (value) => {
    let data = Nfts.filter((val) => val.blockchainType === value);
    setCarddata(data);
    setStatusFilterData(value);
  }

  const onItemsfilter = (value) => {
    if (value === "all") {
      setCarddata(Nfts);
      setStatusFilterData("Items");
    }
    else if (value === "ongoing") {
      let data = Nfts.filter((val) => val.nftStatus === ("onSale"));
      let data1 = Nfts.filter((val) => val.nftStatus === ("onAuction"));
      setCarddata([...data, ...data1]);
      setStatusFilterData("onGoing");
    }
    else if (value === "upcoming") {
      let data = Nfts.filter((val) => val.nftStatus === "active");
      setCarddata(data);
      setStatusFilterData("upComing");
    }
  }

  const onSortbyfilter = (value) => {
    if (value === "highest") {
      let data = Nfts.sort(function (a, b) { return (Number(!b.nftPrice ? 0 : b.nftPrice)) - (Number(!a.nftPrice ? 0 : a.nftPrice)) });
      setCarddata(data);
      setStatusFilterData("Highest to lowest price");
    }
    else if (value === "lowest") {
      let data = Nfts.sort(function (a, b) { return (Number(!a.nftPrice ? 0 : a.nftPrice)) - (Number(!b.nftPrice ? 0 : b.nftPrice)) });
      setCarddata(data);
      setStatusFilterData("Lowest to highest price");
    }
    else if (value === "recent") {
      const data = Nfts.sort(function (a, b) { return (new Date(b.createdOn)).getTime() - (new Date(a.createdOn)).getTime() });
      setCarddata(data);
      setStatusFilterData("Recent NFTs");
    }
    else if (value === "oldest") {
      let oldest = Nfts.sort(function (a, b) { return (new Date(a.createdOn)).getTime() - (new Date(b.createdOn)).getTime() });
      setCarddata(oldest);
      setStatusFilterData("Oldest NFTs");
    }
  }

  useEffect(() => {
    if(HomeNfts){
      setCarddata(HomeNfts);
      setNfts(HomeNfts);
      getActivity();
      setCheckitem("item");
    }
    else{
      getNFTs();
      getActivity();
      setCheckitem("item");
    }
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Grid lg={12} xs={12} container sx={{ padding: "0% 4%" }}>
        <Avatar className="socialiconspf pointer" sx={{ width: "50px", height: "50px" }} onClick={() => window.history.back()}>
          <BsBoxArrowLeft />
        </Avatar>
      </Grid>
      <Container fluid className="" style={{ width: "95%" }}>
        <Fade bottom>
          <Stack gap={4}>
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
                    <Grid lg={6} xs={6} container justifyContent="flex-start">
                      <Grid lg={9} xs={9} container>
                        <input className="allnftsfilterinput" value={value[0] + "-" + value[1]} />
                      </Grid>
                    </Grid>
                    <Grid lg={6} xs={6} container justifyContent={{ lg: "flex-start", xs: "flex-end" }}>
                      <Grid lg={9} xs={9} container>
                        <input className="allnftsfilterinput" value={value1[0] + "-" + value1[1]} />
                      </Grid>
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
                          <li className="listinprofiletab" role="presentation" onClick={() => onChainsFilters("Eth")}>ETH</li>
                          <li role="presentation" onClick={() => onChainsFilters("Bnb")}>BNB</li>
                          <li className="listinprofiletab1" role="presentation" onClick={() => onChainsFilters("Mumbai")}>Matic</li>
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
                          <li className="listinprofiletab" role="presentation" onClick={() => onItemsfilter("all")}>All</li>
                          <li role="presentation" onClick={() => onItemsfilter("ongoing")}>OnGoging</li>
                          <li className="listinprofiletab1" role="presentation" onClick={() => onItemsfilter("upcoming")}>Upcoming</li>
                        </div>
                      </div>
                    </Grid>
                    <Grid lg={3} xs={3} container direction="column">
                      <div className="dropdown2">
                        <Avatar className="chaincircle">
                          <BsSortUpAlt />
                        </Avatar>
                        <font size={2} className="text-muted">Sortby</font>
                        <div className="dropdown2-content pointer">
                          <li className="listinprofiletab" role="presentation" onClick={() => onSortbyfilter("highest")}>Price by highest</li>
                          <li role="presentation" onClick={() => onSortbyfilter("lowest")}>Price by lowest</li>
                          <li role="presentation" onClick={() => onSortbyfilter("recent")}>Recent on top</li>
                          <li className="listinprofiletab1" role="presentation" onClick={() => onSortbyfilter("oldest")}>Oldest on top</li>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  {statusFilterData === "" ? (<></>) : (<>
                    <Grid lg={10} xs={12} container alignItems="center" justifyContent="center" className="mt-3">
                      {statusFilterData === "Highest to lowest price" || statusFilterData === "Lowest to highest price" ? (<>
                        <Grid lg={10} xs={10} container>
                          <button className="glow-on-hover">
                            {statusFilterData ? statusFilterData : ""}
                          </button>
                        </Grid>
                      </>) : (<>
                        <Grid lg={6} xs={6} container>
                          <button className="glow-on-hover">
                            {statusFilterData ? statusFilterData : ""}
                          </button>
                        </Grid>
                      </>)}
                    </Grid>
                  </>)}
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
                                <li className="listinprofiletab" role="presentation" onClick={() => onChainsFilters("Eth")}>ETH</li>
                                <li role="presentation" onClick={() => onChainsFilters("Bnb")}>BNB</li>
                                <li className="listinprofiletab1" role="presentation" onClick={() => onChainsFilters("Mumbai")}>Matic</li>
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
                                <li className="listinprofiletab" role="presentation" onClick={() => onItemsfilter("all")}>All</li>
                                <li role="presentation" onClick={() => onItemsfilter("ongoing")}>OnGoging</li>
                                <li className="listinprofiletab1" role="presentation" onClick={() => onItemsfilter("upcoming")}>Upcoming</li>
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
                                <li className="listinprofiletab" role="presentation" onClick={() => onSortbyfilter("highest")}>Price by highest</li>
                                <li role="presentation" onClick={() => onSortbyfilter("lowest")}>Price by lowest</li>
                                <li role="presentation" onClick={() => onSortbyfilter("recent")}>Recent on top</li>
                                <li className="listinprofiletab1" role="presentation" onClick={() => onSortbyfilter("oldest")}>Oldest on top</li>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                        {statusFilterData === "" ? (<></>) : (<>
                          <Grid lg={10} xs={12} container alignItems="center" justifyContent="center" className="mt-3">
                            {statusFilterData === "Highest to lowest price" || statusFilterData === "Lowest to highest price" ? (<>
                              <Grid lg={10} xs={10} container>
                                <button className="glow-on-hover">
                                  {statusFilterData ? statusFilterData : ""}
                                </button>
                              </Grid>
                            </>) : (<>
                              <Grid lg={6} xs={6} container>
                                <button className="glow-on-hover">
                                  {statusFilterData ? statusFilterData : ""}
                                </button>
                              </Grid>
                            </>)}
                          </Grid>
                        </>)}
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
                              <Box className="radius-lg homecards2 w-100 h-100 mb-3" sx={{ padding: "2%" }}>
                                <Grid lg={12} xs={12} container sx={{ padding: "2% 5%" }}>
                                  <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                    <h6 className="cardsworld m-0">{item?.nftName > 18 ? item?.nftName?.slice(0, 18) + ".." : item?.nftName}</h6>
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
                                    <Grid lg={10.9} xs={10.9} container justifyContent="center" alignItems="center" className="nftauctioncard" sx={{ zIndex: "5" }}>
                                      <CountdownTimer targetDate={item?.soldTime} />
                                    </Grid>
                                  </>) : (<></>)}
                                  <Grid lg={12} xs={12} container sx={{ overflow: "hidden" }} role="presentation" onClick={() => updateView(item)}>
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
                      <ActivityTables ActiveTabledata={ActiveTableData} />
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
export default TotalNftlist;