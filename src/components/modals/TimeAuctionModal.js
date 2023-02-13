import React,{ useState,useEffect } from "react";
import { Grid, Box,Button } from "@mui/material";
import { Modal } from "react-bootstrap";
import "./modal.css";
import { CgClose } from "react-icons/cg";
import { putMethod,getMethod } from "../../apis";
import Select from "react-select";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const TimeAuctionsModal = ({ openTimemodal, setTimemodal,data,getNfts }) => {

  const wallet = useSelector((state) => state.WalletConnect);
  const nftlistDta = [
    { value: "sell to highest bidter", label: "sell to highest bidter" },
  ];

  const [sellingMethod,setSellingMethod] = useState(nftlistDta[0].value);
  const [sellingPrice,setSellingPrice] = useState("");
  const [sellingUsdPrice,setSellingUsdPrice] = useState("");
  const [duration,setDuration] = useState("");
  const [users,setusers] = useState("");


  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgb(22 22 45)",
      color: "white",
      border: "0px",
      outline: "0px",
      boxShadow: "0px",
      borderRadius: "10px",
      padding: "1.4% 1%",
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

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 0).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const getUsers = async () => {
    try {
      let url = "viewUser";
      let response = await getMethod({ url });
      if (response.status) {
        const data = response.result.filter((val) => val.walletAddress === wallet.address);
        setusers(data[0]);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const conditionCheck = () =>{
    {sellingMethod === "" ? (toast.warn("Select your sellingmethod")) : sellingPrice === "" ? (toast.warn("Enter your sellingPrice")) : sellingUsdPrice === "" ? (toast.warn("Enter your sellingUsdPrice")) : duration === "" ? (toast.warn("Select your duration")) : (updateSales())}// eslint-disable-line
  };

  const updateSales = async () => {
    try {
      let url = "updateNfts";
      let params = {
        nftId: data._id,
        nftStatus:"onAuction",
        sellingMethod:sellingMethod,
        nftPrice: sellingPrice,
        usdPrice:sellingUsdPrice,
        soldTime: duration,
        ownerName:users.userName,
        ownerProfile:users.profilePic,
      };
      let response = await putMethod({ url, params });
      if (response.status) {
        getNfts();
        setTimemodal(false);
      }
    }
    catch (e) {
      console.log("error in updates", e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={openTimemodal} centered>
        <Box className="signupmodal">
          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{padding:"2%"}}>
            <h5 className="signuptextinmodal">Timed Auction</h5>
            <CgClose size={24} className="text-light pointer text-end" role="presentation" onClick={() => setTimemodal(false)} />
          </Grid>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ padding: "1% 4%" }}>
            <h5 className="text-light">Price</h5>
            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
              <Grid lg={12} xs={12} container>
                <label htmlFor>Method</label>
                {/* <input className="signupinput signupinputboxpadding1" placeholder="sell to highest bidter" /> */}
                <Select
                  styles={customStyles}
                  className="w-100"
                  options={nftlistDta}
                  defaultValue={nftlistDta[0]}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  onChange={(e) => setSellingMethod(e.value)}
                />
              </Grid>
              <Grid lg={12} xs={12} container>
                <label htmlFor className="mt-2">Min Bid Price</label>
                <input className="signupinput signupinputboxpadding1" placeholder="0 bloqs" onChange={(e) => setSellingPrice(e.target.value)}/>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="">
                <label htmlFor className="mt-2">USD</label>
                <input className="signupinput signupinputboxpadding1" placeholder="$0" onChange={(e) => setSellingUsdPrice(e.target.value)}/>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="">
                <label htmlFor className="mt-2">Duration</label>
                <input type="date" min={disablePastDate()} className="signupinput signupinputboxpadding1 unstyled"  onChange={(e) => setDuration(e.target.value)}/>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="center" className="mt-3">
                <Grid lg={4} xs={6} container>
                  <Button className="btns connectpad popinsMd" onClick={conditionCheck}>List for sale</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
export default TimeAuctionsModal;