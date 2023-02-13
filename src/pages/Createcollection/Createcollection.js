import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { HiPhotograph } from "react-icons/hi";
import { FiPercent } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import Avatar from "@mui/material/Avatar";
// import LinkURL from "../../assets/images/linkurl.svg";
import Fade from "react-reveal/Fade";
import { Stack } from "react-bootstrap";
import Select from "react-select";
import { postMethod } from "../../apis/index";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ReactS3Client } from "../../helpers";

function Createcollection() {

  const navigate = useNavigate();
  let width = window.innerWidth;
  const wallet = useSelector((state) => state.WalletConnect);
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const handleChange = () => { setToggle(current => !current); };
  const handleChange1 = () => { setToggle1(current => !current); };

  const ETHtoken = require("../../assets/images/connectwallet/ETH.svg").default;
  const MumbaiToken = require("../../assets/images/connectwallet/Matic.svg").default;
  const usdcToken = require("../../assets/banner/usdcLogo.svg").default;
  const usdtToken = require("../../assets/banner/usdtLogo.svg").default;

  const EthList = [
    { id:1,tokenImg:ETHtoken,value: "Goerli", label: "Goerli" },
    { id:2,tokenImg:MumbaiToken,value: "Mumbai", label: "Mumbai" },
  ];

  const EthList1 = [
    { id:1,tokenImg:usdcToken,value: "USDC", label: "USDC" },
    { id:2,tokenImg:usdtToken,value: "USDT", label: "USDT" },
  ];

  const CategoryList = [
    { value: "Art", label: "Art" },
    { value: "Music", label: "Music" },
    { value: "Video", label: "Video" },
    { value: "Gaming", label: "Gaming" },
    { value: "3D", label: "3D" },
    { value: "AvatarNft", label: "AvatarNft" },
  ];

  const [addAddress, setAddAddress] = useState([]);
  const [logoImage, setLogoImage] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [category, setCategory] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [socialMedialink, setSocialMedialink] = useState("");
  const [blockchainType, setBlockchainType] = useState(EthList[1].value);
  const [paymentTokens, setPaymentTokens] = useState("");
  const [floorPrice, setFloorPrice] = useState("");

  const handleAdd = () => {
    setAddAddress([...addAddress, {}]);
  };
  const handleRemove = (i) => {
    const values = [...addAddress];
    values.splice(i, 1);
    setAddAddress(values);
  };

  const handleAddress = async (e, index) => {
    const { name, value } = e;
    const list = [...addAddress];
    list[index][name] = value;
    setAddAddress(list);
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgb(22 22 45)",
      color: "white",
      border: "0px",
      outline: "0px",
      boxShadow: "0px",
      borderRadius: "10px",
      padding: "1.6%",
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

  const onLogoImgUpload = async (file) => {
    let name = file.name;
    let extension = "." + name.split(".").pop(); //jpg,jpeg,png
    let filename = "logoImage" + "_" + Date.now() + extension;// eslint-disable-line
    const data = await ReactS3Client.uploadFile(file, filename);
    setLogoImage(data.key);
  }

  const onfeatureImgUpload = async (file) => {
    let name = file.name;
    let extension = "." + name.split(".").pop(); //jpg,jpeg,png
    let filename = "featureImage" + "_" + Date.now() + extension;// eslint-disable-line
    const data = await ReactS3Client.uploadFile(file, filename);
    setFeatureImage(data.key);
  };

  const onbannerImgUpload = async (file) => {
    let name = file.name;
    let extension = "." + name.split(".").pop(); //jpg,jpeg,png
    let filename = "bannerImage" + "_" + Date.now() + extension;// eslint-disable-line
    const data = await ReactS3Client.uploadFile(file, filename);
    setBannerImage(data.key);
  };

  const conditionCheck = () =>{
    {logoImage === "" ? (toast.warn("Upload your logoImage")) : bannerImage === "" ? (toast.warn("Upload your bannerImage")) : collectionName === "" ? (toast.warn("Enter your collectionName")) : category === "" ? (toast.warn("Select category")) : floorPrice === "" ? (toast.warn("Enter floorPrice")) : !wallet.connected ? (toast.warn("Please connect wallet")) : (CreateCollections())}// eslint-disable-line
  };

  const CreateCollections = async () => {
    try {
      let url = "createCollection";
      let params = {
        walletAddress:wallet.address,
        logoImage: logoImage,
        featureImage: featureImage,
        bannerImage: bannerImage,
        collectionName: collectionName,
        collectionDescription: collectionDescription,
        category: category,
        floorPrice:floorPrice,
        websiteUrl: websiteUrl,
        socialMedialink: socialMedialink,
        blockchainType: blockchainType,
        creatorEarnings:addAddress,
        paymentTokens: paymentTokens,
        explicitContentStatus: toggle,
        rankingStatus: toggle1,
      };
      let response = await postMethod({ url, params });
      if (response.status) {
        toast("Successfully created")
        navigate("/collections");
      }
    }
    catch (e) {
      console.log("error in createCollections", e);
    }
  };

  return (
    <div>
      <Grid lg={12} xs={12} container justifyContent="center" className="mt-2 mb-4">
        <Grid lg={4.8} xs={10} container justifyContent={{ lg: "center", xs: "center" }}>
          <Fade bottom>
            <Stack gap={2}>
              {width > 600 ? (<>
                <h4 className="text-light text-start">Create a Collection</h4>
              </>) : (<>
                <h5 className="text-light text-start">Create a Collection</h5>
              </>)}
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start" direction="column">
                <font className="text-light text-start"><span className="text-danger">*</span>Required fields</font>
                <font className="text-light text-start mt-2" size={3} >Logo image<span className="text-danger">*</span></font>
                <font className="text-muted  text-justify text-start mt-2" size={2}>This image will also be used for navigation. 350 x 350 recommended.</font>
                <label className="gray-text text-start mt-2" style={{ margin: "0px", cursor: "pointer" }} htmlFor="upload-photo" >
                  {!logoImage ? (<>
                    <Avatar style={{ width: "100px", height: "100px", backgroundImage: "linear-gradient(to top, rgb(24 24 51), rgb(63 63 85))", marginTop: "4%" }}>
                      <HiPhotograph size={24} />
                    </Avatar>
                  </>) : (<>
                    <Avatar src={process.env.REACT_APP_S3_LINK+logoImage} style={{ width: "100px", height: "100px", backgroundImage: "linear-gradient(to top, rgb(24 24 51), rgb(63 63 85))", marginTop: "4%" }}>
                    </Avatar>
                  </>)}
                </label>
                <input style={{ display: "none" }} id="upload-photo" type="file" accept="image/*" onChange={(e) => onLogoImgUpload(e.target.files[0])} />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light text-start" size={3} >Featured image</font>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start" direction="column">
                <font className="text-muted text-justify text-start" size={2}>This image will be used for featuring your collection on the homepage,category pages, or other promotional areas of NFTs. 600 x 400 recommended.</font>
                <Grid lg={6} xs={12} container justifyContent="center" alignItems="center" className="mt-3">
                  {!featureImage ? (<>
                    <Box className="createNFT" sx={{ height: "230px", overflow: "hidden" }}>
                      <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                        <label className="gray-text" style={{ margin: "0px", cursor: "pointer", color: "aliceblue" }} htmlFor="upload-photo1" >
                          <HiPhotograph size={36} />
                        </label>
                        <input style={{ display: "none" }} id="upload-photo1" type="file" accept="image/*" name="feature" onChange={(e) => onfeatureImgUpload(e.target.files[0])} />
                      </Grid>
                    </Box>
                  </>) : (<>
                    <Box className="createNFT1" sx={{ height: "230px", overflow: "hidden" }}>
                      <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                        <label className="gray-text" style={{ margin: "0px", cursor: "pointer", color: "aliceblue" }} htmlFor="upload-photo1" >
                          <img src={process.env.REACT_APP_S3_LINK + featureImage} alt="featureimg" />
                        </label>
                        <input style={{ display: "none" }} id="upload-photo1" type="file" accept="image/*" name="feature" onChange={(e) => onfeatureImgUpload(e.target.files[0])} />
                      </Grid>
                    </Box>
                  </>)}
                </Grid>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light text-start" size={3}>Banner image<span className="text-danger">*</span></font>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start" direction="column">
                <font className="text-muted text-justify text-start" size={2}>This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 350 recommended.</font>
                <Grid lg={8} xs={12} container justifyContent="center" alignItems="center" className="mt-3">
                  {!bannerImage ? (<>
                    <Box className="createNFT" sx={{ height: "230px",overflow: "hidden" }}>
                      <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                        <label className="gray-text" style={{ margin: "0px", cursor: "pointer", color: "aliceblue" }} htmlFor="upload-photo2" >
                          <HiPhotograph size={36} />
                        </label>
                        <input style={{ display: "none" }} id="upload-photo2" type="file" accept="image/*" onChange={(e) => onbannerImgUpload(e.target.files[0])} />
                      </Grid>
                    </Box>
                  </>) : (<>
                    <Box className="createNFT1" sx={{ height: "230px", overflow: "hidden" }}>
                      <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                        <label className="gray-text" style={{ margin: "0px", cursor: "pointer", color: "aliceblue" }} htmlFor="upload-photo2" >
                          <img src={process.env.REACT_APP_S3_LINK + bannerImage} alt="featureimg" />
                        </label>
                        <input style={{ display: "none" }} id="upload-photo2" type="file" accept="image/*" name="feature" onChange={(e) => onbannerImgUpload(e.target.files[0])} />
                      </Grid>
                    </Box>
                  </>)}
                </Grid>
              </Grid>
              <Grid lg={10} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light" size={3}>Name<span className="text-danger">*</span></font>
                <input className="createCollectioninput w-100 mt-2" placeholder="Name" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light text-start" size={3}>URL</font>
              </Grid>
              <Grid lg={10} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-muted text-justify text-start" size={2}>Customize your URL on OpenSea. Must only contain lowercase letters,numbers, and hyphens.</font>
                <input className="createCollectioninput w-100 mt-2" placeholder="Enter URL" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light text-start" size={3}>Description</font>
              </Grid>
              <Grid lg={10} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-muted text-justify text-start" size={2}>Markdown syntax is supported. 0 of 1000 characters used</font>
                <textarea className="rewardInput w-100 mt-2" type="text" placeholder="Type here" style={{ height: "196px" }} value={collectionDescription} onChange={(e) => setCollectionDescription(e.target.value)} />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light text-start" size={3}>Category<span className="text-danger">*</span></font>
              </Grid>
              <Grid lg={12} xs={12} container >
                <font className="text-muted text-justify text-start" size={2}>Adding a category will help make your item discoverable on OpenSea.</font>
                <Grid lg={10} xs={12} container>
                  <Select
                    styles={customStyles}
                    className="w-100 mt-2"
                    options={CategoryList}
                    placeholder="Select Category"
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    onChange={(e) => setCategory(e.value)}
                  />
                  {/* <button className="glow-on-hover mt-2">
                    <font className="text-light text-start">Add category</font>
                  </button> */}
                </Grid>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light text-start" size={3}>Link</font>
              </Grid>
              {/* <Grid lg={10} xs={10} container className="nav-input p-3 mt-2">
                <input placeholder="Search" />
                <span style={{ width: "10%" }}></span>
              </Grid> */}
              <Grid lg={10} xs={12} className="collectionlinkinput" container justifyContent="flex-start" alignItems="">
                <div style={{ width:"5%" }}><BiWorld className="text-muted"/></div>
                <input className="collectionlinkinput1" placeholder="Your site" value={socialMedialink} onChange={(e) => setSocialMedialink(e.target.value)} />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light text-start" size={3}>Creator earnings</font>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start" direction="column">
                <font className="text-muted text-justify text-start" size={2}>Collection owners can collect creator earnings when a user re-sells an item they created. Contact the collection owner to change the collection earnings percentage or the payout address.</font>
                {/* <font className="text-muted collectiontextinbold text-start" size={3}> Adding multiple addresses may increase gas fees for buyers</font> */}
                <Grid lg={12} xs={12} container className="mt-2" alignItems="flex-start" justifyContent="flex-start">
                  {addAddress.map((row, i) => {
                    return (
                      <>
                        <Grid lg={12} xs={12} key={i} container justifyContent="space-between" className="mt-2">
                          <Grid lg={8} xs={7} container>
                            <input className="createNFT1valueinput createNFT3valueinput" placeholder="Please enter an address,e.g 0X1ed3... or desti..." name="creatorWalletAddress" value={row.creatorWalletAddress} onChange={(e) => handleAddress(e.target, i)} />
                          </Grid>
                          <Grid lg={2} xs={3} container  className="collectionlinkinput">
                            <input type="number" min="0" maxLength="10" className="collectionlinkinput1" name="royality" placeholder="0" value={row.royality} onChange={(e) => handleAddress(e.target, i)} />
                            <div style={{ width:"5%" }}><FiPercent className="text-muted"/></div>
                          </Grid>
                          <Grid lg={1} xs={1} container className="" justifyContent={{ lg: "flex-start", xs: "center" }} alignItems="center">
                            <MdDeleteForever size={24} className="deleteforever" onClick={() => handleRemove(i)} />
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
                <Grid lg={4} xs={4} container>
                  <button className="glow-on-hover mt-2" onClick={handleAdd}>
                    <font className="text-light">Add address</font>
                  </button>
                </Grid>
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light text-start" size={3}>Blockchain</font>
              </Grid>
              <Grid lg={10} xs={12} container sx={{ position: "relative" }} justifyContent="flex-start" alignItems="flex-start">
                <font className="text-muted text-justify text-start" size={2}>The number of items that can be minted. No gas cost to you!</font>
                <Select
                  styles={customStyles}
                  className="w-100"
                  options={EthList}
                  defaultValue={EthList[1]}
                  placeholder="Select..."
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  getOptionLabel={e => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={e.tokenImg} style={{ width: "6%" }} alt="tokenImg" />
                      <span style={{ marginLeft: 5 }}>{e.value}</span>
                    </div>
                  )}
                  onChange={(e) => setBlockchainType(e.value)}
                />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light text-start" size={3}>Floor Price<span className="text-danger">*</span></font>
              </Grid>
              <Grid lg={10} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <input type="number" className="createCollectioninput w-100 mt-2" placeholder="Enter floor price" value={floorPrice} onChange={(e) => setFloorPrice(e.target.value)} />
              </Grid>
              <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-light text-start" size={3}>Payment tokens</font>
              </Grid>
              <Grid lg={10} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                <font className="text-muted text-justify text-start" size={2}>These tokens can be used to buy and sell your items.</font>
                <Select
                  styles={customStyles}
                  className="w-100 mt-2"
                  options={EthList1}
                  placeholder="Add Token"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  getOptionLabel={e => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={e.tokenImg} style={{ width: "6%" }} alt="tokenImg" />
                      <span style={{ marginLeft: 5 }}>{e.value}</span>
                    </div>
                  )}
                  onChange={(e) => setPaymentTokens(e.value)}
                />
              </Grid>
              <Grid lg={10} xs={12} container sx={{ position: "relative" }} justifyContent="space-between" alignItems="flex-start">
                <font className="text-light text-justify" size={2}>Explicit & sensitive content</font>
                <label className="switch">
                  <input type="checkbox" className="checking" checked={toggle ? true : false} onChange={handleChange} />
                  <span className="slider round"></span>
                </label>
                <Grid lg={10} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                  <font className="text-muted text-start text-justify" size={2}>Set this collection as explicit and sensitive content</font>
                </Grid>
              </Grid>
              <Grid lg={10} xs={12} container sx={{ position: "relative" }} justifyContent="space-between" alignItems="flex-start">
                <font className="text-light text-start" size={2}>Show OpenRarity ranking</font>
                <label className="switch">
                  <input type="checkbox" className="checking" checked={toggle1 ? true : false} onChange={handleChange1} />
                  <span className="slider round"></span>
                </label>
                <Grid lg={10} xs={12} container justifyContent="flex-start" alignItems="flex-start">
                  <font className="text-muted text-justify" size={2}>Turn on after all items revealed and attribute metadata is finalized.</font>
                </Grid>
              </Grid>
              <Grid lg={10} xs={12} container justifyContent="flex-end">
                <Grid lg={4} xs={6} container>
                  <Button className="btns connectpad popinsMd" onClick={conditionCheck}>Create</Button>
                </Grid>
              </Grid>
            </Stack>
          </Fade>
        </Grid>
      </Grid>
    </div>
  );
}
export default Createcollection;