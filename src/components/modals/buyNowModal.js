import React from "react";
import { Grid, Box, Button } from "@mui/material";
import { Modal, Stack } from "react-bootstrap";
import "./modal.css";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putMethod } from "../../apis";

const BuyNowModal = ({ open1, setOpen1, nftDetailsData,offers,getNfts }) => {

  const makeofferprice = nftDetailsData;

  console.log("makeofferprice",makeofferprice);
  const wallet = useSelector((state) => state.WalletConnect);
  const Buying = async () => {
    try {
      let url = "updateBuyingDetails";
      let params = {
        nftId: makeofferprice._id,
        nftStatus: "buy",
        owners:makeofferprice?.totalOwners+1,
        ownerName: makeofferprice?.userName,
        ownerProfile: makeofferprice?.profilePic,
        nftPrice:makeofferprice?.nftPrice,
        walletAddress:wallet.address,
      };
      let response = await putMethod({ url, params });
      if (response.status) {
        setOpen1(false);
        toast("Update successfully");
        getNfts();
      }
    }
    catch (e) {
      console.log("error in updateoffers", e);
    }
  };

  return (
    <div>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={open1} centered>
        <Box className="signupmodal">
          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "2%" }}>
            <h5 className="signuptextinmodal">Approve purchase</h5>
            <CgClose size={24} className="text-light pointer text-end" role="presentation" onClick={() => setOpen1(false)} />
          </Grid>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ padding: "0% 4%" }}>
            <Grid lg={12} xs={12} container justifyContent={{ lg: "space-between", xs: "center" }} alignItems="center">
              <Stack gap={3}>
                <Grid lg={12} xs={12} container>
                  <Grid lg={2} xs={3} container>
                    <img src={process.env.REACT_APP_S3_LINK + makeofferprice?.nftImage} className="w-75" alt="nftimage" />
                  </Grid>
                  <Grid lg={4} xs={4} container direction="column">
                    <small className="text-light">{makeofferprice?.nftName?.length > 18 ? makeofferprice?.nftName?.slice(0, 18) + ".." : makeofferprice?.nftName}</small>
                    <small className="text-light">{makeofferprice?.collectionName?.length > 18 ? makeofferprice?.collectionName?.slice(0, 18) + ".." : makeofferprice?.collectionName}</small>
                    <small className="text-light">Chain : {makeofferprice?.blockchainType}</small>
                  </Grid>
                  <Grid lg={6} xs={4} container direction="column" alignItems="flex-end">
                    <small className="text-light">{!makeofferprice?.nftPrice ? offers : makeofferprice?.nftPrice} ETH</small>
                    <small className="text-light">{[]}</small>
                  </Grid>
                </Grid>
                <Grid lg={12} xs={12} className="" sx={{ borderTop: "0.1px solid" }}></Grid>
                <Grid lg={12} xs={12} container className="">
                  <font className="text-light">Go to your wallet</font>
                  <small className="text-light">You&apos;ll be asked to approve this purchase from your wallet.</small>
                </Grid>
                <Grid lg={12} xs={12} container justifyContent="flex-end" className="mb-3">
                  <Grid lg={4} xs={6} container>
                    <Button className="btns connectpad popinsMd" onClick={Buying}>BuyNow</Button>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
export default BuyNowModal;