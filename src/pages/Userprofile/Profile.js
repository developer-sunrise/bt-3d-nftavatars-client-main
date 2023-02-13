import React, { useState, useEffect } from "react";
import { Grid, Box, Avatar, Button } from "@mui/material";
import { RiFileCopyLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import Navbar from "../../components/navbar/Navbar";
import { Image, Spinner } from "react-bootstrap";
import "./profile.css";
import WalletConnect from "../../components/makeOffers/index";
import Fade from "react-reveal/Fade";
import ProfileTable from "../../components/table/ProfileTable/ProfileTable";
import { useLocation, Link } from "react-router-dom";
import Select from "react-select";
import ScrollToTop from "../../helpers/scrollTop";
import EditProfile from "../../components/modals/EditProfile";
import { getMethod, putMethod } from "../../apis/index";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountdownTimer from "../../components/timer/CountDownTimer";

function Userprofile({ status }) {

  let width = window.innerWidth;
  const wallet = useSelector((state) => state.WalletConnect);
  const PF = require("../../assets/images/prf.png").default;

  const items = require("../../assets/NFTimages/Items.svg").default;
  const Followers = require("../../assets/NFTimages/followers.svg").default;
  const nfticons2 = require("../../assets/images/ethereumimg.svg").default;

  // const navigate = useNavigate();
  const { state } = useLocation();
  const ProfileData = state?.Profiledata;
  const ActiveData = state?.ActiveProfiledata;
  const BidsProfileDta = state?.BidsProfileData;
  const listTbProfileDta = state?.listTbProfileData;
  const [usersData, setUsersdata] = useState("");
  const [profileNftData, setProfileNftData] = useState([]);
  const [profileNftData1, setProfileNftData1] = useState([]);
  const [profileNftData2, setProfileNftData2] = useState([]);
  const [favoritesaNftData, setFavoritesaNftData] = useState([]);
  const [favoritesaNftData1, setFavoritesaNftData1] = useState([]);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [copyText, setCopyText] = useState(false);
  const [ProfileDatas, setProfileDta] = useState("");
  const [type, setType] = useState("");


  const handleProfilesData = () => {
    if (ProfileData) {
      setType("profile1");
      setProfileDta(ProfileData);
    }
    else if (ActiveData) {
      setType("profile2");
      setProfileDta(ActiveData);
    }
    else if (BidsProfileDta) {
      setType("profile3");
      setProfileDta(BidsProfileDta);
    }
    else if (listTbProfileDta) {
      setType("profile4");
      setProfileDta(listTbProfileDta);
    }
  };
  const dataTiming = async () => {
    setCopyText(true);
    const timer = setTimeout(() => {
      setCopyText(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  const getUsers = async () => {
    try {
      let url = "viewUser";
      let response = await getMethod({ url });
      if (response.status) {
        const data = response.result.filter((val) => val.walletAddress === wallet.address);
        setUsersdata(data[0]);
        getNfts();
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const getNfts = async () => {
    try {
      let url = "GetNfts";
      let response = await getMethod({ url });
      if (response.status) {
        const data = response.return.filter((val) => val.walletAddress === wallet.address);
        const data1 = data.filter((val) => val.activityType === "transfer");
        let fav = [];
        response.return.map((val) => {// eslint-disable-line
          let like = val.likes.filter((item) => item.walletAddress === wallet.address);
          fav.push(...like)
        });
        let newFavArr = [...new Set(fav)];
        setFavoritesaNftData(newFavArr);
        setFavoritesaNftData1(response.return);
        setProfileNftData(data);
        setProfileNftData1(data1);
        setProfileNftData2(data);
      }
    }
    catch (e) {
      console.log("error in getnfts", e);
    }
  };


  const [clickChange, setClickchange] = useState("");
  const allcollection = async (check) => {
    if (check === "NFTs") {
      setProfileNftData(profileNftData2);
      setClickchange("NFTs");
    }
    else if (check === "Favorited") {
      let fav = [];
      for (let i = 0; i < favoritesaNftData.length; i++) {
        const datas = favoritesaNftData1.filter((val) => val._id === favoritesaNftData[i].nftId);
        fav.push(...datas);
      }
      let newFavArr2 = [...new Set(fav)];
      setProfileNftData(newFavArr2);
      setClickchange("Favorited");
    }
    else if (check === "Created") {
      let data = profileNftData2.filter((val) => val.nftStatus === "active");
      setProfileNftData(data);
      setClickchange("Created");
    }
    else if (check === "Activity" || status === "Activity") {
      setClickchange("Activity");
    }
    else if (check === "Auction") {
      let data = profileNftData2.filter((val) => val.nftStatus === "onAuction");
      setProfileNftData(data);
      setClickchange("Auction");
    }

  };

  useEffect(() => {
    getUsers();
    handleProfilesData();
    setClickchange("NFTs");
  }, [wallet.address]);



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
        getNfts();
      }
    }
    catch (e) {
      console.log("error in updateViews", e);
    }
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
      padding: "4%",
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

  const ProfileSelect = [
    { value: "All", label: "All" },
    { value: "onSale", label: "onSale" },
    { value: "onAuction", label: "onAuction" },
  ];

  const alertConnectWallet = () => {
    if (!wallet.connected) {
      toast.warn("Please connect your wallet");
    }
    else {
      setShow(true);
    }
  }

  const handlesearch = (e) => {
    let data = profileNftData2.filter((res) => {
      return ((res.nftName).toLowerCase()).match((e).toLowerCase()) || ((res.collectionName).toLowerCase()).match((e).toLowerCase()) || ((res.ownerName).toLowerCase()).match((e).toLowerCase()) || ((res.createdOn.split(" ")[2] + "-" + res.createdOn.split(" ")[1] + "-" + res.createdOn.split(" ")[3]).toLowerCase()).match((e).toLowerCase()) || ((res.createdOn.split(" ")[4]).toLowerCase()).match((e).toLowerCase());
    });
    setProfileNftData(data);
  };

  const handleSelectChange = (e) => {
    console.log("e", e, profileNftData2);
    if (e === "All") {
      setProfileNftData(profileNftData2);
    }
    else if (e === "onSale") {
      let data = profileNftData2.filter((val) => val.nftStatus === "onSale");
      setProfileNftData(data);
    }
    else if (e === "onAuction") {
      let data = profileNftData2.filter((val) => val.nftStatus === "onAuction");
      setProfileNftData(data);
    }
  };

  return (
    <div className={width > 600 ? "Profilebgimg" : null}>
      <Navbar />
      <ScrollToTop />
      <Grid lg={12} xs={12} container alignItems="center" sx={{ padding: "0% 4%", marginTop: "10%" }}>
        <Grid lg={6} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }} alignItems="center">
          <Grid lg={4} xs={4} container>
            {!usersData?.profilePic ? (<>
              <Image src={PF} alt="user" fluid className="img-zoom-animation" />
            </>) : (<>
              <Avatar src={process.env.REACT_APP_S3_LINK + usersData?.profilePic} alt="user" fluid className="img-zoom-animation w-100 h-100" />
            </>)}
            {/* {!ProfileDatas || type === "profile4" ? (<>
              <Image src={PF} alt="user" fluid className="img-zoom-animation" />
            </>) : (<>
              <Avatar src={type === "profile1" ? ProfileDatas?.img : type === "profile2" ? ProfileDatas?.authorprofile : type === "profile3" ? ProfileDatas?.img : ""} alt="user" fluid className="img-zoom-animation w-100 h-100" />
            </>)} */}
          </Grid>
          <Grid lg={8} xs={12} container justifyContent="" alignItems="center">
            <Grid lg={5} xs={12} container justifyContent="space-between" alignItems={{ lg: "flex-start", xs: "center" }} direction="column" className="mx-2">
              {!usersData?.userName ? (<></>) : (<>
                <h6 className="text-light m-0 pftext">{usersData?.firstName + " " + usersData?.lastName}</h6>
                <font className="text-info text-bold mt-2 mx-1" >@ {usersData?.userName}</font>
              </>)}
            </Grid>
            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="" direction="row" className="mx-2">
              <Grid lg={4} xs={4} container>
                <button className="editbtpf mt-4" onClick={alertConnectWallet}><FiEdit className="mr-2" />Edit</button>
              </Grid>
              {wallet.connected ? (<>
                <Grid lg={4} xs={4} container justifyContent="center" sx={{ position: "relative" }}>
                  <button className="copybtpf mt-4" onClick={() => { navigator.clipboard.writeText(wallet.address); dataTiming(); }}>{wallet.address.slice(0, 5) + "..." + wallet.address.slice(-5)}<RiFileCopyLine className="mx-2" /></button>
                  {copyText === true ? (<><h6 className="text-light text-bold" style={{ position: "absolute", top: "0" }}>Copied !</h6></>) : (<></>)}
                </Grid>
              </>) : (<></>)}
              <Grid lg={3} xs={12} container></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid lg={6} xs={12} container justifyContent="center" className="spaceinmobileviewforprofilepage">
          <Grid lg={3} xs={4} container alignItems="center" className="mt-2">
            <Image src={items} fluid className="mb-4 img-zoom-animation" />
            <div className="d-grid mx-1">
              <h6 className="text-light m-0">{profileNftData?.length}</h6>
              <small className="nftlist-text text-bold">Items</small>
            </div>
          </Grid>
          <Grid lg={3} xs={4} container alignItems="center" className="mt-2">
            <Image src={items} fluid className="mb-4 img-zoom-animation" />
            <div className="d-grid mx-1">
              <h6 className="text-light m-0">{profileNftData1?.length}</h6>
              <small className="nftlist-text text-bold">Transactions</small>
            </div>
          </Grid>
          <Grid lg={3} xs={4} container alignItems="center" className="mt-2">
            <Image src={Followers} fluid className="mb-4 img-zoom-animation" />
            <div className="d-grid mx-1">
              {!ProfileDatas || type === "profile2" || type === "profile4" ? (<>
                <h6 className="text-light m-0">1.2k</h6>
              </>) : type === "profile1" ? (<>
                <h6 className="text-light m-0">{ProfileDatas?.text4?.split(" ")[0] + ProfileDatas?.text4?.split(" ")[1]}</h6>
              </>) : type === "profile3" ? (<>
                <h6 className="text-light m-0">{ProfileDatas?.tokenID}k</h6>
              </>) : (<></>)}
              <small className="nftlist-text text-bold">Followers</small>
            </div>
          </Grid>
          <Grid lg={12} xs={12} container className="mt-2">
            <Grid lg={10.8} xs={12}>
              <button className="volumebt">
                <font size={4}>Volume  Price</font>
                <img src={nfticons2} className="img-fluid mx-2" alt="user" />
                <h5 className="text-light m-0">{!ProfileDatas || type === "profile1" ? (<>0 ETH</>) : type === "profile2" || type === "profile3" ? (<>{ProfileDatas?.ETH}</>) : type === "profile4" ? (<>{ProfileDatas?.text1}</>) : (<></>)}</h5>
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ marginTop: "10%" }}>
        <Grid lg={2.3} xs={6} container justifyContent="center" alignItems="center" >
          <p className={clickChange === "NFTs" ? "click pointer" : "collection-text text-muted"} role="presentation" onClick={() => allcollection("NFTs")}>NFT’s</p>
        </Grid>
        <Grid lg={2.3} xs={6} container justifyContent="center" alignItems="center">
          <p className={clickChange === "Favorited" ? "click pointer" : "collection-text mx-1 text-muted pointer"} role="presentation" onClick={() => allcollection("Favorited")}>Favorited</p>
        </Grid>
        <Grid lg={2.3} xs={6} container justifyContent="center" alignItems="center">
          <p className={clickChange === "Created" ? "click pointer" : "collection-text mx-1 text-muted pointer"} role="presentation" onClick={() => { allcollection("Created"); }}>Created</p>
        </Grid>
        <Grid lg={2.3} xs={6} container justifyContent="center" alignItems="center">
          <p className={clickChange === "Activity" ? "click pointer" : "collection-text mx-1 text-muted pointer"} role="presentation" onClick={() => allcollection("Activity")}>Activity</p>
        </Grid>
        <Grid lg={2.3} xs={6} container justifyContent="center" alignItems="center">
          <p className={clickChange === "Auction" ? "click pointer" : "collection-text mx-1 text-muted pointer"} role="presentation" onClick={() => allcollection("Auction")}>On Auction</p>
        </Grid>
      </Grid>
      {clickChange === "Activity" ? (<>
        <Grid lg={12} xs={12} sx={{ padding: "0% 8%" }}>
          <ProfileTable />
        </Grid>
      </>) : (<>
        <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "0% 8%" }}>
          <Grid lg={3.5} xs={12} container sx={{ position: "relative" }} className="spaceinmobileviewforprofilepage1 nav-input">
            <input placeholder="Search" onChange={(e) => handlesearch(e.target.value)} />
            <BiSearch style={{ color: "#707470" }} size={18} />
          </Grid>
          <Grid lg={2} xs={12} container className="spaceinmobileviewforprofilepage1">
            <Select
              styles={customStyles}
              className="w-100"
              options={ProfileSelect}
              placeholder="All"
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={(e) => handleSelectChange(e.value)}
            />
          </Grid>
          {profileNftData?.length > 0 ? (<>
            <Grid lg={12} xs={12} container justifyContent="space-between" sx={{ marginTop: "3%" }}>
              {profileNftData.map((item, i) => {
                return (<>
                  <Grid lg={2.8} xs={12} key={i} container justifyContent="center" alignItems="center" sx={{ marginBottom: "2%" }}>
                    <Fade bottom>
                      <Box className="radius-lg homecards2 w-100 h-100 mb-3" sx={{ padding: "2%" }}>
                        <Grid lg={12} xs={12} container sx={{ padding: "2% 5%" }}>
                          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                            <h6 className="cardsworld m-0">{item?.nftName}</h6>
                            <span className="cardsworld"><BsThreeDots /></span>
                          </Grid>
                        </Grid>
                        <Grid lg={12} xs={12} container className="" justifyContent="space-between" alignItems="center" sx={{ padding: "2% 5%" }}>
                          <Grid lg={8} xs={8} container justifyContent="flex-start" alignItems="center">
                            {item?.ownerProfile ? (<>
                              <Image src={process.env.REACT_APP_S3_LINK + item?.ownerProfile} className="home-rightlogo img-zoom-animation" alt="homeimg" fluid width="25" height="25" />
                              <small className="colorart1 text-light text-capitalize mx-2">{item?.ownerName?.length > 10 ? item?.ownerName?.slice(0, 12) : item?.ownerName}</small>
                            </>) : (<>
                              <Avatar sx={{ width: "20px", height: "20px" }} />
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
                    </Fade>
                  </Grid>
                </>);
              })}
              {/* {carddata.map((item, i) => {
                return (<>
                  <Grid lg={2.8} xs={12} container justifyContent="center" alignItems="center" sx={{ marginBottom: "1%" }}>
                    <Fade right>
                      <Box className="radius-lg homecards2 w-100 h-100 mb-3" sx={{ padding: "2%" }}>
                        <Grid lg={12} xs={12} container sx={{ padding: "2% 4%" }}>
                          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                            <h6 className="cardsworld m-0">{item.text1}</h6>
                            <span className="cardsworld"><BsThreeDots /></span>
                          </Grid>
                        </Grid>
                        {clickChange === "Auction" || clickChange === "Created" ? (<>
                          <Grid lg={12} xs={12} container className="" justifyContent="" alignItems="center" sx={{ padding: "2% 4%" }}>
                            <Image src={item.img1} className="home-rightlogo img-zoom-animation" alt="homeimg" fluid width="25" height="25" />
                            <small className="colorart1 text-light mx-2">{item.text2}</small>
                          </Grid>
                        </>) : clickChange === "Favorited" ? (<>
                          <Grid lg={12} xs={12} container className="" justifyContent="space-between" alignItems="center" sx={{ padding: "2% 4%" }}>
                            <Grid lg={8} xs={8} container justifyContent="flex-start" alignItems="center">
                              <Image src={item.img1} className="home-rightlogo img-zoom-animation" alt="homeimg" fluid width="25" height="25" />
                              <small className="colorart1 text-light mx-2">{item.text2}</small>
                            </Grid>
                            <Grid lg={3} xs={3} container justifyContent="flex-end">
                              <Box sx={{ backgroundColor: "#3e3e4f", color: "darkgrey", borderRadius: "10px", width: "100%" }} >
                                <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                  <font size={1} className="mx-2 text-light" >{item.text3}</font>
                                  {item.status === false ? (<>
                                    <Avatar className="heartsdislike pointer" onClick={() => likeCards("like", i)}><IoMdHeart style={{ color: "white" }} size={15} /></Avatar>
                                  </>) : (<>
                                    <Avatar className="heartslike pointer" onClick={() => likeCards("dislike", i)}><IoMdHeart style={{ color: "white" }} size={15} /></Avatar>
                                  </>)}
                                </Grid>
                              </Box>
                            </Grid>
                          </Grid>
                        </>) : (<>
                          <Grid lg={12} xs={12} container className="" justifyContent="space-between" alignItems="center" sx={{ padding: "2% 4%" }}>
                            <Grid lg={8} xs={8} container justifyContent="flex-start" alignItems="center">
                              <Image src={item.img1} className="home-rightlogo img-zoom-animation" alt="homeimg" fluid width="25" height="25" />
                              <small className="colorart1 text-light mx-2">{item.text2}</small>
                            </Grid>
                            <Grid lg={3} xs={3} container justifyContent="flex-end">
                              <Box sx={{ backgroundColor: "#3e3e4f", color: "darkgrey", borderRadius: "10px", width: "100%" }} >
                                <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                  <font size={1} className="mx-2 text-light" >{item.text3}</font>
                                  {item.status === false ? (<>
                                    <Avatar className="heartsdislike pointer" onClick={() => likeCards("like", i)}><IoMdHeart style={{ color: "white" }} size={15} /></Avatar>
                                  </>) : (<>
                                    <Avatar className="heartslike pointer" onClick={() => likeCards("dislike", i)}><IoMdHeart style={{ color: "white" }} size={15} /></Avatar>
                                  </>)}
                                </Grid>
                              </Box>
                            </Grid>
                          </Grid>
                        </>)}
                        <Grid lg={12} xs={12} container alignItem="center" justifyContent="center" sx={{ padding: "0% 5%", position: "relative" }}>
                          <Grid lg={12} xs={12} container className="cardsalientimer">
                            <Grid lg={3} xs={3} container justifyContent="center"><font className="days">{days}</font><small className="hours">D</small></Grid>
                            <Grid lg={3} xs={3} container justifyContent="center"><font className="days">{hours}</font><small className="hours">H</small></Grid>
                            <Grid lg={3} xs={3} container justifyContent="center"><font className="days">{minutes}</font><small className="hours">M</small></Grid>
                            <Grid lg={3} xs={3} container justifyContent="center"><font className="days">{seconds}</font><small className="hours">S</small></Grid>
                          </Grid>
                          <Grid lg={12} xs={12} container sx={{ overflow: "hidden" }}>
                            <Image src={item.img2} className="pointer img-zoom-animation" style={{ width: "500px", height: "100%" }} alt="homeimg" fluid role="presentation" onClick={() => { navigate("/nftdetails", { state: { item: item, id: item.id } }); }} />
                          </Grid>
                        </Grid>
                        <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" className="mt-2" sx={{ padding: "0% 4%" }}>
                          <Grid lg={6} xs={6} container>
                            <small className="colorart">Current Bid</small>
                            <small className="mx-1 text-light">{item.text4}</small>
                          </Grid>
                          <Grid lg={3} xs={6} container>
                            {clickChange === "Favorited" || clickChange === "Created" ? (<>
                              <Button className="btns connectpad popinsMd" onClick={() => setOpen(true)}>Bid</Button>
                            </>) : (<></>)}
                          </Grid>
                        </Grid>
                      </Box>
                    </Fade>
                  </Grid>
                </>);
              })} */}
            </Grid>
          </>) : (<>
            <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ marginTop: "4%", marginBottom: "4%" }}>
              <h4 className="text-light">No {clickChange} yet</h4><Spinner animation="grow" size="sm" className="mx-2" variant="danger" /><Spinner animation="grow" size="sm" className="mx-2" variant="danger" /><Spinner animation="grow" size="sm" className="mx-2" variant="danger" />
            </Grid>
          </>)}
        </Grid>
      </>)}
      <WalletConnect openWallet={open} setOpenWallet={setOpen} />
      <EditProfile openEditmodal={show} setEditmodal={setShow} getUsers={getUsers} usersData={usersData} />
    </div>
  );
}
export default Userprofile;