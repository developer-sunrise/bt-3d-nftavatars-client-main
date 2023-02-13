import React,{ useState,useEffect } from "react";
import { Grid, Box,Radio,Button } from "@mui/material";
import { Modal } from "react-bootstrap";
import "./modal.css";
import { CgClose } from "react-icons/cg";
import { walletDatas } from "../../helpers/datafile";
import { useDispatch,useSelector } from "react-redux";
import { connectWallet } from "../../redux/Action";
import { postMethod } from "../../apis"; 
import { useNavigate } from "react-router-dom";

const Walletmodal = ({ openWallet, setOpenWallet,value}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wallet = useSelector((state) => state.WalletConnect);
  const { address,web3 } = wallet;
  // const [showMore, setShowmore] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedwallet, setSelectedwallet] = useState("");
  const [showdata, setdatas] = useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.title);
    setSelectedwallet(event.wallet);
  };

  // const handleshowing = (val) => {
  //   if (val === "more") {
  //     setShowmore(true);
  //     setdatas(walletDatas);
  //   }
  //   else if (val === "less") {
  //     setShowmore(false);
  //     let values = walletDatas.slice(0, 4);
  //     setdatas(values);
  //   }
  // };

  const connect = async (walletname) => {
    if(value === "builter"){
      setOpenWallet(false);
      dispatch(connectWallet(walletname));
      navigate("/nft/create");
    }
    else{
      setOpenWallet(false);
      dispatch(connectWallet(walletname));
    }
  };

  const addUsers = async() =>{
    try{
      let url = "createUser";
      let params = {
        walletAddress:address,
      };
      let response = await postMethod({ url, params});
      if(response.status){
        console.log("response",response.result);
      }
    }
    catch(e){
      console.log("error in addusers",e);
    }
  };

  useEffect(() => {
    let values = walletDatas.slice(0, 4);
    setdatas(values);
  }, [address]);

  useEffect(() => {
    if(web3){
      addUsers();
    }
  }, [address,web3]);

  return (
    <div>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={openWallet} centered>
        <Box className="signupmodal">
          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "1% 4%" }}>
            <h5 className="signuptextinmodal">Connect Wallet</h5>
            <CgClose size={24} className="text-light pointer" role="presentation" onClick={() => setOpenWallet(false)} />
          </Grid>
          <Grid lg={12} xs={12} container alignItems="center" sx={{ padding: "1% 4%" }}>
            <h6 className="gradient-text-color">Choose your wallet to connect</h6>
            <Grid lg={12} xs={12} container>
              <Box className="boxconnect w-100">
                {showdata.map((item, index) => (<>
                  <Grid lg={12} xs={12} container key={index} justifyContent="space-between" alignItems="center">
                    <div className="d-flex align-items-center mt-2">
                      <img className="icons" src={item.img} alt="wallet" />
                      <font className="text-light">{item.title}</font>
                    </div>
                    <Radio
                      checked={selectedValue === item.title}
                      onChange={() => handleChange(item)}
                      value={item.title}
                      name="radio-buttons"
                      inputProps={{ "aria-label": item.title }}
                    />
                  </Grid>
                </>))}
                {/* {showMore === false ? (<>
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" onClick={() => handleshowing("more")}>
                    <font className="walletshowmoretext pointer">Show more</font>
                  </Grid>
                </>) : showMore === true ? (<>
                  <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" onClick={() => handleshowing("less")}>
                    <font className="walletshowmoretext pointer">Show less</font>
                  </Grid>
                </>) : (<></>)} */}
              </Box>
              <Grid lg={12} xs={12} container justifyContent="center" className="mt-3">
                <Grid lg={4} xs={8} container>
                  <Button className="btns connectpad popinsMd" onClick={() => { connect(selectedwallet); }}>Connect</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
export default Walletmodal;