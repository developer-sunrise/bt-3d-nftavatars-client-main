import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { Modal, Image } from "react-bootstrap";
import "./modal.css";
import textlogo from "../../assets/metaverselogo.svg";
import { CgClose } from "react-icons/cg";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
// import SignUpModal from "./SignUpmodal";

const SignInModal = ({ openSignupmodal, setSignupmodal }) => {

  const [OtpVerifyModal,setOtpverifyModal] = useState(false);
  const [forgotPassword,setForgotPassword] = useState(false);
  const [forgotPasswordOTP,setForgotPasswordOTP] = useState(false);
  const [resetPassword,setResetPassword] = useState(false);
  const [registerModal,setRegister] = useState(false);
  const [signupOtpVerifyModal,setSignupOtpverifyModal] = useState(false);
  const [VerifyModal,setVerifyModal] = useState(false);
  const [emails,setEmails] = useState("");

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [values1, setValues1] = useState({
    password: "",
    retypepassword: "",
    showPassword: false,
    showPassword1: false,
  });

  const handleClickShowPassword = (data) => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowPassword1 = (data) => {
    if (data === "password") {
      setValues1({ ...values1, showPassword: !values1.showPassword });
    } else {
      setValues1({ ...values1, showPassword1: !values1.showPassword1 });
    }
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handlePasswordChange1 = (prop) => (event) => {
    setValues1({ ...values1, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const [values2, setValues2] = useState({
    password: "",
    retypepassword: "",
    showPassword: false,
    showPassword1: false,
  });

  const handleClickShowPassword2 = (data) => {
    if (data === "password") {
      setValues2({ ...values2, showPassword: !values2.showPassword });
    } else {
      setValues2({ ...values2, showPassword1: !values2.showPassword1 });
    }
  };

  const handlePasswordChange2 = (prop) => (event) => {
    setValues2({ ...values2, [prop]: event.target.value });
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const onSignin = () =>{
    localStorage.setItem("@logintype",emails);
  };

  return (
    <div>
      {/* SignIn Modal */}
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={openSignupmodal} centered>
        <Box className="signupmodal">
          <Grid lg={12} xs={12} container alignItems="center">
            <Grid lg={8.6} xs={11.4} container justifyContent={{lg:"flex-end",xs:"center"}}>
              <Image src={textlogo} className="signupmodalnftlogo pointer text-center" fluid />
            </Grid>
            <Grid lg={3} xs={0.6} container justifyContent="flex-end">
              <CgClose size={24} className="text-light pointer text-end" role="presentation" onClick={() => setSignupmodal(false)} />
            </Grid>
          </Grid>
          <Grid lg={12} xs={12} container alignItems="center" sx={{ padding: "1% 4%" }}>
            <h5 className="signuptextinmodal">SIGNIN</h5>
            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
              <Grid lg={12} xs={12} container justifyContent="">
                <label htmlFor className="mt-2">Email Address</label>
                <input className="signupinput signupinputboxpadding1" placeholder="Enter Email" onChange={(e) => setEmails(e.target.value)}/>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="">
                <label htmlFor className="mt-2">Password</label>
                <div className="d-flex justify-content-between signupinput">
                  <input
                    className="signupinput signupinputboxpadding1"
                    type={values.showPassword ? "text" : "password"}
                    onChange={handlePasswordChange("password")}
                    placeholder="Enter Password"
                  />
                  <Button
                    className="btnposition"
                    onClick={() => handleClickShowPassword("password")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? (
                      <BsEyeFill className="eyeIcons" />
                    ) : (
                      <BsEyeSlashFill className="eyeIcons" />
                    )}
                  </Button>
                </div>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-end" className="mt-2">
                <font className="signforgotpasswordtext pointer" role="presentation" onClick={() => {setForgotPassword(true);setSignupmodal(false);}}>Forgot Password</font>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="center" className="mt-2">
                <button className="glow-on-hover" onClick={() => {setSignupmodal(false);setOtpverifyModal(true);onSignin();}}>SIGNIN</button>
                <Grid lg={12} xs={12} container justifyContent="center" className="mt-2">
                  <small>Don&apos;t have an account?</small>
                  <small className="mx-2 alreadytext pointer" role="presentation" onClick={() => {setRegister(true);setSignupmodal(false);}}>Register</small>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={OtpVerifyModal} centered>
        <Box className="signupmodal" sx={{padding:"4% 3%"}}>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
            <h5 className="signuptextinmodal">ENTER OTP</h5>
            <font size={3} className="text-center px-2 mt-2">Enter the 2FA Verication OTP Send to you email Address.</font>
            <Grid lg={12} xs={12} container justifyContent="space-between" className="mt-3">
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
            </Grid>
            <button className="glow-on-hover mt-3" onClick={() => setOtpverifyModal(false)}>Verify</button>
          </Grid>
        </Box>
      </Modal>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={forgotPassword} centered>
        <Box className="signupmodal" sx={{ padding: "4% 5%" }}>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
            <h5 className="signuptextinmodal">FORGOT PASSWORD</h5>
            <Grid lg={12} xs={12} container justifyContent="space-between" className="mt-3">
              <label htmlFor>Email Address</label>
              <input className="signupinput signupinputboxpadding1" placeholder="Enter Email" />
            </Grid>
            <button className="glow-on-hover mt-4" onClick={() => {setForgotPassword(false);setForgotPasswordOTP(true);}}>Sent OTP</button>
          </Grid>
        </Box>
      </Modal>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={forgotPasswordOTP} centered>
        <Box className="signupmodal" sx={{padding:"4% 3%"}}>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
            <h5 className="signuptextinmodal">ENTER OTP</h5>
            <font size={3} className="text-center px-2 mt-2">Your verification code sent to your register email Address.</font>
            <Grid lg={12} xs={12} container justifyContent="space-between" className="mt-3">
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
            </Grid>
            <Grid lg={12} xs={12} container justifyContent="center" className="mt-3">
              <font size={3} className="signinresenttext pointer px-2">Resend OTP</font>
            </Grid>
            <button className="glow-on-hover mt-3" onClick={() => {setForgotPasswordOTP(false);setResetPassword(true);}}>Verify</button>
          </Grid>
        </Box>
      </Modal>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={resetPassword} centered>
        <Box className="signupmodal" sx={{ padding: "4% 5%" }}>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
            <h5 className="signuptextinmodal">RESET PASSWORD</h5>
            <Grid lg={12} xs={12} container justifyContent="space-between" className="mt-3">
              <label htmlFor className="mt-2">Password</label>
              <div className="d-flex justify-content-between signupinput">
                <input
                  className="signupinput signupinputboxpadding1"
                  type={values1.showPassword ? "text" : "password"}
                  onChange={handlePasswordChange1("password")}
                  placeholder="Enter Password"
                />
                <Button
                  className="btnposition"
                  onClick={() => handleClickShowPassword1("password")}
                  onMouseDown={handleMouseDownPassword1}
                >
                  {values1.showPassword ? (
                    <BsEyeFill className="eyeIcons" />
                  ) : (
                    <BsEyeSlashFill className="eyeIcons" />
                  )}
                </Button>
              </div>
            </Grid>
            <Grid lg={12} xs={12} container justifyContent="">
              <label htmlFor className="mt-2">Confirm Password</label>
              <div className="d-flex justify-content-between signupinput">
                <input
                  className="signupinput signupinputboxpadding1"
                  type={values1.showPassword1 ? "text" : "password"}
                  onChange={handlePasswordChange1("retypepassword")}
                  placeholder="Enter Password"
                />
                <Button
                  className="btnposition"
                  onClick={() =>
                    handleClickShowPassword1("retypepassword")
                  }
                  onMouseDown={handleMouseDownPassword1}
                >
                  {values1.showPassword1 ? (
                    <BsEyeFill className="eyeIcons" />
                  ) : (
                    <BsEyeSlashFill className="eyeIcons" />
                  )}
                </Button>
              </div>
            </Grid>
            <button className="glow-on-hover mt-4" onClick={() => {setResetPassword(false);setSignupmodal(true);}}>Reset Password</button>
          </Grid>
        </Box>
      </Modal>
      {/* SignUp Modal */}
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={registerModal} centered>
        <Box className="signupmodal">
          <Grid lg={12} xs={12} container alignItems="center">
            <Grid lg={8.6} xs={11.4} container justifyContent={{lg:"flex-end",xs:"center"}}>
              <Image src={textlogo} className="signupmodalnftlogo pointer text-center" fluid />
            </Grid>
            <Grid lg={3} xs={0.6} container justifyContent="flex-end">
              <CgClose size={24} className="text-light pointer text-end" role="presentation" onClick={() => setRegister(false)} />
            </Grid>
          </Grid>
          <Grid lg={12} xs={12} container alignItems="center" sx={{ padding: "1% 4%" }}>
            <h5 className="signuptextinmodal">SIGNUP</h5>
            <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
              <Grid lg={5.8} xs={12} container>
                <label htmlFor>First Name</label>
                <input className="signupinput signupinputboxpadding" placeholder="Enter Firstname" />
              </Grid>
              <Grid lg={5.8} xs={12} container>
                <label htmlFor>Last Name</label>
                <input className="signupinput signupinputboxpadding" placeholder="Enter Lastname" />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="">
                <label htmlFor className="mt-2">Email Address</label>
                <input className="signupinput signupinputboxpadding1" placeholder="Enter Email" />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="">
                <label htmlFor className="mt-2">Password</label>
                <div className="d-flex justify-content-between signupinput">
                  <input
                    className="signupinput signupinputboxpadding1"
                    type={values2.showPassword ? "text" : "password"}
                    onChange={handlePasswordChange2("password")}
                    placeholder="Enter Password"
                  />
                  <Button
                    className="btnposition"
                    onClick={() => handleClickShowPassword2("password")}
                    onMouseDown={handleMouseDownPassword2}
                  >
                    {values2.showPassword ? (
                      <BsEyeFill className="eyeIcons" />
                    ) : (
                      <BsEyeSlashFill className="eyeIcons" />
                    )}
                  </Button>
                </div>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="">
                <label htmlFor className="mt-2">Confirm Password</label>
                <div className="d-flex justify-content-between signupinput">
                  <input
                    className="signupinput signupinputboxpadding1"
                    type={values2.showPassword1 ? "text" : "password"}
                    onChange={handlePasswordChange2("retypepassword")}
                    placeholder="Enter Password"
                  />
                  <Button
                    className="btnposition"
                    onClick={() =>
                      handleClickShowPassword2("retypepassword")
                    }
                    onMouseDown={handleMouseDownPassword2}
                  >
                    {values2.showPassword1 ? (
                      <BsEyeFill className="eyeIcons" />
                    ) : (
                      <BsEyeSlashFill className="eyeIcons" />
                    )}
                  </Button>
                </div>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="center" className="mt-3">
                <button className="glow-on-hover" onClick={() => {setRegister(false);setVerifyModal(true);}}>SIGNUP</button>
                <Grid lg={12} xs={12} container justifyContent="center" className="mt-2">
                  <small>Already have an account?</small>
                  <small className="mx-2 alreadytext pointer" role="presentation" onClick={() => {setRegister(false);setSignupmodal(true);}}>Sign in</small>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={VerifyModal} centered>
        <Box className="signupmodal" sx={{padding:"3% 0%"}}>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
            <h5 className="signuptextinmodal">VERIFY YOUR EMAIL</h5>
            <font size={3} className="text-center px-2 mt-2">
              We will send you a link on your email address,
              <br /> click on the same to verify.
            </font>
            <button className="glow-on-hover mt-3" onClick={() => {setVerifyModal(false);setSignupOtpverifyModal(true);}}>Close</button>
          </Grid>
        </Box>
      </Modal>
      <Modal size="md" aria-labelledby="contained-modal-title-vcenter" show={signupOtpVerifyModal} centered>
        <Box className="signupmodal" sx={{padding:"4% 3%"}}>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
            <h5 className="signuptextinmodal">ENTER OTP</h5>
            <font size={3} className="text-center px-2 mt-2">Enter the 2FA Verification OTP Send to you email Address.</font>
            <Grid lg={12} xs={12} container justifyContent="space-between" className="mt-3">
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
              <input className="signupotpinput" maxLength={1} type="numeric" />
            </Grid>
            <button className="glow-on-hover mt-3" onClick={() => setSignupOtpverifyModal(false)}>Verify</button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
export default SignInModal;