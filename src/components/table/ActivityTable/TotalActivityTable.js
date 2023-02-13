import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TablePagination, Avatar } from "@mui/material";
import React, { useState } from "react";
import "../table.css";
import { FiShoppingCart } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";
import { MdDateRange, MdLocalOffer } from "react-icons/md";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { TbArrowsRightLeft } from "react-icons/tb";
import { WiStars } from "react-icons/wi";
import Fade from "react-reveal/Fade";
import { useNavigate,Link } from "react-router-dom";
// import { getMethod } from "../../../apis/index";
import { useSelector } from "react-redux";

const TotalActivesTables = ({ ActiveTabledata }) => {

  const navigate = useNavigate();
  const wallet = useSelector((state) => state.WalletConnect);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log("ActiveTabledata",ActiveTabledata);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Fade bottom>
        {ActiveTabledata?.length === 0 ? (<>
          <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" direction="column">
            <img src={require("../../../assets/banner/nodata.png").default} className="img-fluid w-25" alt="nodata" />
            <h5 className="text-light">No Activities yet</h5>
          </Grid>
        </>) : (<>
          <TableContainer className="pricetableinnftdetails mt-4">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Items</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Price</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Author</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Time</font>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ paddingTop: "5%" }} className="ntffooterdtbleindetails">
                {ActiveTabledata?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                  return (<>
                    <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} xs={12} container>
                          <Link to={`/nftdetails/${row?.nftId}`} className="linkProperty" rel="noopener noreferrer"><img src={process.env.REACT_APP_S3_LINK + row.nftImage} className="img-fluid img-zoom-animation" alt="user" width="50" height="50" style={{ borderRadius: "8px", }} /></Link>
                          <div className="d-grid mx-2">
                            <font className="text-light  mx-1">{row?.nftName}</font>
                            <div className="d-flex align-items-center">
                              {row.activityType === "active" ? (<>
                                <WiStars size={30} className="text-green" />
                                <font className="text-light  mx-1">Minted</font>
                              </>) : row.activityType === "onSale" || row.activityType === "onAuction" ? (<>
                                <MdLocalOffer className="text-primary" />
                                <font className="text-light  mx-2">List</font>
                              </>) : row.activityType === "makeOffer" || row.activityType === "bid" || row.activityType === "bidOffers" ? (<>
                                <HiOutlineCurrencyDollar size={20} style={{ color: "#adff2f" }} />
                                <font className="text-light  mx-2">Offer</font>
                              </>) : row.activityType === "acceptmakeOffer" || row.activityType === "acceptbid" ? (<>
                                <HiOutlineCurrencyDollar size={20} style={{ color: "#adff2f" }} />
                                <font className="text-light  mx-2">Offer <small className="text-green">Accepted</small></font>
                              </>) : row.activityType === "buy" ? (<>
                                <FiShoppingCart className="text-warning" />
                                <font className="text-light  mx-2">Sale</font>
                              </>) : row.activityType === "transfer" ? (<>
                                <TbArrowsRightLeft className="text-success" />
                                <font className="text-light  mx-2">Transfer</font>
                              </>) : (<></>)}
                            </div>
                          </div>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="center">
                          <FaEthereum style={{ color: "#8a2be2" }} />
                          <font className="text-light   mx-1">{!row.price ? "0" : row.price} ETH</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="" sx={{ border: "none" }}>
                        {!row?.ownerName ? (<>
                          <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="center" role="presentation" onClick={() => navigate("/profile", { state: { ActiveProfiledata: row } })}>
                            <Avatar sx={{ width: "30px", height: "30px" }} />
                            <font className="text-light mx-1">{row?.toWalletAddress?.slice(0, 5) + "..." + row?.toWalletAddress?.slice(-5)}</font>
                          </Grid>
                        </>) : (<>
                          <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="center" role="presentation" onClick={() => navigate("/profile", { state: { ActiveProfiledata: row } })}>
                            <img src={process.env.REACT_APP_S3_LINK + row?.ownerProfile} className="img-fluid img-zoom-animation" width="30" height="30" alt="user" />
                            <font className="text-light text-capitalize mx-1">{row?.walletAddress === wallet.address ? "You" : row?.ownerName?.length > 15 ? row?.ownerName?.slice(0, 15) + ".." : row?.ownerName}</font>
                          </Grid>
                        </>)}
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} xs={12} container alignItems="center">
                          <MdDateRange className="text-green" />
                          <font className="text-light  mx-1">{row?.createdOn?.slice(0, 15)}</font>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </>);
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid lg={12} xs={12} container justifyContent="flex-end">
            <TablePagination className="tablepaginationglobal"
              sx={{ color: "#fff" }}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
              component="div"
              count={ActiveTabledata?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </>)}
      </Fade>
    </div>
  );
};

export default TotalActivesTables;