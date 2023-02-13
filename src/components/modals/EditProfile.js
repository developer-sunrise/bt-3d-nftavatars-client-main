import React,{ useState,useEffect } from "react";
import { Grid, Box, IconButton, Avatar,Button } from "@mui/material";
import { Modal } from "react-bootstrap";
import "./modal.css";
import { CgClose } from "react-icons/cg";
import { putMethod } from "../../apis/index";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ReactS3Client } from "../../helpers";

const EditModal = ({ openEditmodal, setEditmodal,getUsers,usersData }) => {

  const wallet = useSelector((state) => state.WalletConnect);
  const [firstname,setFirstName] = useState("");
  const [lastname,setLastName] = useState("");
  const [username,setUserName] = useState("");
  const [profilePic,setProfilePic] = useState("");
  const editimg = require("../../assets/NFTimages/editpticon.svg").default;
  console.log(wallet);

  const onProfileImgUpload = async (file) => {
    if (file) {
      let name = file.name;
      let extension = "." + name.split(".").pop(); //jpg,jpeg,png
      let filename = "profile" + "_" + Date.now() + extension;// eslint-disable-line
      const data = await ReactS3Client.uploadFile(file, filename);
      setProfilePic(data.key);
    }
  };

  const conditionCheck = () =>{
    if(!firstname){
      toast.warn("Enter your firstName");
    }
    else if(!lastname){
      toast.warn("Enter your lastName");
    }
    else if(!username){
      toast.warn("Enter your userName");
    }
    else if(!profilePic){
      toast.warn("Upload your profilePic");
    }
    else{
      UpdateUsers();
    }
    // {firstname === "" ? (toast.warn("Enter your FirstName")) : lastname === "" ? (toast.warn("Enter your LastName")) : username === "" ? (toast.warn("Enter your UserName")) : profilePic === "" ? (toast.warn("Upload your Profilepic")) : (UpdateUsers())}// eslint-disable-line
  };

  const UpdateUsers = async() =>{
    try{
      let url = "editUser";
      let params = {
        walletAddress:wallet.address,
        firstName:firstname,
        lastName:lastname,
        userName:username,
        profilePic:profilePic,
      };
      let response = await putMethod({ url, params});
      if(response.status){
        toast("Update successfully");
        setEditmodal(false);
        getUsers();
      }
      else if(response.status === false){
        toast.warn(response.errors[0].msg);
      }
    }
    catch(e){
      console.log("error in addusers",e);
    }
  };

  const mapping = () => {
    setFirstName(usersData?.firstName);
    setLastName(usersData?.lastName);
    setUserName(usersData?.userName);
    setProfilePic(usersData?.profilePic);
  }

  useEffect(() => {
    mapping();
  }, [usersData]);

  return (
    <div>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={openEditmodal} centered>
        <Box className="signupmodal">
          <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{padding:"1% 4%"}}>
            <h5 className="signuptextinmodal">Edit profile</h5>
            <CgClose size={24} className="text-light pointer" role="presentation" onClick={() => setEditmodal(false)} />
          </Grid>
          <Grid lg={12} xs={12} container alignItems="center" sx={{ padding: "1% 4%" }}>
            <Grid container lg={12} alignItems="center" justifyContent={"center"} direction="column">
              {profilePic ? (<>
                <Avatar sx={{ width: "100px", height: "100px" }} src={process.env.REACT_APP_S3_LINK+profilePic} />
              </>) : (<>
                <Avatar sx={{ width: "100px", height: "100px" }}  />
              </>)}
              <IconButton className="icon_btn_upload buttonalign" style={{ marginTop: "-1.25em" }} color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={(e) => onProfileImgUpload(e.target.files[0])}/>
                <img src={editimg} style={{ width: "80%" }} alt="user" />
              </IconButton>
            </Grid>
            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
              <Grid lg={12} xs={12} container>
                <label htmlFor>First Name</label>
                <input className="signupinput signupinputboxpadding1" placeholder="Enter Firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
              </Grid>
              <Grid lg={12} xs={12} container>
                <label htmlFor className="mt-2">Last Name</label>
                <input className="signupinput signupinputboxpadding1" placeholder="Enter Lastname" value={lastname} onChange={(e) => setLastName(e.target.value)}/>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="">
                <label htmlFor className="mt-2">User Name</label>
                <input className="signupinput signupinputboxpadding1" placeholder="Enter Username" value={username} onChange={(e) => setUserName(e.target.value)}/>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="center" className="mt-3">
                <Grid lg={4} xs={8} container>
                  <Button className="btns connectpad popinsMd" onClick={conditionCheck}>Save profile</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
export default EditModal;