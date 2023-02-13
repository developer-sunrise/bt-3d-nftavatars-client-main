import React, { useState } from "react";
import { Box, Typography, Modal, Grid, Button } from "@mui/material";
import { CgClose } from "react-icons/cg";
import { AiFillDollarCircle } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { Stack } from "react-bootstrap";
import "./styles.css";
import FixedPrice from "../modals/FixedpriceModal";
import TimeAuction from "../modals/TimeAuctionModal";
import { useSelector } from "react-redux";
import WalletConnect from "../modals/walletConnect";
import { postMethod } from "../../apis";
import { toast } from "react-toastify";

function ConenctWallet({ openWallet, setOpenWallet, value, nftDetailsData, getNfts }) {

  const wallet = useSelector((state) => state.WalletConnect);
  const [open, setOpen] = useState(false);
  const [auction, setAuction] = useState("");
  const [bidPrice, setPrice] = useState("");

  const conditionCheck = (val) => {
    if (val === "bids") {
      { bidPrice === "" ? (toast.warn("Enter your Price")) : nftDetailsData?.nftPrice > bidPrice ? (toast.warn(`Enter your bid at least ${nftDetailsData?.nftPrice} ETH`)) : (addBids(val)) }// eslint-disable-line
    }
    else if (val === "makeOffer") {
      { bidPrice === "" ? (toast.warn("Enter your Price")) : (addBids(val)) }// eslint-disable-line
    }
  };

  const addBids = async (val) => {
    try {
      if (val === "bids") {
        let url = "addTransactions";
        let params = {
          nftId: nftDetailsData._id,
          walletAddress: wallet.address,
          saleType: "bid",
          price: bidPrice,
          soldTime: nftDetailsData.soldTime,
          type: "bidOffers",
          status: "pending"
        };
        let response = await postMethod({ url, params });
        if (response.status) {
          getNfts();
          setOpenWallet(false);
          window.location.reload(false);
        }
      }
      else if (val === "makeOffer") {
        let url = "addTransactions";
        let params = {
          nftId: nftDetailsData._id,
          walletAddress: wallet.address,
          saleType: "makeOffer",
          price: bidPrice,
          type: "makeOffer",
          status: "pending"
        };
        let response = await postMethod({ url, params });
        if (response.status) {
          getNfts();
          setOpenWallet(false);
          window.location.reload(false);
        }
      }
    }
    catch (e) {
      console.log("error in updates", e);
    }
  };

  return (
    <div>
      {!wallet.connected ? (<><WalletConnect openWallet={openWallet} setOpenWallet={setOpenWallet} /></>) : (<>
        <Box>
          {value === "makeoffer" ? (<>
            <Modal open={openWallet} onClose={() => setOpenWallet(false)} BackdropProps={{ style: { backgroundColor: "rgb(144 146 150 / 21%)" } }}>
              <Box className="modal-box">
                <div className="connectwallet_modal">
                  <Box className="connect_header">
                    <Typography variant="h6" className="walletTitle">
                      Make Offer
                    </Typography>
                    <CgClose size={25} onClick={() => setOpenWallet(false)} style={{ cursor: "pointer" }} />
                  </Box>
                  <Box className="connect_header">
                    <Typography variant="h6" className="walletTitle text-muted" sx={{}}>
                      Account Balance
                    </Typography>
                  </Box>
                  <Box className="boxconnect">
                    <Stack gap={3}>
                      <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ fontWeight: "600" }}>
                        <small style={{ color: "darkgray" }} >Balance</small>
                        <small style={{ color: "darkgray" }} >0 ETH</small>
                      </Grid>
                      <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ fontWeight: "600" }}>
                        <small style={{ color: "darkgray" }} >Floor price</small>
                        <small style={{ color: "darkgray" }} >0.000 ETH</small>
                      </Grid>
                    </Stack>
                  </Box>
                  <Box className="connect_header mt-2">
                    <Grid lg={12} xs={12} container>
                      <input className="signupinput p-3" type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)}/>
                    </Grid>
                  </Box>
                  <Stack gap={3} className="d-flex justify-content-center align-items-center mt-3">
                    <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                      <Grid lg={5.6} xs={5.6} container alignItems="center" >
                        <Button className="btns connectpad popinsMd" onClick={() => conditionCheck("makeOffer")}>Make Offer</Button>
                      </Grid>
                      <Grid lg={5.6} xs={5.6} container alignItems="center">
                        <button className="glow-on-hover" onClick={() => setOpenWallet(false)} style={{ padding: "6.5%" }}>
                          <font className="text-light">cancel</font>
                        </button>
                      </Grid>
                    </Grid>
                  </Stack>
                </div>
              </Box>
            </Modal>
          </>) : value === "sale" ? (<>
            <Modal open={openWallet} onClose={() => setOpenWallet(false)} BackdropProps={{ style: { backgroundColor: "rgb(144 146 150 / 21%)" } }}>
              <Box className="modal-box">
                <div className="connectwallet_modal">
                  <Box className="connect_header">
                    <Typography variant="h6" className="walletTitle">
                      Put On Sale
                    </Typography>
                    <CgClose size={25} onClick={() => setOpenWallet(false)} style={{ cursor: "pointer" }} />
                  </Box>
                  <Box className="boxconnect" sx={{ cursor: "pointer" }} onClick={() => { setOpen(true); setAuction("auction"); setOpenWallet(false); }}>
                    <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ fontWeight: "600" }}>
                      <div className="d-flex align-items-center mt-2">
                        <AiFillDollarCircle size={28} style={{ color: "darkgray" }} />
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <font style={{ color: "darkgray" }} >Fixed Price</font>
                      </div>
                    </Grid>
                  </Box>
                  <Box className="boxconnect mt-3" sx={{ cursor: "pointer" }} onClick={() => { setOpen(true); setAuction("timeauction"); setOpenWallet(false); }}>
                    <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ fontWeight: "600" }}>
                      <div className="d-flex align-items-center mt-2">
                        <BiTime size={28} style={{ color: "darkgray" }} />
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <font style={{ color: "darkgray" }} >Time Auction</font>
                      </div>
                    </Grid>
                  </Box>
                </div>
              </Box>
            </Modal>
          </>) : (<>
            <Modal open={openWallet} onClose={() => setOpenWallet(false)} BackdropProps={{ style: { backgroundColor: "rgb(144 146 150 / 21%)" } }}>
              <Box className="modal-box">
                <div className="connectwallet_modal">
                  <Box className="connect_header">
                    <Typography variant="h6" className="walletTitle">
                      Place a Bid
                    </Typography>
                    <CgClose size={25} onClick={() => setOpenWallet(false)} style={{ cursor: "pointer" }} />
                  </Box>
                  <Box className="connect_header">
                    <Typography variant="h6" className="walletTitle text-muted">
                      You must bid at least {nftDetailsData?.nftPrice} ETH
                    </Typography>
                  </Box>
                  <Grid lg={12} xs={12} container>
                    <Typography variant="h6" className="walletTitle text-muted">
                      Enter Bid
                    </Typography>
                    <input type="number" className="signupinput" style={{ padding: "2.9%" }} placeholder="Enter Bid" onChange={(e) => setPrice(e.target.value)} />
                  </Grid>
                  <Grid lg={12} xs={12} container>
                    <Typography variant="h6" className="walletTitle text-muted">
                      Your bid
                    </Typography>
                  </Grid>
                  <Box className="boxconnect">
                    <Stack gap={3}>
                      <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ fontWeight: "600" }}>
                        <small style={{ color: "darkgray" }} >Bid</small>
                        <small size={2} style={{ color: "darkgray" }} >{bidPrice} ETH</small>
                      </Grid>
                      <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ fontWeight: "600" }}>
                        <small style={{ color: "darkgray" }} >Your balance</small>
                        <small style={{ color: "darkgray" }} >4.568 ETH</small>
                      </Grid>
                      <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ fontWeight: "600" }}>
                        <small style={{ color: "darkgray" }} >Service fee</small>
                        <small style={{ color: "darkgray" }} >0.001 ETH</small>
                      </Grid>
                      <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ fontWeight: "600" }}>
                        <small style={{ color: "darkgray" }} >Total</small>
                        <small style={{ color: "darkgray" }} >0.001 ETH</small>
                      </Grid>
                    </Stack>
                  </Box>
                  <Stack gap={3} className="d-flex justify-content-center align-items-center mt-3">
                    <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                      <Grid lg={5.6} xs={5.6} container alignItems="center">
                        <Button className="btns connectpad popinsMd" onClick={() => conditionCheck("bids")}>Place Bid</Button>
                      </Grid>
                      <Grid lg={5.6} xs={5.6} container alignItems="center">
                        <button className="glow-on-hover" onClick={() => setOpenWallet(false)} style={{ padding: "6.5%" }}>
                          <font className="text-light">Cancel</font>
                        </button>
                      </Grid>
                    </Grid>
                  </Stack>
                </div>
              </Box>
            </Modal></>)}
        </Box>
      </>)}
      {auction === "auction" ? (<>
        <FixedPrice openModal={open} setOpenModal={setOpen} data={nftDetailsData} getNfts={getNfts} />
        {/* <Modal open={open} onClose={() => setOpen(false)} BackdropProps={{ style: { backgroundColor: "rgb(144 146 150 / 21%)" } }}>
            <Box className="modal-box">
              <div className="connectwallet_modal">
                <Box className="connect_header">
                  <Typography variant="h6" className="walletTitle">
                    Fixed Price
                  </Typography>
                  <CgClose size={25} onClick={() => setOpen(false)} style={{ cursor: "pointer" }} />
                </Box>
                <Box className="connect_header">
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                    <Typography variant="h6" className="walletTitle text-muted" sx={{}}>
                      Price
                    </Typography>
                  </Grid>
                </Box>
                <Box className="connect_header">
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                    <input className="createNFTinput w-100 mt-2" placeholder="0" style={{ padding: "5px 0px 10px 12px" }} />
                  </Grid>
                </Box>
                <Box className="connect_header" sx={{ fontWeight: "600" }}>
                  <font style={{ color: "darkgray" }} >USD</font>
                </Box>
                <Box className="connect_header">
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                    <input className="createNFTinput w-100" placeholder="0$" style={{ padding: "5px 0px 10px 12px" }} />
                  </Grid>
                </Box>
                <Stack gap={3} className="d-flex justify-content-center align-items-center mt-3">
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ fontWeight: "600" }}>
                    <button className="pushable">
                      <span className="mainbutton">
                        List for sale
                      </span>
                    </button>
                  </Grid>
                </Stack>
              </div>
            </Box>
          </Modal> */}
      </>) : auction === "timeauction" ? (<>
        <TimeAuction openTimemodal={open} setTimemodal={setOpen} data={nftDetailsData} getNfts={getNfts} />
        {/* <Box>
          <Modal open={open} onClose={() => setOpen(false)} BackdropProps={{ style: { backgroundColor: "rgb(144 146 150 / 21%)" } }}>
            <Box className="modal-box">
              <div className="connectwallet_modal">
                <Box className="connect_header">
                  <Typography variant="h6" className="walletTitle">
                    Timed Auction
                  </Typography>
                  <CgClose size={25} onClick={() => setOpen(false)} style={{ cursor: "pointer" }} />
                </Box>
                <Box className="connect_header">
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                    <Typography variant="h6" className="walletTitle text-muted" sx={{}}>
                      Price
                    </Typography>
                  </Grid>
                </Box>
                <Box className="connect_header" sx={{ fontWeight: "600" }}>
                  <font style={{ color: "darkgray" }} >Method</font>
                </Box>
                <Box className="connect_header">
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                    <Select
                      styles={customStyles}
                      className="w-100"
                      options={[{ value: "sell to highest bidter", label: "sell to highest bidter" }]}
                      placeholder="sell to highest bidter"
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                    // onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                </Box>
                <Box className="connect_header" sx={{ fontWeight: "600" }}>
                  <font style={{ color: "darkgray" }} >Min Bid Price</font>
                </Box>
                <Box className="connect_header">
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                    <input className="createNFTinput w-100" placeholder="0 BLOQS" style={{ padding: "2% 4%" }} />
                  </Grid>
                </Box>
                <Box className="connect_header" sx={{ fontWeight: "600" }}>
                  <font style={{ color: "darkgray" }} >USD</font>
                </Box>
                <Box className="connect_header">
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                    <input className="createNFTinput w-100" placeholder="$0" style={{ padding: "2% 4%" }} />
                  </Grid>
                </Box>
                <Box className="connect_header" sx={{ fontWeight: "600" }}>
                  <font style={{ color: "darkgray" }} >Duration</font>
                </Box>
                <Box className="connect_header">
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                    <input className="createNFTinput w-100" type="date" placeholder="" style={{ padding: "2% 4%" }} />
                  </Grid>
                </Box>
                <Stack gap={3} className="d-flex justify-content-center align-items-center mt-3">
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ fontWeight: "600" }}>
                    <button className="pushable">
                      <span className="mainbutton">
                        List for sale
                      </span>
                    </button>
                  </Grid>
                </Stack>
              </div>
            </Box>
          </Modal>
        </Box> */}
      </>) : (<></>)}

    </div>
  );
}

export default ConenctWallet;
