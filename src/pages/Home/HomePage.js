import React, { useState, useEffect } from "react";
import "./home.css";
import { Card, Image, Stack, Button, Spinner } from "react-bootstrap";
import { Grid, Box, Avatar } from "@mui/material";
import { BsThreeDots, BsEyeFill } from "react-icons/bs";
import { IoIosCheckmark, IoMdHeart } from "react-icons/io";
import { IoCubeOutline } from "react-icons/io5";
import { BiJoystick, BiLike } from "react-icons/bi";
import { RiPaletteLine, RiVideoLine } from "react-icons/ri";
import { HiMusicalNote, HiClipboardDocumentList } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";
// import { FaHandHoldingUsd } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";
// import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { ImArrowRight } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";
import WalletConnect from "../../components/makeOffers/index";
import { homesFirstcardData, homesFifthcardData } from "../../helpers/datafile";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
import { getMethod, putMethod } from "../../apis/index";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CountdownTimer from "../../components/timer/CountDownTimer";
// import bitmap from "../../assets/Alieanimg/Bitmap.svg";

function Home() {

  let width = window.innerWidth;
  const wallet = useSelector((state) => state.WalletConnect);
  const Ethereum = require("../../assets/images/ethereumimg.svg").default;
  // const circle = require("../../assets/images/halfcircle.svg").default;
  // const Hand = require("../../assets/Alieanimg/handimg.png").default;
  const BannerText = require("../../assets/welcomenote.svg").default;
  const [images1, setImages] = useState([]);
  const [collections, setCollections] = useState([]);
  const [nfts, setNfts] = useState([]);

  // const [previous, setPrevious] = useState(0);
  // const [changeNext, setchangeNext] = useState(4);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = async (data) => {
    setImages(data);
  };

  // const prev = async () => {
  //   setPrevious(1);
  //   setchangeNext(5);
  // };

  // const next = async () => {
  //   setPrevious(0);
  //   setchangeNext(4);
  // };

  const getCollections = async () => {
    try {
      let url = "Getcollections";
      let response = await getMethod({ url });
      if (response.status) {
        let result = response.result.filter((val) => val.totalnfts.length !== 0).slice(0, 3);
        setCollections(result);
        getNFTs();
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const [totalArts, setTotalArts] = useState("");
  const [totalSale, setTotalSale] = useState("");
  const [totalSellers, setTotalSellers] = useState("");

  const getNFTs = async () => {
    try {
      let url = "GetNfts";
      let response = await getMethod({ url });
      if (response.status) {
        const results = response.return;
        const data1 = results.filter((val) => val.nftStatus === "onSale");
        const data2 = results.filter((val) => val.nftStatus === "onAuction");
        const result = [...data1, ...data2];
        let newFavArr = [...new Set(result)];
        const data3 = newFavArr.sort(function (a, b) { return (new Date(b.updatedOn)).getTime() - (new Date(a.updatedOn)).getTime() }).slice(0, 4);
        setTotalArts(results?.length);
        setTotalSale(result?.length);
        setNfts(data3);
        setImages(data3[0]);
        getUsers(newFavArr);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const getUsers = async () => {
    try {
      let url = "Getusers";
      let response = await getMethod({ url });
      if (response.status) {
        let res = response.result;
        let finalnft = [];
        res.map((val) => {//eslint-disable-line
          let value1 = val.nfts.filter((d) => d.nftStatus === "onSale");
          let value2 = val.nfts.filter((d) => d.nftStatus === "onAuction");
          let value3 = [...value1, ...value2];
          let value4 = { ...val, nft1: value3, count: value3.length.toString() }
          finalnft.push(value4);
        });
        let highestCount = finalnft.sort(function (a, b) { return b.count - a.count });
        setTotalSellers(highestCount);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };
  console.log("newFavArr", totalSellers);
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

  const connect = (check) => {
    toast.warn("Connect your wallet");
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className="backgroundhome">
      <Stack gap={4}>
        <Grid lg={12} xs={12} container sx={{ marginTop: "4%" }} >
          {width > 600 ? (<>
            <Grid lg={7} xs={12} container justifyContent="flex-start" >
              <Grid lg={12} xs={12} container alignItems="flex-start" direction="column" sx={{ padding: "0% 8%" }}>
                <Image src={BannerText} fluid alt="image" width={600} />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-end", xs: "center" }} alignItems="flex-start" sx={{ padding: "2% 4%" }}>
                {/* <Image src={circle} width="" height="" fluid alt="image" className="home_circle" /> */}
                <Card body className="homefirstcard">
                  <Stack gap={2}>
                    <Grid lg={12} xs={12}>
                      <Grid lg={9} xs={12} container justifyContent="space-between" alignItems="center">
                        <h6 className="texthovering text-length m-0">{images1?.nftName > 18 ? images1?.nftName?.slice(0, 18) + ".." : images1?.nftName}</h6>
                        <Grid lg={3} xs={3} container justifyContent="flex-end">
                          <Box sx={{ backgroundColor: "#3e3e4f", color: "darkgrey", borderRadius: "10px", width: "100%" }} >
                            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ paddingLeft: "6%" }}>
                              <font size={1} className="text-light" >{images1?.likes?.length}</font>
                              {images1.likes && images1.likes.filter((val) => val.walletAddress === wallet.address).length > 0 ? (<>
                                <Avatar className="heartslike pointer" onClick={() => updateLikes("dislike", images1)}><IoMdHeart style={{ color: "white" }} size={14} /></Avatar>
                              </>) : (<>
                                <Avatar className="heartsdislike pointer" onClick={() => updateLikes("like", images1)}><IoMdHeart style={{ color: "white" }} size={14} /></Avatar>
                              </>)}
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid lg={12} xs={12} container alignItems="center" className="pointer" role="presentation" onClick={() => { navigate("/profile") }}>
                      {images1?.ownerProfile ? (<>
                        <Image src={process.env.REACT_APP_S3_LINK + images1?.ownerProfile} className="home-rightlogo img-zoom-animation" alt="homeimg" fluid width="25" height="25" />
                        <small className="text-light text-capitalize mx-2">{images1?.ownerName?.length > 10 ? images1?.ownerName?.slice(0, 12) : images1?.ownerName}</small>
                      </>) : (<>
                        <Avatar sx={{ width: "20px", height: "20px" }} />
                        <small className="text-light text-capitalize mx-2">{images1?.walletAddress?.slice(0, 5) + "..." + images1?.walletAddress?.slice(-5)}</small>
                      </>)}
                    </Grid>
                    <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }}>
                      <h6 className="colorart m-0">Current Bid</h6>
                      <img src={Ethereum} className="mx-1" alt="etherum" />
                      <h6 className="jackobson  m-0">{images1?.nftPrice} ETH</h6>
                    </Grid>
                    <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }} className="mt-1">
                      <Grid lg={7.4} xs={12} container>
                        <Button className="btns placebidcards" onClick={() => setOpen(true)}>Place bid</Button>
                      </Grid>
                    </Grid>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
            <Grid lg={5} xs={12} container justifyContent={{ lg: "flex-start", xs: "flex-start" }}>
              <Stack gap={4}>
                <Grid lg={12} xs={12} container sx={{ position: "relative" }} justifyContent="center" className="">
                  {images1?.nftStatus === "onAuction" ? (<>
                    <Grid lg={5} xs={7.2} container className="timermobileview" justifyContent="center" alignItems="center">
                      <CountdownTimer targetDate={images1?.soldTime} />
                    </Grid>
                  </>) : (<></>)}
                  <div className="featureCards1 imgzindex">
                    <Spinner animation="grow" size="sm" className="mr-2" variant="danger" />
                    <small className="text-green popinsSm">Trending Now</small>
                  </div>
                  <img src={!images1?.nftImage ? "" : process.env.REACT_APP_S3_LINK + images1?.nftImage} alt="homeimg" className="nftsliveimg" />
                </Grid>
                <Grid lg={12} xs={12} container justifyContent={{ lg: "center", xs: "center" }} alignItems="center">
                  {/* <MdOutlineArrowBackIosNew className="text-light pointer" size={24} onClick={() => prev()} /> */}
                  {nfts.map((item, i) => (
                    <img key={i} src={!item?.nftImage ? "" : process.env.REACT_APP_S3_LINK + item?.nftImage} className=" pointer" role="presentation" alt="homeimg" style={{ width: "15%", marginLeft: "1%" ,height:"100%",borderRadius:"5px" }} onClick={() => handleChange(item)} />
                  ))}
                  {/* <MdOutlineArrowForwardIos className="text-light pointer" size={24} onClick={() => next()} /> */}
                </Grid>
              </Stack>
            </Grid>
          </>) : (<>
            <Grid lg={12} xs={12} container justifyContent="center" sx={{ padding: "2% 4%" }}>
              <Image src={BannerText} fluid alt="image" width={600} />
              {/* <Image src={circle} width="" height="" fluid alt="image" className="home_circle" /> */}
              <Grid lg={12} xs={12} container sx={{ position: "relative", marginTop: "16%" }} justifyContent="center">
                {images1?.nftStatus === "onAuction" ? (<>
                  <Grid lg={6} xs={8} container className="timermobileview" justifyContent="center" alignItems="center">
                    <CountdownTimer targetDate={images1?.soldTime} />
                  </Grid>
                </>) : (<></>)}
                <div className="featureCards2 imgzindex">
                  <Spinner animation="grow" size="sm" className="mr-2" variant="danger" />
                  <small className="text-green popinsSm">Trending Now</small>
                </div>
                <img src={!images1?.nftImage ? "" : process.env.REACT_APP_S3_LINK + images1?.nftImage} className="img-fluid timertrendingimg" alt="homeimg" />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent={{ lg: "center", xs: "center" }} alignItems="center" className="mt-3">
                {nfts.map((item, i) => (
                  <img key={i} src={!item?.nftImage ? "" : process.env.REACT_APP_S3_LINK + item?.nftImage} className="img-fluid pointer sliderimginhomepage" role="presentation" alt="homeimg" onClick={() => handleChange(item)} />
                ))}
              </Grid>
              <Card body className="homefirstcard mt-4">
                <Stack gap={2}>
                  <Grid lg={12} xs={12}>
                    <Grid lg={9} xs={12} container justifyContent="space-between" alignItems="center">
                      <h6 className="texthovering text-length m-0">{images1?.nftName > 18 ? images1?.nftName?.slice(0, 18) + ".." : images1?.nftName}</h6>
                      <Grid lg={3} xs={3} container justifyContent="flex-end">
                        <Box sx={{ backgroundColor: "#3e3e4f", color: "darkgrey", borderRadius: "10px", width: "100%" }} >
                          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ paddingLeft: "6%" }}>
                            <font size={1} className="text-light" >{images1?.likes?.length}</font>
                            {images1.likes && images1.likes.filter((val) => val.walletAddress === wallet.address).length > 0 ? (<>
                              <Avatar className="heartslike pointer" onClick={() => updateLikes("dislike", images1)}><IoMdHeart style={{ color: "white" }} size={14} /></Avatar>
                            </>) : (<>
                              <Avatar className="heartsdislike pointer" onClick={() => updateLikes("like", images1)}><IoMdHeart style={{ color: "white" }} size={14} /></Avatar>
                            </>)}
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid lg={12} xs={12} container alignItems="center" className="pointer" role="presentation" onClick={() => { navigate("/profile") }}>
                    {images1?.ownerProfile ? (<>
                      <Image src={process.env.REACT_APP_S3_LINK + images1?.ownerProfile} className="home-rightlogo img-zoom-animation" alt="homeimg" fluid width="25" height="25" />
                      <small className="colorart1 text-light text-capitalize mx-2">{images1?.ownerName?.length > 10 ? images1?.ownerName?.slice(0, 12) : images1?.ownerName}</small>
                    </>) : (<>
                      <Avatar sx={{ width: "20px", height: "20px" }} />
                      <small className="colorart1 text-light text-capitalize mx-2">{images1?.walletAddress?.slice(0, 5) + "..." + images1?.walletAddress?.slice(-5)}</small>
                    </>)}
                  </Grid>
                  <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }}>
                    <h6 className="colorart m-0">Current Bid</h6>
                    <img src={Ethereum} className="mx-1" alt="etherum" />
                    <h6 className="jackobson  m-0">{images1?.nftPrice} ETH</h6>
                  </Grid>
                  <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }} className="mt-1">
                    <Grid lg={7.4} xs={12} container>
                      <Button className="btns placebidcards" onClick={() => setOpen(true)}>Place bid</Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
              {/* <Card body className="homefirstcard mt-4">
                <Stack gap={2}>
                  <Grid lg={12} xs={12}>
                    <Grid lg={8} xs={12} container justifyContent="space-between" alignItems="center">
                      <h6 className="texthovering m-0">{images1.text1}</h6>
                      <span className="iocircle">
                        <font size={1} className="mx-2 text-light" >{images1.text5}</font>
                        {images1.status === false ? (<>
                          <Avatar className="heartsdislike pointer" onClick={() => likeCards("like")}><IoMdHeart style={{ color: "white" }} size={14} /></Avatar>
                        </>) : (<>
                          <Avatar className="heartslike pointer" onClick={() => dislike("dislike")}><IoMdHeart style={{ color: "white" }} size={14} /></Avatar>
                        </>)}
                      </span>
                    </Grid>
                  </Grid>
                  <Grid lg={12} xs={12} container className="pointer" role="presentation" onClick={() => { navigate("/profile") }}>
                    <Image src={rightLogo} fluid alt="image" width="60" height="60" className="img-zoom-animation" />
                    <div className="mt-2 mx-2">
                      <h6 className="jackobson">{images1.text2}</h6>
                      <h6 className="colorart">{images1.text3}</h6>
                    </div>
                  </Grid>
                  <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }}>
                    <h6 className="colorart m-0">Current Bid</h6>
                    <img src={Ethereum} className="mx-1" alt="etherum" />
                    <h6 className="jackobson  m-0">{images1.text4}</h6>
                  </Grid>
                  <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }} className="mt-1">
                    <Grid lg={7.4} xs={7.4} container>
                      <Button className="btns placebidcards" onClick={() => setOpen(true)}>Place bid</Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Card> */}
            </Grid>
          </>)}
        </Grid>
        <Grid lg={12} xs={12} container justifyContent="center" sx={{ padding: "1%" }}>
          <Grid lg={10} xs={12} container justifyContent="space-between" alignItems="center">
            <Grid lg={6} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }} className="mt-2">
              <div>
                <h4 className="text-light">{totalArts} +</h4>
                <h6 style={{ color: "rgb(151 151 151)" }}>Art work</h6>
              </div>
              <span className="dividers"></span>
              <div className="artworks">
                <h4 className="text-light">{totalSale} +</h4>
                <h6 style={{ color: "rgb(151 151 151)" }}>Auction</h6>
              </div>
              <span className="dividers"></span>
              <div className="artworks">
                <h4 className="text-light">5K+</h4>
                <h6 style={{ color: "rgb(151 151 151)" }}>Artist</h6>
              </div>
            </Grid>
            <Grid lg={6} xs={12} container justifyContent={{ lg: "flex-end", xs: "center" }} className="mt-2">
              <Grid lg={4} xs={5}>
                <button className="glow-on-hover" onClick={() => { navigate("/allnfts"); }}>EXPLORE</button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid lg={12} xs={12} container sx={{ marginBottom: "3%" }} justifyContent="center" alignItems="center">
          <h1 className="text-light">How to Get Started</h1>
        </Grid>
        <Grid lg={12} xs={12} container justifyContent="center" className="homefirstCardsbgcolor" sx={{ position: "relative" }}>
          <Grid lg={10} xs={10} container justifyContent="space-between" className="" sx={{ position: "relative" }}>
            {/* <img src={bitmap} className="" alt="bitmap" style={{position:"absolute",right:"0"}}/> */}
            {homesFirstcardData.map((item) => {
              return (<>
                <Grid lg={2.6} xs={12} container justifyContent="center" alignItems="center" className="cardsinhomemobile">
                  <Card className="cardsinfirstdatas  h-100">
                    <span className="card-rounted">{item.id}</span>
                    <Card.Body className="">
                      <Grid lg={12} xs={12} container className="mt-5" justifyContent="center" alignItems="center">
                        <Bounce>
                          <Image src={item.img} className="img-zoom-animation" alt="homeimg" fluid />
                        </Bounce>
                      </Grid>
                      <Grid lg={12} xs={12} className="mt-4" container justifyContent="center">
                        <h6 className="text-light">{item.text1}</h6>
                      </Grid>
                      <Grid lg={12} xs={12} container justifyContent="center">
                        <h6 className="text-green">{item.text2}</h6>
                      </Grid>
                      <Grid lg={12} xs={12} container justifyContent="center">
                        <small style={{ color: "rgb(151 151 151)" }} className="text-center">{item.text3}</small>
                      </Grid>
                    </Card.Body>
                  </Card>
                </Grid>
              </>);
            })}
          </Grid>
        </Grid>
        <Grid lg={12} xs={12} container justifyContent="center" sx={{ padding: "1%" }}>
          <Grid lg={10} xs={10} container justifyContent="space-between" >
            <h6 className="text-light textsbluehovering m-0"><Spinner animation="grow" size="sm" className="mr-2" variant="danger" />Live bids</h6>
            <h6 className="text-green text-gradient m-0 pointer" role="presentation" onClick={() => { navigate("/allnfts"); }}>View all</h6>
          </Grid>
        </Grid>
        <Grid lg={12} xs={12} justifyContent="center" container sx={{ marginBottom: "4%" }}>
          <Grid lg={10} xs={10} container justifyContent="space-between">
            {nfts.map((item, i) => {
              return (<>
                <Grid lg={2.8} xs={12} key={i} container justifyContent="center" alignItems="center" sx={{ marginBottom: "2%" }}>
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
                          <Image src={process.env.REACT_APP_S3_LINK + item?.ownerProfile} className="home-rightlogo rounded-circle img-zoom-animation" alt="homeimg" fluid width="25" height="25" />
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
                          <Link to={`/nftdetails/${item._id}`} className="linkProperty" rel="noopener noreferrer"><Image src={process.env.REACT_APP_S3_LINK + item?.nftImage} className={item?.nftStatus === "onAuction" ? "nftauctioncardimg pointer img-zoom-animation" : "pointer img-zoom-animation"} style={{ width: "500px", height: "200px" ,borderRadius:"5px" }} alt="homeimg" fluid /></Link>
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
            {collections.length !== 0 ? (<>
              <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" className="mt-4">
                <h1 className="text-light">Featured Categories</h1>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="space-between" className="mt-3">
                {collections.map((item, i) => {
                  return (<>
                    <Grid lg={3.6} xs={12} key={i} container sx={{ marginBottom: "4%" }}>
                      <Fade bottom>
                        <Box className="radius-lg homecards2 w-100 h-100 mb-3" sx={{ position: "relative" }}>
                          <div className="featureCards imgzindex">
                            {item.category === "3D" ? (<><IoCubeOutline /></>) : item.category === "Gaming" ? (<><BiJoystick /></>) : item.category === "Art" ? (<><RiPaletteLine /></>) : item.category === "AvatarNft" ? (<><HiMusicalNote className="text-light" /></>) : item.category === "Music" ? (<><HiMusicalNote className="text-light" /></>) : item.category === "Video" ? (<><RiVideoLine /></>) : (<></>)}
                            <small className="text-light mx-2">{item.category.length >= 5 ? item.category.slice(0, 6) : item.category}</small>
                          </div>
                          <div className="collectionCardsBorderRadius">
                            <img src={process.env.REACT_APP_S3_LINK + item.bannerImage} className="img-fluid w-100 allimgfit img-zoom-animation" alt="collimg" style={{height:"250px"}} />
                          </div>
                          <Grid lg={12} xs={12} container justifyContent="space-between" sx={{ padding: "0% 2%", marginTop: "-7%" }}>
                            <Avatar src={process.env.REACT_APP_S3_LINK + item.logoImage} sx={{ width: "70px", height: "70px" }} className="imgzindex img-zoom-animation pointer" onClick={() => { navigate("/profile"); }}></Avatar>
                            {item?.totalnfts?.length !== 0 ? (<>
                              <Grid lg={6} xs={6} container className="boxfeaturenfts imgzindex" sx={{ padding: "0% 2%", overflow: "hidden" }} justifyContent="space-between" alignItems="center">
                                {item?.totalnfts.slice(0, 3).map((val) => {//eslint-disable-line
                                  return (<>
                                    <img src={process.env.REACT_APP_S3_LINK + val.nftImage} className="  featuresnftsimgs img-zoom-animation" alt="collimg" style={{height:"45px" ,width:"45px",borderRadius:"5px"}} />
                                  </>)
                                })}
                              </Grid>
                            </>) : (<></>)}
                          </Grid>
                          <h6 className="jackobson text-light d-flex mx-3 ">{item.collectionName}</h6>
                          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "0% 2%" }}>
                            {item?.totalnfts?.length !== 0 ? (<>
                              <Grid lg={6} xs={7} container direction="column">
                                <small className="colorart3 m-0">{item?.totalnfts?.length} items</small>
                                {!item.floorPrice ? (<></>) : (<>
                                  <small className=" text-light m-0"><img src={Ethereum} className="img-fluid mr-2" alt="homeimg" />{item.floorPrice}</small>
                                </>)}
                              </Grid>
                              <Grid lg={4} xs={3} container>
                                {!wallet.connected ? (<>
                                  <Button className="btns connectpad popinsMd" onClick={() => connect(item._id)}>View All</Button>
                                </>) : (<>
                                  <Button className="btns connectpad popinsMd"><Link to={`/nftlist/${item._id}`} className="linkProperty" rel="noopener noreferrer">View All</Link></Button>
                                </>)}
                              </Grid>
                            </>) : (<></>)}
                            <small className="colorart3 text-justify mt-2 mb-3">{item.collectionDescription}</small>
                          </Grid>
                        </Box>
                      </Fade>
                    </Grid>
                  </>);
                })}
              </Grid>
              <Grid lg={12} xs={12} container className="" justifyContent="center" alignItems="center">
                <h6 className="text-green text-gradient m-0" style={{ cursor: "pointer" }} role="presentation" onClick={() => { navigate("/collections"); }}>View All Categories</h6>
              </Grid>
            </>) : (<></>)}
            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
              <Grid lg={3.8} xs={12} container justifyContent="center" alignItems="center">
                <h5 className="text-light mt-5 mb-3">Today Drops</h5>
                {nfts.slice(0, 3).map((item) => {
                  return (<>
                    <Box className="radius-lg homecards2 w-100 h-100 mb-3">
                      <Grid lg={12} xs={12} container sx={{ padding: "3% 4%" }} className="pointer">
                        <Stack gap={3}>
                          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                            {/* <small className="text-light">{item?.nftName > 18 ? item?.nftName?.slice(0, 18) + ".." : item?.nftName}</small> */}
                            <h6 className="cardsworld m-0">{item?.nftName > 18 ? item?.nftName?.slice(0, 18) + ".." : item?.nftName}</h6>
                            <BsThreeDots className="text-light" />
                          </Grid>
                          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                            <Grid lg={3} xs={4} container justifyContent="flex-start" sx={{ overflow: "hidden" }} role="presentation" onClick={() => updateView(item)}>
                              <Link to={`/nftdetails/${item._id}`} className="linkProperty" rel="noopener noreferrer">
                                <Image src={process.env.REACT_APP_S3_LINK + item?.nftImage} className=" img-zoom-animation pointer todaysdropimg "alt="homeimg"  /></Link>
                            </Grid>
                            <span style={{ borderRight: "1px solid rgb(255 255 255 / 17%)", height: "100%" }}></span>
                            <Grid lg={8} xs={7} container justifyContent="flex-start" >
                              <div>
                                {item?.ownerProfile ? (<>
                                  <Image src={process.env.REACT_APP_S3_LINK + item?.ownerProfile} className="home-rightlogo img-zoom-animation" alt="homeimg" fluid />
                                  <small className="text-light text-capitalize mx-2">{item?.ownerName?.length > 10 ? item?.ownerName?.slice(0, 12) : item?.ownerName}</small>
                                </>) : (<>
                                  <Avatar sx={{ width: "20px", height: "20px" }} />
                                  <small className="text-light text-capitalize mx-2">{item?.walletAddress?.slice(0, 5) + "..." + item?.walletAddress?.slice(-5)}</small>
                                </>)}
                              </div>
                              <Grid lg={12} xs={12} container justifyContent="" alignItems="center" className="mt-2">
                                <Grid lg={6} xs={6} container alignItems="center">
                                  <BiLike className="mr-2 text-light" />
                                  <small className="text-green">{item?.likes?.length} likes</small>
                                </Grid>
                                <Grid lg={6} xs={6} container alignItems="center">
                                  <BsEyeFill className="mr-2 text-light" />
                                  <small className="text-green">{item?.views?.length} views</small>
                                </Grid>
                              </Grid>
                              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="center" className="mt-2">
                                <Grid lg={10} xs={12} container>
                                  <Button className="finalcardsbutton">
                                    <SiEthereum className="text-light" />
                                    <small className="text-light">{item?.nftPrice} ETH</small>
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Box>
                  </>);
                })}
                <Grid lg={12} xs={12} className="mt-4" container justifyContent="center" alignItems="center">
                  <h6 className="text-green text-gradient pointer m-0" role="presentation" onClick={() => navigate("/allnfts")}>View All Drops</h6>
                </Grid>
              </Grid>
              <Grid lg={3.8} xs={12} container justifyContent="center" alignItems="center" direction="column">
                <h5 className="text-light mt-5 mb-3">Top Buyers</h5>
                {homesFifthcardData.map((item) => {
                  return (<>
                    <Fade bottom>
                      <Box className="radius-lg homecards2 w-100 h-100 mb-3">
                        <Grid lg={12} xs={12} container sx={{ padding: "4%" }} className="pointer" >
                          <Stack gap={2}>
                            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" role="presentation" onClick={() => { navigate("/profile", { state: { Profiledata: item } }); }}>
                              <Grid lg={4} xs={4} container justifyContent="flex-start" sx={{ oveflow: "hidden" }}>
                                <Image src={item.img} className="radius-lg img-zoom-animation" fluid width="150" height="150" style={{ height: "94px" }} alt="homeimg" />
                              </Grid>
                              <Grid lg={7} xs={7} container justifyContent="flex-start" alignItems="center">
                                <div>
                                  <p className="text-light mb-0">{item.text1}</p>
                                  <small className="" style={{ fontWeight: "400", color: "gray" }}>{item.text2}</small>
                                </div>
                                <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" className="mt-2">
                                  <Grid lg={4} xs={4} container>
                                    <Button className="finalcardsbutton">
                                      <FiShoppingCart className="img-fluid" size={20} />
                                    </Button>
                                  </Grid>
                                  <h6 className="text-light mx-1 m-0">{item.text3}</h6>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                              <p className="text-light mb-0">{item.text4}</p>
                              <Avatar className="cardslike pointer">
                                <IoIosCheckmark size={30} />
                              </Avatar>
                            </Grid>
                          </Stack>
                        </Grid>
                      </Box>
                    </Fade>
                  </>);
                })}
                <Grid lg={12} xs={12} className="mt-4" container justifyContent="center" alignItems="center">
                  <h6 className="text-green text-gradient pointer m-0" role="presentation" onClick={() => { navigate("/profile"); }}>View All Buyers</h6>
                </Grid>
              </Grid>
              <Grid lg={3.8} xs={12} container justifyContent="center" alignItems="center" direction="column">
                <h5 className="text-light mt-5 mb-3">Top Sellers</h5>
                {totalSellers && totalSellers.slice(0,3).map((item) => {
                  return (<>
                    <Box className="radius-lg homecards2 w-100 h-100 mb-3" sx={{ overflow: "hidden" }}>
                      <Grid lg={12} xs={12} container className="pointer" sx={{ padding: "3% 4%" }}>
                        <Stack gap={2}>
                          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" role="presentation" onClick={() => { navigate("/profile", { state: { Profiledata: item } }); }}>
                            <Grid lg={3} xs={4} container justifyContent="flex-start" sx={{ oveflow: "hidden" }}>
                              <Avatar sx={{ width: "100px", height: "100px" }} variant="rounded">
                                <img src={process.env.REACT_APP_S3_LINK + item?.profilePic} className="radius-lg img-zoom-animation" alt="profile" style={{ width: "190px", height: "100px", objectFit: "cover" }} />
                              </Avatar>
                            </Grid>
                            <span style={{ borderRight: "1px solid rgb(255 255 255 / 17%)", height: "100%" }}></span>
                            <Grid lg={8} xs={7} container justifyContent="flex-start" alignItems="center">
                              <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                <Grid lg={6} xs={4} container>
                                  {item?.userName ? (<>
                                    <small className="text-light text-capitalize">{item?.userName?.length > 10 ? item?.userName?.slice(0, 12) : item?.userName}</small>
                                  </>) : (<>
                                    <small className="text-light text-capitalize">{item?.walletAddress?.slice(0, 5) + "..." + item?.walletAddress?.slice(-5)}</small>
                                  </>)}
                                  <small className="text-capitalize" style={{ fontWeight: "400", color: "gray" }}>@{item?.userName}</small>
                                </Grid>
                                <Grid lg={12} xs={4} container alignItems="center">
                                  <HiClipboardDocumentList className="text-light mr-1" />
                                  {console.log("item?.count?.length",item?.count?.length,item?.count?.slice(0, 4))}
                                  <small className="text-green">{item?.count?.length >= 4 ? item?.count?.slice(0, 1) + "K" : item?.count} Items</small>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                            {item?.nft1?.length !== 0 ? (<>
                              <Grid lg={6} xs={6} container className="imgzindex" sx={{ padding: "0% 2%", overflow: "hidden" }} justifyContent="flex-start" alignItems="center">
                                {item?.nft1.slice(0, 4).map((val) => {//eslint-disable-line
                                  return (<>
                                    <img src={process.env.REACT_APP_S3_LINK + val.nftImage} className="img-fluid  img-zoom-animation" alt="collimg" style={{ width: "20%", marginRight: "4%" }} />
                                  </>)
                                })}
                              </Grid>
                              <Grid lg={6} xs={6} container justifyContent="flex-end" alignItems="center">
                                <Avatar className="cardsdislike pointer" role="presentation" onClick={() => { navigate("/allnfts",{state:{nfts:item?.nft1}}); }}>
                                  <ImArrowRight size={15} />
                                </Avatar>
                              </Grid>
                            </>) : (<>
                              <Grid lg={12} xs={12} container justifyContent="flex-end">
                                <Avatar className="cardsdislike pointer">
                                  <ImArrowRight size={15} />
                                </Avatar>
                              </Grid>
                            </>)}
                          </Grid>
                        </Stack>
                      </Grid>
                    </Box>


                    {/* <Box className="radius-lg homecards2 w-100 h-100 mb-3">
                      <Grid lg={12} xs={12} container sx={{ padding: "3% 4%" }} className="pointer">
                        <Stack gap={3}>
                          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                            <Grid lg={3} xs={4} container justifyContent="flex-start" sx={{ overflow: "hidden" }} role="presentation" onClick={() => updateView(item)}>
                              <Avatar sx={{ width: "100px", height: "100px" }} variant="rounded">
                                <img src={process.env.REACT_APP_S3_LINK + item?.profilePic} className="radius-lg img-zoom-animation" alt="profile" style={{ width: "190px", height: "100px", objectFit: "cover" }} />
                              </Avatar>
                            </Grid>
                            <span style={{ borderRight: "1px solid rgb(255 255 255 / 17%)", height: "100%" }}></span>
                            <Grid lg={8} xs={7} container justifyContent="flex-start" >
                              <div>
                                {item?.userName ? (<>
                                  <small className="text-light text-capitalize mx-2">{item?.userName?.length > 10 ? item?.userName?.slice(0, 12) : item?.userName}</small>
                                </>) : (<>
                                  <small className="text-light text-capitalize mx-2">{item?.walletAddress?.slice(0, 5) + "..." + item?.walletAddress?.slice(-5)}</small>
                                </>)}
                              </div>
                              <Grid lg={12} xs={12} container justifyContent="" alignItems="center" className="mt-2">
                                <Grid lg={6} xs={6} container alignItems="center">
                                  <HiClipboardDocumentList className="text-light mr-1" />
                                  <small className="text-green">{item?.count?.length >= 4 ? item?.count?.slice(0, 4) + "K" : item?.count} Items</small>
                                </Grid>
                              </Grid>
                              <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                                {item?.nft1?.length !== 0 ? (<>
                                  <Grid lg={6} xs={6} container className="imgzindex" sx={{ padding: "0% 2%", overflow: "hidden" }} justifyContent="flex-start" alignItems="center">
                                    {item?.nft1.slice(0, 4).map((val) => {//eslint-disable-line
                                      return (<>
                                        <img src={process.env.REACT_APP_S3_LINK + val.nftImage} className="img-fluid  img-zoom-animation" alt="collimg" style={{ width: "20%", marginRight: "4%" }} />
                                      </>)
                                    })}
                                  </Grid>
                                  <Grid lg={6} xs={6} container justifyContent="flex-end" alignItems="center">
                                    <Avatar className="cardsdislike pointer">
                                      <ImArrowRight size={15} />
                                    </Avatar>
                                  </Grid>
                                </>) : (<>
                                  <Grid lg={12} xs={12} container justifyContent="flex-end">
                                    <Avatar className="cardsdislike pointer">
                                      <ImArrowRight size={15} />
                                    </Avatar>
                                  </Grid>
                                </>)}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Box> */}

                  </>);
                })}
                <Grid lg={12} xs={12} className="mt-4" container justifyContent="center" alignItems="center">
                  <h6 className="text-green text-gradient pointer m-0" role="presentation" onClick={() => { navigate("/profile"); }}>View All Sellers</h6>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
      <WalletConnect openWallet={open} setOpenWallet={setOpen} />
    </div>
  );
}
export default Home;