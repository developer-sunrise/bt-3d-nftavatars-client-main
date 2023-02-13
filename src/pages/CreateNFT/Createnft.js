import React, { useState, useEffect } from "react";
import { Grid, Box, Button, Avatar } from "@mui/material";
import "./Createnft.css";
import { BsPlus, BsPlusCircleFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { HiMinusCircle } from "react-icons/hi2";
import { HiMinusSm } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { Stack } from "react-bootstrap";
import Select from "react-select";
import { useSelector } from "react-redux";
import { getMethod, postMethod } from "../../apis/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactS3Client } from "../../helpers";

function Createnft() {

  // let width = window.innerWidth;
  const wallet = useSelector((state) => state.WalletConnect);
  const Addimg = require("../../assets/images/addimage.svg").default;
  // const NFTName = require("../../assets/images/iconnftname.svg").default;
  // const LinkURL = require("../../assets/images/linkurl.svg").default;
  // const selimg = require("../../assets/images/select.svg").default;
  // const Eth = require("../../assets/images/ethereumimg.svg").default;
  const ETHtoken = require("../../assets/images/connectwallet/ETH.svg").default;
  const MumbaiToken = require("../../assets/images/connectwallet/Matic.svg").default;

  const EthList = [
    { tokenImg: ETHtoken, value: "Goerli", label: "Goerli" },
    { tokenImg: MumbaiToken, value: "Mumbai", label: "Mumbai" },
  ];

  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [levels, setLevels] = useState([]);
  const [addPropertiesBox, setAddProperties] = useState([]);
  const [addStats, setAddStats] = useState([]);
  const [collectionList, setCollectionsList] = useState([]);
  const [value, setvalue] = useState(0);
  const handleChange = () => { setToggle(current => !current); };
  const handleChange1 = () => { setToggle1(current => !current); };
  const [nftImage, setNftImage] = useState("");
  const [nftName, setNftName] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [blockchainType, setBlockchainType] = useState(EthList[1]?.value);
  const [unlockableContent, setUnlockableContent] = useState("");
  const [users,setUsers] = useState("");

  const handleadd = (val) => {
    if (val === "add") {
      setvalue(value + 1);
    }
    else if (val === "remove") {
      if (value === 0) {
        setvalue(0);
      }
      else {
        setvalue(value - 1);
      }
    }
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

  const handleAdd = (val) => {
    if (val === "levels") {
      setLevels([...levels, {}]);
    }
    else if (val === "properties") {
      setAddProperties([...addPropertiesBox, {}]);
    }
    else if (val === "stats") {
      setAddStats([...addStats, {}]);
    }
  };
  const handleRemove = (val, i) => {
    if (val === "levels") {
      const values = [...levels];
      values.splice(i, 1);
      setLevels(values);
    }
    else if (val === "properties") {
      const values1 = [...addPropertiesBox];
      values1.splice(i, 1);
      setAddProperties(values1);
    }
    else if (val === "stats") {
      const values2 = [...addStats];
      values2.splice(i, 1);
      setAddStats(values2);
    }
  };

  const handleProperties = async (e, index) => {
    const { name, value } = e;
    const list = [...addPropertiesBox];
    list[index][name] = value;
    setAddProperties(list);
  };

  const handleLevels = async (e, index) => {
    const { name, value } = e;
    const list = [...levels];
    list[index][name] = value;
    setLevels(list);
  };

  const handleStats = async (e, index) => {
    const { name, value } = e;
    const list = [...addStats];
    list[index][name] = value;
    setAddStats(list);
  };

  const getCollections = async () => {
    try {
      let url = "viewCollection";
      let response = await getMethod({ url });
      if (response.status) {
        const data = response.result.filter((val) => val.walletAddress === wallet.address);
        let collections = [];
        data.map((temp) => {// eslint-disable-line
          let val = { id: temp._id, label: temp.collectionName, value: temp.collectionName, collectionLogo: temp.logoImage };
          collections.push(val);
        });
        setCollectionsList(collections);
      }
    }
    catch (e) {
      console.log("error in getCollections", e);
    }
  };

  const getUsers = async () => {
    try {
      let url = "viewUser";
      let response = await getMethod({ url });
      if (response.status) {
        const data = response.result.filter((val) => val.walletAddress === wallet.address);
        setUsers(data[0]);
        console.log("users",data);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const conditionCheck = () => {
    { nftImage === "" ? (toast.warn("Upload your nftImage")) : nftName === "" ? (toast.warn("Enter your nftName")) : collectionName === "" ? (toast.warn("Select your collections")) : !wallet.connected ? (toast.warn("Please connect your wallet"))  : (CreateNfts()) }// eslint-disable-line
  };

  const CreateNfts = async () => {
    try {
      let url = "createNfts";
      let params = {
        walletAddress: wallet.address,
        ownerName:users.userName,
        ownerProfile:users.profilePic,
        nftImage: nftImage,
        nftName: nftName,
        nftDescription: nftDescription,
        externalUrl: externalUrl,
        // jsonDataUrl: jsonDataUrl,
        collectionId: collectionName.id,
        collectionName: collectionName.value,
        properties: addPropertiesBox,
        levels: levels,
        stats: addStats,
        blockchainType: blockchainType,
        unlockableContent: unlockableContent,
        supply: value,
        explicitContentStatus: toggle1,
      };
      let response = await postMethod({ url, params });
      if (response.status) {
        toast("Successfully created")
        navigate("/collections");
      }
    }
    catch (e) {
      console.log("error in createNfts", e);
    }
  };


  const onNftImage = async (file) => {
    let name = file.name;
    let extension = "." + name.split(".").pop(); //jpg,jpeg,png
    let filename = "nftImage" + "_" + Date.now() + extension;// eslint-disable-line
    const data = await ReactS3Client.uploadFile(file, filename);
    setNftImage(data.key);
  };

  console.log("nftsdata", nftImage, collectionName, blockchainType);
  useEffect(() => {
    getCollections();
    getUsers();
  }, [wallet]);

  return (
    <div>
      <Grid lg={12} xs={12} container justifyContent="space-between" sx={{ padding: "0% 8%" }}>
        <h2 className="text-light">Build NFT image</h2>
      </Grid>
      <Fade bottom>
        <Grid lg={12} xs={12} container sx={{ padding: "0% 8%" }}>
          <Grid lg={7} xs={12} justifyContent="space-between" >
            <Stack gap={3}>
              <Grid lg={12} xs={12} container>
                <font className="text-light">Image, Video, Audio, or 3D Model<span className="text-danger">*</span></font>
              </Grid>
              <Grid lg={12} xs={12} container>
                <Grid lg={11} xs={12} container>
                  {!nftImage ? (<>
                    <Box className="createNFT" >
                      <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                        <label className="gray-text" style={{ margin: "0px", cursor: "pointer" }} htmlFor="upload-photo" >
                          <img src={Addimg} alt="nft" />
                        </label>
                        <input style={{ display: "none" }} id="upload-photo" type="file" accept="image/*" onChange={(e) => onNftImage(e.target.files[0])} />
                      </Grid>
                    </Box>
                  </>) : (<>
                    <Box className="createNFT" sx={{ overflow: "hidden" }}>
                      <Grid lg={12} xs={12} container justifyContent="center" alignItems="center">
                        <label className="gray-text" style={{ margin: "0px", cursor: "pointer", color: "aliceblue" }} htmlFor="upload-photo" >
                          <img src={process.env.REACT_APP_S3_LINK + nftImage} alt="featureimg" />
                        </label>
                        <input style={{ display: "none" }} id="upload-photo" type="file" accept="image/*" name="feature" onChange={(e) => onNftImage(e.target.files[0])} />
                      </Grid>
                    </Box>
                  </>)}
                </Grid>
              </Grid>
              <Grid lg={12} xs={12} container>
                <Grid lg={11} xs={12} container justifyContent="space-between">
                  <Grid container lg={5.2} xs={12} className="input_bg" alignItems="center" justifyContent="flex-start" sx={{ position: "relative" }}>
                    <span className="Medium pb-1 text-light">Name<span className="text-danger">*</span></span>
                    <input className="collectionlinkinput p-2 w-100" placeholder="NFT Name" value={nftName} onChange={(e) => setNftName(e.target.value)} />
                  </Grid>
                  <Grid container lg={5.6} xs={12} className="input_bg spaceinmobileviewforprofilepage" alignItems="flex-start" justifyContent="flex-start">
                    <span className="Medium pb-1 text-light">Descriptions</span>
                    <font className="crdescription text-justify text-muted " size={2}>The description will be included on the it’s detail page undeneath its image. Markdown syntax is suppported</font>
                  </Grid>
                </Grid>
              </Grid>
              <Grid lg={12} xs={12} container>
                <Grid lg={11} xs={12} container justifyContent="space-between">
                  <Grid container lg={5.2} xs={12} className="input_bg" alignItems="center" justifyContent="flex-start" sx={{ position: "relative" }}>
                    <span className="Medium pb-1 text-light">External link</span>
                    <font className="crdescription text-justify text-muted" size={2}>Nft marketplace will include a link to this URL on this item’s details page, So that users can click to learn more about it. you are welcome to link to your own webpage with more details.</font>
                    <Grid lg={12} xs={12} className="collectionlinkinput p-2" container justifyContent="flex-start" alignItems="">
                      <div style={{ width: "5.8%" }}><BiWorld className="text-muted" /></div>
                      <input className="collectionlinkinput1" placeholder="Link Url" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} />
                    </Grid>
                  </Grid>
                  <Grid container lg={5.6} xs={12} className="input_bg spaceinmobileviewforprofilepage" alignItems="flex-start" justifyContent="flex-start">
                    <textarea className="rewardInput w-100" type="text" placeholder="Type here" style={{ height: "196px" }} value={nftDescription} onChange={(e) => setNftDescription(e.target.value)} />
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid lg={5} xs={12} container justifyContent="flex-start" alignItems="flex-start">
            <Grid lg={12} xs={12} container className="spaceinmobileviewforprofilepage">
              <Stack gap={3}>
                <Grid lg={10} xs={12} container justifyContent="space-between">
                  <font className="text-light">Collection</font>
                  <button className="pushable2 " onClick={() => navigate("/collection/create")}>
                    <font className="mainbutton2">New Collection</font>
                  </button>
                </Grid>
                <Grid lg={10} xs={12} container sx={{ position: "relative" }}>
                  <span className="Medium pb-1 text-justify text-muted">This collection where your item will appear.</span>
                  <Select
                    styles={customStyles}
                    className="w-100"
                    options={collectionList}
                    placeholder="Select collection"
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    getOptionLabel={e => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={process.env.REACT_APP_S3_LINK + e.collectionLogo} sx={{width:"30px",height:"30px"}} alt="collectionLogo" />
                        <span style={{ marginLeft: 5 }}>{e.value}</span>
                      </div>
                    )}
                    onChange={(e) => setCollectionName(e)}
                  />
                </Grid>
                <Grid lg={10} xs={12} container justifyContent="space-between">
                  <font className="text-light">Properties</font>
                  <span className="bscirclecr" role="presentation" onClick={() => handleAdd("properties")}><BsPlusCircleFill className="pluscircle" size={24} /><span style={{ color: "white", position: "absolute", right: "0%" }} ><BsPlus size={24} /></span></span>
                </Grid>
                <Grid lg={10} xs={12} container sx={{ position: "relative" }} alignItems="flex-start" justifyContent="flex-start">
                  <span className="Medium pb-1 text-justify text-muted">Textual traits that show up as rectangles</span>
                  <span className="crdescription pb-1 mt-2 text-justify text-muted">Properties show up underneath your item, are clickable, and can be filtered in your collection&apos;s sidebar.</span>
                  {addPropertiesBox?.length !== 0 ? (<>
                    <Grid lg={10.3} xs={10.3} container justifyContent="space-between">
                      <Grid lg={5.2} xs={5.2} container>
                        <font className="text-light">Type</font>
                      </Grid>
                      <Grid lg={5.2} xs={5.2} container>
                        <font className="text-light">Name</font>
                      </Grid>
                    </Grid>
                  </>) : (<></>)}
                  {addPropertiesBox.map((row, i) => {
                    return (<>
                      <Grid lg={12} xs={12} key={i} container justifyContent="space-between" alignItems="center">
                        <Grid lg={5.2} xs={5.2}>
                          <input className="createNFT1valueinput mt-2" placeholder="Character" name="propertiesType" value={row.propertiesType} onChange={(e) => handleProperties(e.target, i)} />
                        </Grid>
                        <Grid lg={5.2} xs={5.2}>
                          <input className="createNFT1valueinput mt-2" placeholder="Male" name="propertiesName" value={row.propertiesName} onChange={(e) => handleProperties(e.target, i)} />
                        </Grid>
                        <Grid lg={0.4} xs={0.4} container justifyContent={{ lg: "flex-end", xs: "center" }} alignItems="center">
                          <span className="bscirclecr" role="presentation" onClick={() => handleRemove("properties", i)}><HiMinusCircle className="pluscircle" size={30} /><span className="nftcreateinputinremoved"><HiMinusSm size={22} /></span></span>
                        </Grid>
                      </Grid>
                    </>);
                  })}
                </Grid>
                {/* {width > 600 ? (<>
                  <Grid lg={10} xs={12} container sx={{ position: "relative" }} alignItems="flex-start" justifyContent="flex-start">
                    <span className="Medium pb-1 text-muted">Textual traits that show up as rectangles</span>
                    <span className="crdescription pb-1 mt-2 text-muted">Properties show up underneath your item, are clickable, and can be filtered in your collection&apos;s sidebar.</span>
                    {addPropertiesBox?.length !== 0 ? (<>
                      <Grid lg={10.3} xs={12} container justifyContent="space-between">
                        <Grid lg={5.2} xs={12} container className="">
                          <font className="text-light">Type</font>
                        </Grid>
                        <Grid lg={5.2} xs={12} container className="spaceinmobileviewforprofilepage">
                          <font className="text-light">Name</font>
                        </Grid>
                      </Grid>
                    </>) : (<></>)}
                    {addPropertiesBox.map((i) => {
                      return (<>
                        <Grid lg={12} xs={12} key={i} container justifyContent="space-between">
                          <Grid lg={5.2} xs={12} container className="">
                            <input className="createNFT1valueinput mt-2" placeholder="Character" />
                          </Grid>
                          <Grid lg={5.2} xs={12} container className="spaceinmobileviewforprofilepage">
                            <input className="createNFT1valueinput mt-2" placeholder="Male" />
                          </Grid>
                          <Grid lg={0.4} xs={12} container className="spaceinmobileviewforprofilepage" justifyContent={{ lg: "flex-end", xs: "center" }} alignItems="center">
                            <span className="bscirclecr" role="presentation" onClick={() => handleRemove("properties", i)}><HiMinusCircle className="pluscircle" size={30} /><span className="nftcreateinputinremoved"><HiMinusSm size={22} /></span></span>
                          </Grid>
                        </Grid>
                      </>);
                    })}
                  </Grid>
                </>) : (<>
                  <Grid lg={10} xs={12} container sx={{ position: "relative" }} alignItems="flex-start" justifyContent="flex-start">
                    <span className="Medium pb-1 text-muted">Textual traits that show up as rectangles</span>
                    <span className="crdescription pb-1 mt-2 text-muted">Properties show up underneath your item, are clickable, and can be filtered in your collection&apos;s sidebar.</span>
                    {addPropertiesBox.map((i) => {
                      return (<>
                        <Grid lg={12} xs={12} key={i} container justifyContent="space-between">
                          <Grid lg={5.2} xs={12} container className="">
                            <font className="text-light">Type</font>
                            <input className="createNFT1valueinput mt-2" placeholder="Character" />
                          </Grid>
                          <Grid lg={5.2} xs={12} container className="spaceinmobileviewforprofilepage">
                            <font className="text-light">Name</font>
                            <input className="createNFT1valueinput mt-2" placeholder="Male" />
                          </Grid>
                          <Grid lg={0.4} xs={12} container className="spaceinmobileviewforprofilepage" justifyContent={{ lg: "flex-end", xs: "center" }} alignItems="center">
                            <span className="bscirclecr" role="presentation" onClick={() => handleRemove("properties", i)}><HiMinusCircle className="pluscircle" size={30} /><span className="nftcreateinputinremoved"><HiMinusSm size={22} /></span></span>
                          </Grid>
                        </Grid>
                      </>);
                    })}
                  </Grid>
                </>)} */}
                <Grid lg={10} xs={12} container justifyContent="space-between">
                  <font className="text-light">Levels</font>
                  <span className="bscirclecr" role="presentation" onClick={() => handleAdd("levels")}><BsPlusCircleFill className="pluscircle" size={24} /><span style={{ color: "white", position: "absolute", right: "0%" }} ><BsPlus size={24} /></span></span>
                </Grid>
                <Grid lg={10} xs={12} container sx={{ position: "relative" }} alignItems="flex-start" justifyContent="flex-start">
                  <span className="crdescription pb-1 text-justify text-muted">Numerical traits that show as a progress bar</span>
                  <span className="crdescription pb-1 text-justify mt-2 text-muted">Levels show up underneath your item, are clickable, and can be filtered in your collection&apos;s sidebar.</span>
                  {levels?.length !== 0 ? (<>
                    <Grid lg={10.3} xs={10.3} container justifyContent="space-between">
                      <Grid lg={5.2} xs={5.2} container>
                        <font className="text-light">Speed</font>
                      </Grid>
                      <Grid lg={5.2} xs={5.2} container>
                        <font className="text-light">Value</font>
                      </Grid>
                    </Grid>
                  </>) : (<></>)}
                  {levels.map((row, i) => {
                    return (
                      <>
                        <Grid lg={12} xs={12} key={i} container justifyContent="space-between" className="mt-2">
                          <Grid lg={5.2} xs={4.8} container>
                            <input className="createNFT1valueinput" placeholder="Speed" name="speed" value={row.speed} onChange={(e) => handleLevels(e.target, i)} />
                          </Grid>
                          <Grid lg={5.2} xs={5.2} container>
                            <Grid lg={12} xs={12} container justifyContent={"space-between"} alignItems="center">
                              <Grid lg={5} xs={5} container>
                                <input type="number" min="0" className="createNFT2valueinput" placeholder="0" name="value1" value={row.value1} onChange={(e) => handleLevels(e.target, i)} />
                              </Grid>
                              <Grid lg={1} xs={1} container justifyContent="center">
                                <small className="text-light">Of</small>
                              </Grid>
                              <Grid lg={5} xs={5} container>
                                <input type="number" min="0" className="createNFT2valueinput" placeholder="0" name="value2" value={row.value2} onChange={(e) => handleLevels(e.target, i)} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid lg={0.4} xs={0.4} container justifyContent={{ lg: "flex-end", xs: "center" }} alignItems="center">
                            <span className="bscirclecr" role="presentation" onClick={() => handleRemove("levels", i)}><HiMinusCircle className="pluscircle" size={30} /><span className="nftcreateinputinremoved"><HiMinusSm size={22} /></span></span>
                            {/* {row === 0 ? (<>
                              <span className="bscirclecr"><HiMinusCircle className="pluscircle" size={30} /><span style={{ color: "white", position: "absolute", right: "16%", top: "2%" }} ><HiMinusSm size={22} /></span></span>
                            </>) : (<>
                              <span className="bscirclecr" role="presentation" onClick={() => handleRemove(i)}><HiMinusCircle className="pluscircle" size={30} /><span style={{ color: "white", position: "absolute", right: "16%", top: "2%" }} ><HiMinusSm size={22} /></span></span>
                            </>)} */}
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                  {/* {width > 600 ? (<>
                    {levels?.length !== 0 ? (<>
                      <Grid lg={10.3} xs={12} container justifyContent="space-between">
                        <Grid lg={5.2} xs={12} container className="">
                          <font className="text-light">Speed</font>
                        </Grid>
                        <Grid lg={5.2} xs={12} container className="spaceinmobileviewforprofilepage">
                          <font className="text-light">Value</font>
                        </Grid>
                      </Grid>
                    </>) : (<></>)}
                    {levels.map((i) => {
                      return (
                        <>
                          <Grid lg={12} xs={12} key={i} container justifyContent="space-between" className="mt-2">
                            <Grid lg={5.2} xs={12} container>
                              <input className="createNFT1valueinput" placeholder="Speed" />
                            </Grid>
                            <Grid lg={5.2} xs={12} container className="spaceinmobileviewforprofilepage">
                              <Grid lg={12} xs={12} container justifyContent={"space-between"} alignItems="center">
                                <Grid lg={5} xs={5} container>
                                  <input type="number" min="0" className="createNFT2valueinput" placeholder="0" />
                                </Grid>
                                <Grid lg={1} xs={1} container justifyContent="center">
                                  <small className="text-light">Of</small>
                                </Grid>
                                <Grid lg={5} xs={5} container>
                                  <input type="number" min="0" className="createNFT2valueinput" placeholder="0" />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid lg={0.4} xs={12} container className="spaceinmobileviewforprofilepage" justifyContent={{ lg: "flex-end", xs: "center" }} alignItems="center">
                              <span className="bscirclecr" role="presentation" onClick={() => handleRemove("levels", i)}><HiMinusCircle className="pluscircle" size={30} /><span className="nftcreateinputinremoved"><HiMinusSm size={22} /></span></span>
                              {/* {row === 0 ? (<>
                              <span className="bscirclecr"><HiMinusCircle className="pluscircle" size={30} /><span style={{ color: "white", position: "absolute", right: "16%", top: "2%" }} ><HiMinusSm size={22} /></span></span>
                            </>) : (<>
                              <span className="bscirclecr" role="presentation" onClick={() => handleRemove(i)}><HiMinusCircle className="pluscircle" size={30} /><span style={{ color: "white", position: "absolute", right: "16%", top: "2%" }} ><HiMinusSm size={22} /></span></span>
                            </>)}
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                  </>) : (<>
                    {levels.map((i) => {
                      return (
                        <>
                          <Grid lg={12} xs={12} key={i} container justifyContent="space-between" className="mt-2">
                            <Grid lg={5.2} xs={12} container>
                              <font className="text-light">Speed</font>
                              <input className="createNFT1valueinput mt-2" placeholder="Speed" />
                            </Grid>
                            <Grid lg={5.2} xs={12} container className="spaceinmobileviewforprofilepage">
                              <font className="text-light">Value</font>
                              <Grid lg={12} xs={12} container justifyContent={"space-between"} alignItems="center" className="mt-2">
                                <Grid lg={5} xs={5} container>
                                  <input type="number" min="0" className="createNFT2valueinput" placeholder="0" />
                                </Grid>
                                <Grid lg={1} xs={1} container justifyContent="center">
                                  <small className="text-light">Of</small>
                                </Grid>
                                <Grid lg={5} xs={5} container>
                                  <input type="number" min="0" className="createNFT2valueinput" placeholder="0" />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid lg={0.4} xs={12} container className="spaceinmobileviewforprofilepage" justifyContent={{ lg: "flex-end", xs: "center" }} alignItems="center">
                              <span className="bscirclecr" role="presentation" onClick={() => handleRemove("levels", i)}><HiMinusCircle className="pluscircle" size={30} /><span className="nftcreateinputinremoved"><HiMinusSm size={22} /></span></span>
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                  </>)} */}
                </Grid>
                <Grid lg={10} xs={12} container justifyContent="space-between">
                  <font className="text-light">Stats</font>
                  <span className="bscirclecr" role="presentation" onClick={() => handleAdd("stats")}><BsPlusCircleFill className="pluscircle" size={24} /><span style={{ color: "white", position: "absolute", right: "0%" }} ><BsPlus size={24} /></span></span>
                </Grid>
                <Grid lg={10} xs={12} container sx={{ position: "relative" }} alignItems="flex-start" justifyContent="flex-start">
                  <span className="crdescription pb-1 text-justify text-muted">Numerical traits that just show as numbers</span>
                  <span className="crdescription pb-1 text-justify mt-2 text-muted">Stats show up underneath your item, are clickable, and can be filtered in your collection&apos;s sidebar.</span>
                  {addStats?.length !== 0 ? (<>
                    <Grid lg={10.3} xs={10.3} container justifyContent="space-between">
                      <Grid lg={5.2} xs={5.2} container>
                        <font className="text-light">Speed</font>
                      </Grid>
                      <Grid lg={5.2} xs={5.2} container>
                        <font className="text-light">Value</font>
                      </Grid>
                    </Grid>
                  </>) : (<></>)}
                  {addStats.map((row, i) => {
                    return (
                      <>
                        <Grid lg={12} xs={12} key={i} container justifyContent="space-between" className="mt-2">
                          <Grid lg={5.2} xs={4.8} container>
                            <input className="createNFT1valueinput" placeholder="Speed" name="speed" value={row.speed} onChange={(e) => handleStats(e.target, i)} />
                          </Grid>
                          <Grid lg={5.2} xs={5.2} container>
                            <Grid lg={12} xs={12} container justifyContent={"space-between"} alignItems="center">
                              <Grid lg={5} xs={5} container>
                                <input type="number" min="0" className="createNFT2valueinput" placeholder="0" name="value1" value={row.value1} onChange={(e) => handleStats(e.target, i)} />
                              </Grid>
                              <Grid lg={1} xs={1} container justifyContent="center">
                                <small className="text-light">Of</small>
                              </Grid>
                              <Grid lg={5} xs={5} container>
                                <input type="number" min="0" className="createNFT2valueinput" placeholder="0" name="value2" value={row.value2} onChange={(e) => handleStats(e.target, i)} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid lg={0.4} xs={0.4} container justifyContent={{ lg: "flex-end", xs: "center" }} alignItems="center">
                            <span className="bscirclecr" role="presentation" onClick={() => handleRemove("stats", i)}><HiMinusCircle className="pluscircle" size={30} /><span className="nftcreateinputinremoved"><HiMinusSm size={22} /></span></span>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                  {/* {width > 600 ? (<>
                    {addStats?.length !== 0 ? (<>
                      <Grid lg={10.3} xs={12} container justifyContent="space-between">
                        <Grid lg={5.2} xs={12} container className="">
                          <font className="text-light">Speed</font>
                        </Grid>
                        <Grid lg={5.2} xs={12} container className="spaceinmobileviewforprofilepage">
                          <font className="text-light">Value</font>
                        </Grid>
                      </Grid>
                    </>) : (<></>)}
                    {addStats.map((i) => {
                      return (
                        <>
                          <Grid lg={12} xs={12} key={i} container justifyContent="space-between" className="mt-2">
                            <Grid lg={5.2} xs={12} container>
                              <input className="createNFT1valueinput" placeholder="Speed" />
                            </Grid>
                            <Grid lg={5.2} xs={12} container className="spaceinmobileviewforprofilepage">
                              <Grid lg={12} xs={12} container justifyContent={"space-between"} alignItems="center">
                                <Grid lg={5} xs={5} container>
                                  <input type="number" min="0" className="createNFT2valueinput" placeholder="0" />
                                </Grid>
                                <Grid lg={1} xs={1} container justifyContent="center">
                                  <small className="text-light">Of</small>
                                </Grid>
                                <Grid lg={5} xs={5} container>
                                  <input type="number" min="0" className="createNFT2valueinput" placeholder="0" />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid lg={0.4} xs={12} container className="spaceinmobileviewforprofilepage" justifyContent={{ lg: "flex-end", xs: "center" }} alignItems="center">
                              <span className="bscirclecr" role="presentation" onClick={() => handleRemove("stats", i)}><HiMinusCircle className="pluscircle" size={30} /><span className="nftcreateinputinremoved"><HiMinusSm size={22} /></span></span>
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                  </>) : (<>
                    {addStats.map((i) => {
                      return (
                        <>
                          <Grid lg={12} xs={12} key={i} container justifyContent="space-between" className="mt-2">
                            <Grid lg={5.2} xs={12} container>
                              <font className="text-light">Speed</font>
                              <input className="createNFT1valueinput mt-2" placeholder="Speed" />
                            </Grid>
                            <Grid lg={5.2} xs={12} container className="spaceinmobileviewforprofilepage">
                              <font className="text-light">Value</font>
                              <Grid lg={12} xs={12} container justifyContent={"space-between"} alignItems="center" className="mt-2">
                                <Grid lg={5} xs={5} container>
                                  <input type="number" min="0" className="createNFT2valueinput" placeholder="0" />
                                </Grid>
                                <Grid lg={1} xs={1} container justifyContent="center">
                                  <small className="text-light">Of</small>
                                </Grid>
                                <Grid lg={5} xs={5} container>
                                  <input type="number" min="0" className="createNFT2valueinput" placeholder="0" />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid lg={0.4} xs={12} container className="spaceinmobileviewforprofilepage" justifyContent={{ lg: "flex-end", xs: "center" }} alignItems="center">
                              <span className="bscirclecr" role="presentation" onClick={() => handleRemove("stats", i)}><HiMinusCircle className="pluscircle" size={30} /><span className="nftcreateinputinremoved"><HiMinusSm size={22} /></span></span>
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                  </>)} */}
                </Grid>
                <Grid lg={10} xs={12} container justifyContent="space-between">
                  <font className="text-light">Unlockable content</font>
                  <label className="switch">
                    <input type="checkbox" className="checking" checked={toggle ? true : false} onChange={handleChange} />
                    <span className="slider round"></span>
                  </label>
                </Grid>
                <Grid lg={10} xs={12} container alignItems="flex-start" justifyContent="flex-start">
                  <span className="crdescription pb-1  text-justify text-muted">Include unlockable content that can only be revealed by the owner of the item.</span>
                  {toggle === true ? (<>
                    <textarea className="rewardInput w-100" type="text" placeholder="Enter content (access key,code to redeem,link to a file,etc.)" style={{ height: "190px" }} value={unlockableContent} onChange={(e) => setUnlockableContent(e.target.value)} />
                  </>) : (<></>)}
                </Grid>
                <Grid lg={10} xs={12} container justifyContent="space-between">
                  <font className="text-light text-justify">Explicit & Sensitive Content</font>
                  <label className="switch">
                    <input type="checkbox" className="checking" checked={toggle1 ? true : false} onChange={handleChange1} />
                    <span className="slider round"></span>
                  </label>
                </Grid>
                <Grid lg={10} xs={12} container alignItems="flex-start" justifyContent="flex-start">
                  <span className="crdescription text-justify pb-1 text-muted">Set this item as explicit and sensitive content</span>
                </Grid>
                <Grid lg={12} xs={12} container >
                  <font className="text-light">Supply</font>
                </Grid>
                <Grid lg={10} xs={12} container alignItems="flex-start" justifyContent="flex-start">
                  <span className="crdescription pb-1 text-justify text-muted">The number of items that can be minted. No gas cost to you!</span>
                </Grid>
                <Grid lg={10} xs={12} container justifyContent="center" alignItems="center">
                  <Grid lg={6} xs={8} container justifyContent="space-between" alignItems="center">
                    <Grid lg={2} xs={2} container>
                      <span className="bscirclecr" role="presentation" onClick={() => handleadd("remove")}><HiMinusCircle className="pluscircle" size={30} /><span style={{ color: "white", position: "absolute", right: "16%", top: "2%" }} ><HiMinusSm size={22} /></span></span>
                    </Grid>
                    <Grid lg={6} xs={6} container>
                      <input className="createNFTinput w-100" style={{ padding: "5%" }} placeholder="0" value={value} />
                    </Grid>
                    <Grid lg={2} xs={2} container>
                      <span className="bscirclecr" role="presentation" onClick={() => handleadd("add")}><BsPlusCircleFill className="pluscircle" size={24} /><span style={{ color: "white", position: "absolute", right: "0%" }} ><BsPlus size={24} /></span></span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid lg={12} xs={12} container>
                  <font className="text-light">Blockchain</font>
                </Grid>
                <Grid lg={10} xs={12} container sx={{ position: "relative" }}>
                  <span className="Medium pb-1 text-justify text-muted">The number of items that can be minted. No gas cost to you!</span>
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
                    onChange={(e) => setBlockchainType(e)}
                  />
                </Grid>
                <Grid lg={12} xs={12} container>
                  <font className="text-light">Freeze metadata</font>
                </Grid>
                <Grid lg={10} xs={12} container sx={{ position: "relative" }} alignItems="flex-start" justifyContent="flex-start">
                  <span className="crdescription pb-1 text-justify text-muted">Freezing your metadata will allow you to permanently lock and store all of this item&apos;s content in decentralized file storage.</span>
                  <input className="collectionlinkinput p-2 w-100" value="To freeze your metadata, you must create your item first." disabled />
                  {/* <textarea className="rewardInput w-100" type="text"  style={{ height: "80px" }} /> */}
                </Grid>
                <Grid lg={10} xs={12} container justifyContent="center" alignItems="center" className="mb-4">
                  <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center">
                    <Grid lg={5.4} xs={5.4} container justifyContent="center" alignItems="center">
                      <button className="glow-on-hover" style={{ padding: "6.5%" }}>
                        Cancel
                      </button>
                    </Grid>
                    <Grid lg={5.4} xs={5.4} container justifyContent="center" alignItems="center" className="mt-1">
                      <Button className="btns connectpad popinsMd" onClick={conditionCheck}>Create</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </div>
  );
}
export default Createnft;