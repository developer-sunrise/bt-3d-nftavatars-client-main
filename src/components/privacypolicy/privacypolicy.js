import React from "react";
import { Box, Modal, Grid,Button } from "@mui/material";
import { CgClose } from "react-icons/cg";
import "./privacy.css";

function Privacy({ openWallet, setOpenWallet, check }) {
  // const [show, setShow] = useState(false);

  const Modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "rgb(19 19 33)",
    border: false,
    boxShadow: 24,
    borderRadius: "5%",
    p: 3,
    outline: "none"
  };
  return (
    <div>
      {check === "privacy" ? (<>
        <Box>
          <Modal open={openWallet} onClose={() => setOpenWallet(false)} BackdropProps={{ style: { backgroundColor: "rgba(3,6,20,0.9)" } }} sx={{ overflow: "auto" }}>
            <Box className="modal-box">
              <div className="privacymodal">
                <Box className="privacyheader">
                  <h5 className="signuptextinmodal m-0">PRIVACY POLICY</h5>
                  <CgClose size={25} onClick={() => setOpenWallet(false)} style={{ cursor: "pointer" }} />
                </Box>
                <Box className="privacyheader">
                  <Grid lg={12} xs={12} container>
                    <font className="text-muted" size={3}>
                      By using or accessing the service in any manner, you acknowledge that you accept the practices and policies outlined in this Privacy Policy, and you hereby consent that we will collect, use, and share your information in the following ways.
                    </font>
                  </Grid>
                </Box>
                <Box className="privacyheader">
                  <h6 className="text-light m-0">WHAT DATA WE COLLECT AND WHY WE COLLECT</h6>
                </Box>
                <Box className="privacyheader">
                  <font className="text-muted" size={3}>
                    As is true of most websites, we gather certain information (such as mobile provider, operating system, etc.) automatically and store it in log files. We use this information, which does not identify individual users, to analyze trends, to administer the website, to track users movements around the website and to gather demographic information about our user base as a whole. We may link some of this automatically-collected data to certain Personally Identifiable Information.
                  </font>
                </Box>
                <Box className="privacyheader">
                  <h6 className="text-light m-0">PERSONALLY IDENTIFIABLE INFORMATION</h6>
                </Box>
                <Box className="privacyheader">
                  <font className="text-muted" size={3}>
                    If you are a Client, when you register with us via our Website, we will ask you for some personally identifiable information, such as your first and last name, company name, email address, billing address, and credit card information. You may review and update this personally identifiable information in your profile by logging in and editing such information on your dashboard. If you decide to delete all of your information, we may cancel your account. We may retain an archived copy of your records as required by law or for reasonable business purposes.
                  </font>
                </Box>
                <Box className="privacyheader">
                  <font className="text-muted" size={3}>
                    Due to the nature of the Service, except to assist Clients with certain limited technical problems or as otherwise legally compelled, we will not access any of the Content that you upload to the Service.
                  </font>
                </Box>
                <Box className="privacyheader">
                  <font className="text-muted" size={3}>
                    Some Personally Identifiable Information may also be provided to intermediaries and third parties who assist us with the Service, but who may make no use of any such information other than to assist us in providing the Service. Except as otherwise provided in this Privacy Policy, however, we will not rent or sell your Personally Identifiable Information to third parties.
                  </font>
                </Box>
              </div>
            </Box>
          </Modal>
        </Box>
      </>) : (<>
        <Modal
          open={openWallet} onClose={() => setOpenWallet(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableEnforceFocus="true"
        >
          <Box sx={Modalstyle} className="connectcompany">
            <Grid lg={12} container justifyContent={"space-between"} alignItems="center" className={"pb-4"}>
              <h5 className="m-0 signuptextinmodal">Lets connect together</h5>
              <CgClose size={25} style={{ cursor: "pointer", color: "darkgray" }} onClick={() => setOpenWallet(false)} />
            </Grid>
            <Grid lg={12} container justifyContent={"center"} alignItems="center">
              <Box className="privacyheader">
                <Grid lg={12} xs={12} container>
                  <font className="text-muted" size={3}>
                    Write to us or give us a call.We will reply to you as soon as possible.But yes, it can take up to 24 hours.
                  </font>
                </Grid>
              </Box>
              <Grid container lg={12} className="editProfileImageBox pt-2" alignItems="center" justifyContent={"center"}>
                <Grid lg={12} spacing={2} container justifyContent={"space-between"} className="py-3 ">
                  <Grid lg={12} item container justifyContent={"flex-start"} >
                    <Grid container lg={12} xs={12} className="input_bg" alignItems="center" justifyContent="space-between">
                      <input className="rewardInput w-100" placeholder="First name" />
                    </Grid>
                  </Grid>
                  <Grid lg={12} item container justifyContent={"flex-start"} >
                    <Grid container lg={12} xs={12} className="input_bg" alignItems="center" justifyContent="space-between">
                      <input className="rewardInput w-100" placeholder="Email address" />
                    </Grid>
                  </Grid>
                  <Grid lg={12} item container justifyContent={"flex-start"} >
                    <Grid container lg={12} xs={12} className="input_bg" alignItems="center" justifyContent="space-between">
                      <input className="rewardInput w-100" placeholder="Questions" />
                    </Grid>
                  </Grid>
                  <Grid lg={12} item container justifyContent={"flex-start"} >
                    <Grid container lg={12} xs={12} className="input_bg" alignItems="center" justifyContent="space-between">
                      <textarea className="rewardInput w-100" type="text" placeholder="Details" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid lg={12} item container justifyContent={"flex-end"} >
                  <Grid lg={4} xs={8} container>
                    <Button className="btns connectpad popinsMd">Send now</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </>)}
    </div>
  );
}

export default Privacy;
