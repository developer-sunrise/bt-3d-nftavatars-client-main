import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TablePagination, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import nfticons2 from "../../../assets/images/ethereumimg.svg";
import owner from "../../../assets/Collectionimg/iconowner.svg";
// import { nftOffers } from "../../../helpers/datafile";
import "../table.css";
import { useNavigate } from "react-router-dom";
import { getMethod, putMethod } from "../../../apis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OfferTables = ({ nftDetails, floorPrice }) => {

  const wallet = useSelector((state) => state.WalletConnect);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [offersData, setOffersData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const viewOffers = async () => {
    try {
      let url = "viewTransactions";
      let response = await getMethod({ url });
      if (response.status) {
        var data = response.result.filter((val) => val.nftId === nftDetails._id);
        var data1 = data.filter((val) => val.status === "accepted");
        if (data1?.length === 0) {
          const datas = data.sort(function (offers1, offers2) { return Number(offers2.price) - Number(offers1.price) });
          setOffersData(datas);
        }
        else {
          setOffersData(data1);
        }
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const acceptOffers = async (val) => {
    try {
      if (val?.saleType === "bid") {
        let url = "updateBids";
        let params = {
          id: val._id,
          nftId: val.nftId,
          fromWalletAddress: val.walletAddress,
          price: val.price,
          type: "acceptbid",
        };
        let response = await putMethod({ url, params });
        if (response.status) {
          toast("Update successfully");
        }
      }
      else if (val?.saleType === "makeOffer") {
        let url = "updateBids";
        let params = {
          id: val._id,
          nftId: val.nftId,
          fromWalletAddress: val.walletAddress,
          price: val.price,
          type: "acceptmakeOffer",
        };
        let response = await putMethod({ url, params });
        if (response.status) {
          toast("Update successfully");
        }
      }
    }
    catch (e) {
      console.log("error in updateoffers", e);
    }
  };

  useEffect(() => {
    viewOffers();
  }, []);

  return (
    <div>
      <Grid lg={12} xs={12} sx={{ overflow: "auto" }}>
        {offersData?.length === 0 ? (<>
          <Grid lg={10} xs={12} container justifyContent="center" alignItems="center" direction="column">
            <img src={require("../../../assets/banner/nodata.png").default} className="img-fluid w-25" alt="nodata" />
            <h5 className="text-light">No offers yet</h5>
          </Grid>
        </>) : (<>
          <TableContainer className="pricetableinnftdetails2 mt-3">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Price</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>USD Price</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Floor Difference</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Expiration</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>From</font>
                  </TableCell>
                  {nftDetails?.walletAddress === wallet.address ? (<>
                    <TableCell align="left" className="ntffooterdtbleindetails"></TableCell>
                  </>) : (<></>)}
                </TableRow>
              </TableHead>
              <TableBody sx={{ paddingTop: "5%" }} className="ntffooterdtbleindetails">
                {offersData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                  return (<>
                    <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} xs={12} container alignItems="space-between">
                          <img src={nfticons2} className="img-fluid" alt="eth" />
                          <font className="text-secondary mx-1">{row?.price} ETH</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="space-between">
                          <font className="text-light">{row?.text2}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="" sx={{ border: "none" }}>
                        <Grid lg={12} container>
                          {!floorPrice?.floorPrice ? (<>
                            <font className="text-light">0.00</font>
                          </>) : (<>
                            <font className="text-light">{Math.abs((Number(row?.price) - Number(floorPrice?.floorPrice))).toFixed(2)}</font>
                          </>)}
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="space-between">
                          {row?.saleType === "bid" ? (<>
                            <font className="text-light">{parseInt((new Date(row?.soldTime).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days</font>
                          </>) : (<>
                            <font className="text-light">{parseInt((new Date(row?.createdOn).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days</font>
                          </>)}
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }} >
                        <Grid lg={12} container alignItems="center" role="presentation" onClick={() => navigate("/profile")}>
                          <img src={owner} className="img-fluid" alt="prptable" />
                          {!row?.ownerName ? (<>
                            <font className="text-light mt-1 mx-1">{row?.walletAddress === wallet.address ? "You" : row?.walletAddress?.slice(0, 5) + "..." + row?.walletAddress?.slice(-5)}</font>
                          </>) : (<>
                            <font className="text-light mt-1 mx-1">{row?.walletAddress === wallet.address ? "You" : row?.ownerName?.length > 15 ? row?.ownerName?.slice(0, 15) + ".." : row?.ownerName}</font>
                          </>)}
                        </Grid>
                      </TableCell >
                      {nftDetails?.walletAddress === wallet.address ? (<>
                        <TableCell align="left" sx={{ border: "none" }}>
                          <Grid lg={12} xs={12} container justifyContent="center">
                            {row?.status === "accepted" ? (<>
                              <font className="text-green">Accepted</font>
                            </>) : (<>
                              <Grid lg={4} xs={6} container>
                                <Button className="btns connectpad popinsMd" onClick={() => acceptOffers(row)}>Accept</Button>
                              </Grid>
                            </>)}
                          </Grid>
                        </TableCell>
                      </>) : (<></>)}
                    </TableRow>
                  </>);
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid lg={9.6} xs={12} container justifyContent="flex-end">
            <TablePagination className="tablepaginationglobal"
              sx={{ color: "#fff" }}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
              component="div"
              count={offersData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </>)}
      </Grid>
    </div>
  );
};

export default OfferTables;
