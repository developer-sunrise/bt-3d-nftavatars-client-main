import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Home from "../pages/Home/HomePage";
import Collections from "../pages/Collections/CollectionList";
import NFTList from "../pages/NFTlist/NftList";
import NFTDetails from "../pages/NFTdetails/NFTdetail";
import UserProfile from "../pages/Userprofile/Profile";
import WalletConnect from "../components/makeOffers/index";
import Activity from "../pages/Activity/activity";
import Privacy from "../components/privacypolicy/privacypolicy";
import CreateNft from "../pages/CreateNFT/Createnft";
import CreateCollection from "../pages/Createcollection/Createcollection";
import MyCollections from "../pages/Createcollection/MyCollections";
import AllNfts from "../pages/NFTlist/TotalNfts";

function Approutes() {
  // const location = useLocation();
  // console.log("location",location);
  return (
    <div>
      <>
        {/* {location.pathname == "/landingpage" ||  location.pathname == "/collections" ||  location.pathname == "/nftlist" ||  location.pathname == "/nftdetails" ? (<>
      <Navbar/>
      </>) : (<></>)} */}
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/nftlist/:id" element={<NFTList />} />
          <Route path="/allnfts" element={<AllNfts />} />
          <Route path="/nftdetails/:id" element={<NFTDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/connectwallet" element={<WalletConnect />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/nft/create" element={<CreateNft />} />
          <Route path="/collection/create" element={<CreateCollection />} />
          <Route path="/collection/mycollections" element={<MyCollections />} />
          <Route path="/privacypolicy" element={<Privacy />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </>
    </div>
  );
}
export default Approutes;