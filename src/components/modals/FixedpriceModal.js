import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { Modal } from "react-bootstrap";
import "./modal.css";
import { CgClose } from "react-icons/cg";
// import { TbArrowsRightLeft }  from "react-icons/tb";
// import SignUpModal from "./SignUpmodal";
import Select from "react-select";
import { putMethod } from "../../apis";
import { toast } from "react-toastify";

const FixedPriceModal = ({ openModal, setOpenModal,data,getNfts }) => {

  const nftlistDta = [
    { value: "ETH", label: "ETH" },
    { value: "WETH", label: "WETH" },
  ];

  const [nftPrice, setNftPrice] = useState("");
  const [chain, setChain] = useState(nftlistDta[0].value);

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

  const conditionCheck = () =>{
    {nftPrice === "" ? (toast.warn("Enter your Price")) : (updateSales())}// eslint-disable-line
  };

  const updateSales = async () => {
    try {
      let url = "updateNfts";
      let params = {
        nftId: data._id,
        nftStatus:"onSale",
        nftPrice: nftPrice,
        salesChainType: chain,
      };
      let response = await putMethod({ url, params });
      if (response.status) {
        getNfts();
        setOpenModal(false);
      }
    }
    catch (e) {
      console.log("error in updates", e);
    }
  };

  return (
    <div>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={openModal} centered>
        <Box className="signupmodal">
          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "2%" }}>
            <h5 className="signuptextinmodal">Fixed Price</h5>
            <CgClose size={24} className="text-light pointer text-end" role="presentation" onClick={() => setOpenModal(false)} />
          </Grid>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" sx={{ padding: "0% 4%" }}>
            <h5 className="text-light">Price</h5>
            <Grid lg={12} xs={12} container justifyContent={{ lg: "space-between", xs: "center" }} alignItems="center">
              <Grid lg={12} xs={12} container className="signupinput mb-2 p-2" alignItems="center">
                <input type="number" className="signupinput1 w-75" placeholder="Amount" onChange={(e) => setNftPrice(e.target.value)} />
                <Select
                  styles={customStyles}
                  className="w-25"
                  options={nftlistDta}
                  defaultValue={nftlistDta[0]}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  onChange={(e) => setChain(e.value)}
                />
                {/* <input className="signupinput2 p-3" placeholder="ETH" disabled/> */}
              </Grid>
              {/* <Grid lg={12} xs={12} container justifyContent="">
                <label htmlFor className="mt-2">Duration</label>
                <input type="date" className="signupinput signupinputboxpadding1 unstyled" />
              </Grid> */}
              {/* <TbArrowsRightLeft size={24} className="mb-2 pointer"/>
              <Grid lg={5} xs={12} container className="mb-2">
                <input className="signupinput fixedPriceinputpaddings" placeholder="$0" />
              </Grid> */}
              <Grid lg={12} xs={12} container justifyContent="center" className="mt-3 mb-2">
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
export default FixedPriceModal;