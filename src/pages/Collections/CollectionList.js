import { Grid, Button, Box, Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./collectionlist.css";
import Container from "react-bootstrap/Container";
import Fire from "../../assets/Collectionimg/fireimg.png";
import Threedimg from "../../assets/Collectionimg/3dimg.svg";
import Nodata from "../../assets/Collectionimg/Nodata.jpg";
import video from "../../assets/Collectionimg/videoimg.svg";
import Ethereum from "../../assets/images/ethereumimg.svg";
import { BiJoystick } from "react-icons/bi";
import { RiPaletteLine, RiVideoLine } from "react-icons/ri";
import { HiMusicalNote } from "react-icons/hi2";
import { IoCubeOutline } from "react-icons/io5";
// import { collectionsData } from "../../helpers/datafile";
import Fade from "react-reveal/Fade";
import { useNavigate,Link,useLocation } from "react-router-dom";
import { getMethod } from "../../apis/index";
import WalletConnect from "../../components/modals/walletConnect";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import Roll from "react-reveal/Roll";

function Collections() {

  const location = useLocation();
  const collections = location?.state?.collection;
  console.log("uselocation",location?.state?.collection);
  const navigate = useNavigate();
  const [clickChange, setClickchange] = useState("");
  const [totalCollections, setTotalCollections] = useState("");
  const [open, setOpen] = useState(false);
  const wallet = useSelector((state) => state.WalletConnect);

  const d = new Date();
  let year = d.getFullYear();
  
  const getCollections = async (check) => {
    try {
      let url = "Getcollections";
      let response = await getMethod({ url });
      if (response.status) {
        let result = response.result;
        if (check === "total" || check === "All") {
          setTotalCollections(result);
          setClickchange("total");
        }
        else if (check === "Trending") {
          let data = result.filter((val) => val.category === "Trending");
          setTotalCollections(data);
          setClickchange("Trending");
        }
        else if (check === "3D") {
          let data = result.filter((val) => val.category === "3D");
          setTotalCollections(data);
          setClickchange("3D");
        }
        else if (check === "Gaming") {
          let data = result.filter((val) => val.category === "Gaming");
          setTotalCollections(data);
          setClickchange("Gaming");
        }
        else if (check === "Art") {
          let data = result.filter((val) => val.category === "Art");
          setTotalCollections(data);
          setClickchange("Art");
        }
        else if (check === "Music") {
          let data = result.filter((val) => val.category === "Music");
          setTotalCollections(data);
          setClickchange("Music");
        }
        else if (check === "AvatarNft") {
          let data = result.filter((val) => val.category === "AvatarNft");
          setTotalCollections(data);
          setClickchange("AvatarNft");
        }
        else if (check === "Video") {
          let data = result.filter((val) => val.category === "Video");
          setTotalCollections(data);
          setClickchange("Video");
        }
        else {
          setTotalCollections(result);
          setClickchange("total");
        }
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const connect = () => {
    setOpen(true);
    toast.warn("Connect your wallet");
  };

  useEffect(() => {
    getCollections(collections);
    if(!collections){
      setClickchange("total");
    }
  }, []);

  return (
    <div>
      <Container fluid className="mt-3" style={{ padding: "0% 5.6%" }}>
        <Fade bottom>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
            <Grid lg={6} xs={12} container justifyContent="center" alignItems="center">
              <Grid lg={3} xs={6} container justifyContent="center" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => getCollections("total")}>
                <p className={clickChange === "total" ? "click mx-1" : "collection-text text-muted"} >All Collections</p>
                <span className="click"></span>
              </Grid>
              <Grid lg={3} xs={6} container justifyContent="center" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => getCollections("Trending")}>
                <img src={Fire} className="img-fluid collection-img" alt="collections" />
                <p className={clickChange === "Trending" ? "click mx-1" : "collection-text mx-1 text-muted"} >Trending</p>
              </Grid>
              <Grid lg={3} xs={6} container justifyContent="center" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => getCollections("3D")}>
                <img src={Threedimg} className="img-fluid collection-img" alt="collections" />
                <p className={clickChange === "3D" ? "click mx-1" : "collection-text mx-1 text-muted"}>3D</p>
              </Grid>
              <Grid lg={3} xs={6} container justifyContent="center" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => getCollections("Gaming")}>
                <BiJoystick className="img-fluid collection-img text-secondary" />
                <p className={clickChange === "Gaming" ? "click mx-1" : "collection-text mx-1 text-muted"} >Game</p>
              </Grid>
            </Grid>
            <Grid lg={6} xs={12} container justifyContent="center" alignItems="center">
              <Grid lg={3} xs={6} container justifyContent="center" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => getCollections("Art")}>
                <RiPaletteLine className="img-fluid collection-img text-secondary" />
                <p className={clickChange === "Art" ? "click mx-1" : "collection-text mx-1 text-muted"}>Art</p>
              </Grid>
              <Grid lg={3} xs={6} container justifyContent="center" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => getCollections("Music")}>
                <HiMusicalNote className="img-fluid collection-img text-secondary" />
                <p className={clickChange === "Music" ? "click mx-1" : "collection-text mx-1 text-muted"}>Music</p>
              </Grid>
              <Grid lg={3} xs={6} container justifyContent="center" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => getCollections("AvatarNft")}>
                <HiMusicalNote className="img-fluid collection-img text-secondary" />
                <p className={clickChange === "AvatarNft" ? "click mx-1" : "collection-text mx-1 text-muted"}>Avatar NFT</p>
              </Grid>
              <Grid lg={3} xs={6} container justifyContent="center" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => getCollections("Video")}>
                <img src={video} className="img-fluid collection-img" alt="collections" />
                <p className={clickChange === "Video" ? "click mx-1" : "collection-text mx-1 text-muted"}>Videos</p>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Container>
      <Fade bottom>
        <Grid lg={12} xs={12} spacing={{ xs: 0, lg: 4 }} container className="" justifyContent="" sx={{ padding: "0% 5.6%" }}>
          {totalCollections.length !== 0 ? (<>
            {totalCollections.map((item) => {
              return (<>
                <Grid item lg={3} xs={12} container justifyContent="flex-start" alignItems="center" className="collectionslistinmobileview">
                  {/* <Fade bottom> */}
                  <Box className="radius-lg homecards2 w-100 h-100" sx={{ position: "relative" }}>
                    <div className="featureCards imgzindex">
                      {item.category === "3D" ? (<><IoCubeOutline /></>) : item.category === "Gaming" ? (<><BiJoystick /></>) : item.category === "Art" ? (<><RiPaletteLine /></>) : item.category === "AvatarNft" ? (<><HiMusicalNote className="text-light" /></>) : item.category === "Music" ? (<><HiMusicalNote className="text-light" /></>) : item.category === "Video" ? (<><RiVideoLine /></>) : (<></>)}
                      <small className="text-light mx-2">{item.category.length >= 5 ? item.category.slice(0, 6) : item.category}</small>
                    </div>
                    <div className="collectionCardsBorderRadius">
                      <img src={process.env.REACT_APP_S3_LINK + item.bannerImage} className="img-fluid w-100 allimgfit img-zoom-animation" alt="collimg" />
                    </div>
                    <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="flex-start" sx={{ padding: "0% 2%", marginTop: "-7%" }}>
                      <Avatar src={process.env.REACT_APP_S3_LINK + item.logoImage} sx={{ width: "70px", height: "70px" }} className="imgzindex img-zoom-animation pointer" onClick={() => { navigate("/profile"); }}></Avatar>
                      {/* <img src={process.env.REACT_APP_S3_LINK+item.logoImage} className="img-fluid imgzindex img-zoom-animation pointer" role="presentation"  alt="collimg" onClick={() => { navigate("/profile"); }}/> */}
                      {item?.totalnfts?.length !== 0 ? (<>
                        <Grid lg={6} xs={6} container className="boxfeaturenfts imgzindex" sx={{ padding: "0% 2%", overflow: "hidden" }} justifyContent="space-between" alignItems="center">
                          {item?.totalnfts.slice(0, 3).map((val) => {//eslint-disable-line
                            return (<>
                              <img  src={process.env.REACT_APP_S3_LINK + val.nftImage} className="img-fluid  featuresnftsimgs img-zoom-animation" alt="collimg" />
                            </>)
                          })}
                        </Grid>
                      </>) : (<></>)}
                    </Grid>
                    <h6 className="jackobson text-light d-flex mx-3 ">{item.collectionName}</h6>
                    <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "0% 4%" }}>
                      {item?.totalnfts?.length !== 0 ? (<>
                        <Grid lg={6} xs={7} container direction="column">
                          <small className="colorart3 m-0">{item?.totalnfts?.length} items</small>
                          {!item.floorPrice ? (<></>) : (<>
                            <small className=" text-light m-0"><img src={Ethereum} className="img-fluid mr-2" alt="homeimg" />{item.floorPrice}</small>
                          </>)}
                        </Grid>
                        <Grid lg={4} xs={3} container>
                          {/* <Button className="btns connectpad popinsMd" onClick={() => { !wallet.connected ? (<>{connect(item._id)}</>) : (<>{navigate(`/nftlist/${item._id}`,{state:{nfts:item}})}</>) }}>View All</Button> */}
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
                  {/* </Fade> */}
                </Grid>
              </>);
            })}
          </>) : (<>
            <Grid lg={12} xs={12} container justifyContent="center" className="mt-4">
              <img src={Nodata} className="img-fluid" style={{ borderRadius: "20%", border: "1px solid black" }} alt="collections" />
            </Grid>
          </>)}
        </Grid>
      </Fade>
      <Grid lg={12} container justifyContent="center" sx={{position:"relative"}}>
        <font size={3} className={totalCollections.length >= 3 ? "text-gray pointer footerpositionsabsoluted text-center" : "text-gray pointer footerpositionsfixed  text-center"}>{year} © All Rights Reserved By <span className="text-green text-gradient">Blockchain Technologies</span></font>
      </Grid>
      <WalletConnect openWallet={open} setOpenWallet={setOpen}/>
    </div>
  );
}
export default Collections;