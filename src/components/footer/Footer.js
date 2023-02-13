import React, { useState } from "react";
import { Grid, Avatar, Box } from "@mui/material";
import "../navbar/navbar.css";
import { Image, Stack } from "react-bootstrap";
import FooterImg from "../../assets/images/airdrop.png";
import ScannerImg from "../../assets/images/footer2.png";
import textlogo from "../../assets/metaverselogo.svg";
import { useLocation,useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaDiscord, FaGoogle, FaTelegram, FaInstagramSquare } from "react-icons/fa";
import Privacy from "../privacypolicy/privacypolicy";
import Terms from "../privacypolicy/TermsCondition";
import Fade from "react-reveal/Fade";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  const d = new Date();
  let year = d.getFullYear();

  const handlechange = (val) => {
    if (val === "privacy") {
      setOpen(true);
      setData("privacy");
    }
    else if(val === "terms"){
      setOpen(true);
      setData("terms");
    }
    else if (val === "contact") {
      setOpen(true);
      setData("contact");
    }
  };

  return (
    <div>
      <Grid lg={12} xs={12} container className="" sx={{position:"relative"}}>
        {location.pathname === "/" ? (<>
          <Grid lg={12} xs={12} container  justifyContent="center">
            <Grid lg={6} xs={10} container justifyContent="center" alignItems="center" >
              <Fade left>
                <img src={FooterImg} alt="" className="img-fluid w-100 footer-flyimg" />
              </Fade>
            </Grid>
            <Grid lg={6} xs={10} container justifyContent="center" alignItems="center" direction="column">
              <Fade right>
                <h4 className="text-light m-0 text-bold">Stay connected to all</h4>
                <h4 className="text-light m-0 text-bold">Your devices</h4>
                <h6 className="m-0 mt-2" style={{ color: "rgb(151 151 151)" }}>Download our Mobile Apps Today</h6>
                <img src={ScannerImg} className="mt-3 img-fluid scanningImges" alt="footer" />
              </Fade>
            </Grid>
            <Grid lg={12} xs={12} container direction="row" >
              <Grid lg={4} xs={12} container className="footer-nftimg">
                <Box className="w-100 h-100">
                  <Stack gap={3}>
                    <Grid lg={6.4} xs={8} container justifyContent={{lg:"flex-start",xs:"center"}}>
                      <Image src={textlogo} className="textlogoinfooterpage marketplaceinspacemobile" fluid />
                    </Grid>
                    <Grid lg={12} xs={12} container justifyContent={{ lg: "flex-start", xs: "center" }}>
                      <Grid lg={8} xs={10.8} container justifyContent="space-between">
                        <a
                          href={"https://www.facebook.com/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="img-zoom-animation"
                        >
                          <Avatar className="socialiconspf img-zoom-animation">
                            <FaFacebookF />
                          </Avatar>
                        </a>
                        <a
                          href={"https://twitter.com/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="img-zoom-animation"
                        >
                          <Avatar className="socialiconspf img-zoom-animation">
                            {" "}
                            <FaGoogle />
                          </Avatar>
                        </a>
                        <a
                          href={"https://www.telegram.com/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="img-zoom-animation"
                        >
                          <Avatar className="socialiconspf img-zoom-animation">
                            <FaTwitter />
                          </Avatar>
                        </a>
                        <a
                          href={"https://discord.com/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="img-zoom-animation "
                        >
                          <Avatar className="socialiconspf img-zoom-animation">
                            <FaTelegram />
                          </Avatar>
                        </a>
                        <a
                          href={"https://discord.com/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="img-zoom-animation"
                        >
                          <Avatar className="socialiconspf img-zoom-animation">
                            <FaDiscord />
                          </Avatar>
                        </a>
                        <a
                          href={"https://discord.com/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="img-zoom-animation"
                        >
                          <Avatar className="socialiconspf img-zoom-animation">
                            <FaInstagramSquare />
                          </Avatar>
                        </a>
                      </Grid>
                    </Grid>
                    <Grid lg={12} xs={12} container >
                      <input className="nav-input p-3" placeholder="Enter Email" />
                    </Grid>
                    <Grid lg={10.4} xs={12} container  justifyContent="space-between">
                      <Grid lg={5.6} xs={5.6} container>
                        <button className="glow-on-hover" onClick={() => handlechange("privacy")}>
                          Privacy Policy
                        </button>
                      </Grid>
                      <Grid lg={5.6} xs={5.6} container>
                        <button className="glow-on-hover" onClick={() => handlechange("terms")}>
                          Terms & Conditions
                        </button>
                      </Grid>
                    </Grid>
                  </Stack>
                </Box>
              </Grid>
              <span className="footerlinewithborder"></span>
              <Grid lg={7.8} xs={12} container className="footer-nftimg" justifyContent="flex-start">
                <Grid lg={12} xs={12} container justifyContent="space-between">
                  <Grid lg={4} xs={6} container direction="column">
                    <Stack gap={2}>
                      <h5 className="text-light footer-textalignment m-0">Explore</h5>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment">Featured Drops</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment">Collections</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment">Live Auctions</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment">Top Seller</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment">Item Details</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment">Top Buyer</font>
                    </Stack>
                  </Grid>
                  <Grid lg={4} xs={6} container direction="column">
                    <Stack gap={2}>
                      <h5 className="text-light m-0 footer-textalignment">Marketplace</h5>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment" role="presentation" onClick={() => navigate("/collections",{state:{collection:"All"}})}>All NFTs</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment pointer" role="presentation" onClick={() => navigate("/collections",{state:{collection:"Art"}})}>Art</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment" role="presentation" onClick={() => navigate("/collections",{state:{collection:"Music"}})}>Music</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment" role="presentation" onClick={() => navigate("/collections",{state:{collection:"3D"}})}>3d Art</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment" role="presentation" onClick={() => navigate("/collections",{state:{collection:"Video"}})}>Videos</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment" role="presentation" onClick={() => navigate("/collections",{state:{collection:"AvatarNft"}})}>AvatarNft</font>
                    </Stack>
                  </Grid>
                  <Grid lg={3} xs={6} container direction="column" className="marketplaceinspacemobile">
                    <Stack gap={2}>
                      <h5 className="text-light m-0 footer-textalignment">Company</h5>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment">Forum</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment">Licences</font>
                      <font size={3} className="text-gray textsbluehovering pointer footer-textalignment">Careers</font>
                      <font size={3} role="presentation" className="text-gray textsbluehovering pointer footer-textalignment" onClick={() => handlechange("terms")}>Conditions</font>
                      <font size={3} role="presentation" className="text-gray textsbluehovering pointer footer-textalignment" onClick={() => handlechange("privacy")}>Privacy</font>
                      <font size={3} role="presentation" className="text-gray textsbluehovering pointer footer-textalignment" onClick={() => handlechange("contact")}>Contact</font>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid lg={12} xs={12} container justifyContent="center" className="">
              <font size={3} className="text-gray pointer text-center mb-2">{year} © All Rights Reserved By <span className="text-green text-gradient">Blockchain Technologies</span></font>
            </Grid>
          </Grid>
        </>) : location.pathname !== "/collection/create" && location.pathname !== "/nft/create" && location.pathname !== "/collections" && location.pathname !== "/allnfts"? (<>
          <Grid lg={12} container justifyContent="center" className={location.pathname === "/activity" ? "footerpositionsfixed mb-3" : "footerpositionsabsoluted"}>
            <font size={3} className="text-gray pointer text-center">{year} © All Rights Reserved By <span className="text-green text-gradient">Blockchain Technologies</span></font>
          </Grid>
        </>) : (<></>)}
      </Grid>
      {data === "privacy" || data === "contact" ? (<>
        <Privacy check={data} openWallet={open} setOpenWallet={setOpen} />
      </>) : (<>
        <Terms openWallet={open} setOpenWallet={setOpen} />
      </>)}
    </div>
  );
}
export default Footer;
