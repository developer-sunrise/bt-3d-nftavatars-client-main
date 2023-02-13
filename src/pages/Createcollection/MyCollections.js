import React, { useState, useEffect } from "react";
import { Grid, Box, Avatar, Button } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import Navbar from "../../components/navbar/Navbar";
// import { MdModeEdit } from "react-icons/md";
import { Image, Spinner } from "react-bootstrap";
import { nftcardData } from "../../helpers/datafile";
import WalletConnect from "../../components/makeOffers/index";
import Fade from "react-reveal/Fade";
import ProfileTable from "../../components/table/ProfileTable/ProfileTable";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ScrollToTop from "../../helpers/scrollTop";
import { getMethod } from "../../apis/index";
import { useSelector } from "react-redux";
function MyCollections() {

  // let width = window.innerWidth;
  // const wallet = useSelector((state) => state.WalletConnect);
  // const PF = require("../../assets/images/prf.png").default;
  const collectionsbgimg = require("../../assets/images/Rectangle.png").default;

  const wallet = useSelector((state) => state.WalletConnect);

  const navigate = useNavigate();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [carddata, setCarddata] = useState([]);
  const [open, setOpen] = useState(false);
  // const [copyText, setCopyText] = useState(false);

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

  // const dataTiming = async () => {
  //   setCopyText(true);
  //   const timer = setTimeout(() => {
  //     setCopyText(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // };

  const d = new Date();
  let year = d.getFullYear();

  const deadline = "December, 31," + year;

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  const getCollections = async () => {
    try {
      let url = "viewCollection";
      let response = await getMethod({ url });
      if (response.status) {
        console.log("users", response.return);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const [clickChange, setClickchange] = useState("");
  const allcollection = async (check, e) => {
    if (check === "NFTs") {
      setClickchange("NFTs");
      let data1 = nftcardData.filter((res) => {
        return (((res.text2).toLowerCase()).match((e).toLowerCase())) || (res.text4 === e);
      });
      setCarddata(data1);
    }
    else if (check === "Favorited") {
      setClickchange("Favorited");
      let data = nftcardData.filter((val) => val.status === true);
      setCarddata(data);
    }
    else if (check === "Created") {
      setCarddata(nftcardData);
      setClickchange("Created");
    }
    else if (check === "Activity") {
      setClickchange("Activity");
    }
    else if (check === "Auction") {
      let data = nftcardData.slice(0, 4);
      setCarddata(data);
      setClickchange("Auction");
    }

  };

  useEffect(() => {
    getCollections();
    setClickchange("NFTs");
    setCarddata(nftcardData);
    const interval = setInterval(() => getTime(deadline), 1000);
    return () => clearInterval(interval);
  }, [wallet]);

  const likeCards = (check, i) => {
    if (check === "like") {
      nftcardData[i].status = true;
      nftcardData[i].text3 = nftcardData[i].text3 + 1;
    }
    else if (check === "dislike") {
      nftcardData[i].status = false;
      nftcardData[i].text3 = nftcardData[i].text3 - 1;
    }
  }



  const ProfileSelect = [
    { value: "All", label: "All" },
    { value: "Price", label: "Price" },
    { value: "Rarity", label: "Rarity" },
  ];

  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Grid lg={12} xs={12} container sx={{ overflow: "hidden", position: "", zIndex: "5" }}>
        <img src={collectionsbgimg} alt="logo" style={{ width: "100%", height: "300px" }} />
      </Grid>
      <Grid lg={12} xs={12} container sx={{ padding: "0% 2%", marginTop: "-8%", }}>
        <Avatar sx={{ width: "200px", height: "200px" }} />
        <Grid lg={12} xs={12} container sx={{ padding: "1% 4%" }} justifyContent="space-between">
          <h5 className="text-light m-0">3d Arts</h5>
        </Grid>
        <Grid lg={7} xs={12} container sx={{ padding: "0% 4%" }} justifyContent="space-between">
          <font className="text-light">Items <font className="text-green">0</font></font>
          <font className="text-light">Created <font className="text-green">Feb 2023</font></font>
          <font className="text-light">Creator earnings <font className="text-green">0%</font></font>
          <font className="text-light">Chain <font className="text-green">Goerli</font></font>
          <Grid lg={12} xs={12} container justifyContent="space-between" className="mt-2">
            <font className="text-light text-justify">Welcome to the home of welcomeng on OpenSea. Discover the best items in this collection.</font>
          </Grid>
        </Grid>
        <Grid lg={5} xs={12} container sx={{ padding: "0% 4%" }} justifyContent="space-between">
          <div className="flex-column d-flex">
            <font className="text-green text-center">0ETH</font>
            <font className="text-light mt-2">total volume</font>
          </div>
          <div className="flex-column d-flex">
            <font className="text-green text-center">--</font>
            <font className="text-light mt-2">floor price</font>
          </div>
          <div className="flex-column d-flex">
            <font className="text-green text-center">--</font>
            <font className="text-light mt-2">listed</font>
          </div>
          <div className="flex-column d-flex">
            <font className="text-green text-center">0</font>
            <font className="text-light mt-2">owners</font>
          </div>
        </Grid>
        <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "0% 4%",marginTop:"2%" }}>
          <p className={clickChange === "NFTs" ? "click" : "collection-text text-muted"} role="presentation" onClick={() => { allcollection("NFTs") }}>NFT’s</p>
          <p className={clickChange === "Favorited" ? "click" : "collection-text mx-1 text-muted"} role="presentation" onClick={() => allcollection("Favorited")}>Favorited</p>
          <p className={clickChange === "Created" ? "click" : "collection-text mx-1 text-muted"} role="presentation" onClick={() => { allcollection("Created")}}>Created</p>
          <p className={clickChange === "Activity" ? "click" : "collection-text mx-1 text-muted"} role="presentation"  onClick={() => allcollection("Activity")}>Activity</p>
          <p className={clickChange === "Auction" ? "click" : "collection-text mx-1 text-muted"} role="presentation" onClick={() => allcollection("Auction")}>On Auction</p>
        </Grid>
        {clickChange === "Activity" ? (<>
          <Grid lg={12} xs={12} sx={{ padding: "0% 4%" }}>
            <ProfileTable />
          </Grid>
        </>) : (<>
          {carddata.length > 0 ? (<>
            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "0% 4%" }}>
              <Grid lg={3.5} xs={12} container sx={{ position: "relative" }} className="spaceinmobileviewforprofilepage1 nav-input">
                <input placeholder="Search" />
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
                // onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="space-between" sx={{ marginTop: "2%" }}>
                {carddata.map((item, i) => {
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
                })}
              </Grid>
            </Grid>
          </>) : (<>
            <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ marginTop: "4%", marginBottom: "4%" }}>
              <h4 className="text-light">No Favorite NftDetails</h4><Spinner animation="grow" size="sm" className="mx-2" variant="danger" /><Spinner animation="grow" size="sm" className="mx-2" variant="danger" /><Spinner animation="grow" size="sm" className="mx-2" variant="danger" />
            </Grid>
          </>)}
        </>)}
      </Grid>

      <WalletConnect openWallet={open} setOpenWallet={setOpen} />
    </div>
  );
}
export default MyCollections;