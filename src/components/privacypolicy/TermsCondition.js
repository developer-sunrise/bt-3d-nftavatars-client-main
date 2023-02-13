import React from "react";
import { Box, Modal} from "@mui/material";
import { CgClose } from "react-icons/cg";
import "./privacy.css";

function Terms({ openWallet, setOpenWallet }) {
  // const [show, setShow] = useState(false);

  return (
    <div>
      <Box>
        <Modal sx={{overflow:"auto"}} open={openWallet} onClose={() => setOpenWallet(false)} BackdropProps={{ style: { backgroundColor: "rgba(3,6,20,0.9)" } }}>
          <Box className="modal-box">
            <div className="termsmodal">
              <Box className="privacyheader">
                <h5 className="signuptextinmodal m-0">TERMS AND CONDITIONS</h5>
                <CgClose size={25} onClick={() => setOpenWallet(false)} style={{ cursor: "pointer" }} />
              </Box>
              <Box className="privacyheader mt-3">
                <h6 className="text-light m-0 text-center">PERSONALLY IDENTIFIABLE INFORMATION</h6>
              </Box>
              <Box className="privacyheader mt-2">
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
    </div>
  );
}

export default Terms;
