import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TablePagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import nfticons2 from "../../../assets/images/ethereumimg.svg";
import owner from "../../../assets/Collectionimg/iconowner.svg";
// import { nftListings } from "../../../helpers/datafile";
import "../table.css";
// import WalletConnect from "../../makeOffers/index";
// import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMethod } from "../../../apis";
const ListingTable = ({ nftDetails }) => {

  const wallet = useSelector((state) => state.WalletConnect);
  // const [open,setOpen] = useState(false);
  // const [data,setData] = useState("");
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUsers = async () => {
    try {
      let url = "viewUser";
      let response = await getMethod({ url });
      if (response.status) {
        const data = response.result.filter((val) => val.walletAddress === wallet.address);
        viewActivities(data);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  const viewActivities = async () => {
    try {
      let url = "GetActivities";
      let response = await getMethod({ url });
      if (response.status) {
        const data1 = response.return.filter((val) => val._id === nftDetails?._id);
        const data2 = data1.filter((val) => val.nftStatus !== "active");
        const data3 = data2.filter((val) => val.nftStatus !== "buy");
        setActivities(data3);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Grid lg={12} xs={12} sx={{ overflow: "auto" }}>
        {activities.length === 0 ? (<>
          <Grid lg={10} xs={12} container justifyContent="center" alignItems="center" direction="column">
            <img src={require("../../../assets/banner/nodata.png").default} className="img-fluid w-25" alt="nodata" />
            <h5 className="text-light">No listings yet</h5>
          </Grid>
        </>) : (<>
          <TableContainer className="pricetableinnftdetails2 mt-3">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Unit Price</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>USD Unit Price</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Quantity</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Expiration</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>From</font>
                  </TableCell>
                  {/* <TableCell align="left" className="ntffooterdtbleindetails"></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody sx={{ paddingTop: "5%" }} className="ntffooterdtbleindetails">
                {activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (<>
                    <TableRow key={row?.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} xs={12} container alignItems="space-between">
                          <img src={nfticons2} className="img-fluid" alt="eth" />
                          <font className="text-secondary mx-1">{!row?.nftPrice ? "0" : row?.nftPrice} ETH</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="space-between">
                          <font className="text-light">{row?.text2}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="" sx={{ border: "none" }}>
                        <Grid lg={12} container>
                          <font className="text-light">{row?.quantity}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="space-between">
                          {row?.soldTime === "Invalid Date" ? (<>
                            <font className="text-light">{Math.abs(parseInt((new Date(row?.updatedOn).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))} days</font>
                          </>) : (<>
                            <font className="text-light">{Math.abs(parseInt((new Date(row?.soldTime).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))} days</font>
                          </>)}
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="center" onClick={() => navigate("/profile", { state: { listTbProfileData: row } })}>
                          <img src={owner} className="img-fluid" alt="prptable" />
                          {row?.toWalletAddress === wallet.address ? (<>
                            <font className="text-light  mt-1 mx-1">You</font>
                          </>) : (<>
                            <font className="text-light  mt-1 mx-1">{row?.ownerName?.length > 15 ? row?.ownerName?.slice(0, 15) + ".." : row?.ownerName}</font>
                          </>)}
                        </Grid>
                      </TableCell>
                      {/* <TableCell align="left" sx={{ border: "none" }}>
                      <FiShoppingCart className="pointer Fishoopingscartsinlistingtable" size={20} onClick={() => { setOpen(true); setData("sale"); }}/>
                      <button className="blackbuy" ><font className="text-info">Buy</font></button>
                    </TableCell> */}
                    </TableRow>
                  </>);
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid lg={10} xs={12} container justifyContent="flex-end">
            <TablePagination className="tablepaginationglobal"
              sx={{ color: "#fff" }}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
              component="div"
              count={activities.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </>)}
      </Grid>
      {/* <WalletConnect openWallet={open} setOpenWallet={setOpen} value={data}/> */}
    </div>
  );
};

export default ListingTable;
