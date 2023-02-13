import { Grid, TableBody, TableCell, TableContainer,TableRow, Table,Box,TableHead,TablePagination } from "@mui/material";
import React,{useState} from "react";
import nfticons2 from "../../../assets/images/ethereumimg.svg";
import { nftBids } from "../../../helpers/datafile";
import "../table.css";
import { useNavigate } from "react-router-dom";
const BidsTable = ({ nftDetails, floorPrice }) => {

  console.log("nftDetails",nftDetails,floorPrice);
  const [status,setStatus] = useState("");
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


  return (
    <div>
      {!status ? (<>
        <Grid lg={12} xs={12} sx={{overflow:"auto"}}>
          <TableContainer className="pricetableinnftdetails1 mt-3">
            <Table stickyHeader aria-label="sticky table">
              <TableBody sx={{ paddingTop: "5%" }} className="ntffooterdtbleindetails">
                {nftBids.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                  return (<>
                    <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="center" role="presentation" onClick={() => navigate("/profile",{state:{BidsProfileData:row}})}>
                          <span className="text-light">{row.id}.</span>
                          <img src={row.img} className="img-fluid mx-2 img-zoom-animation" alt="eth" width="25px" />
                          <font className="text-light mx-1">{row.text1}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="space-between">
                          <font className="text-light ">{row.text2}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="" sx={{ border: "none" }}>
                        <Grid lg={12} container>
                          <font className="text-light">{row.text3}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="space-between">
                          <img src={row.img1} className="img-fluid imageintableforprp" role="presentation" alt="prptable" onClick={() => {setStatus(row);localStorage.setItem("checkValues",true);}} />
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </>);
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid lg={10} xs={12} container justifyContent="flex-end">
            <TablePagination className="tablepaginationglobal"
              sx={{color:"#fff"}}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
              component="div"
              count={nftBids.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </>) : (<>
        <TableContainer className="pricetableinnftdetails1">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className="ntffooterdtbleindetails">
                  <font className="text-muted"  size={3}>Item Details</font>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="ntffooterdtbleindetails">
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                <TableCell align="left" className="ntffooterd" style={{ cursor: "pointer" }} >
                  <Grid lg={12} xs={12} container>
                    <font className="text-light">{status?.heading}</font>
                  </Grid>
                  <Grid lg={12} xs={12} container sx={{ width: "66rem" }}>
                    <Grid lg={6} xs={12} container>
                      <font className="text-muted">{status?.description}</font>
                    </Grid>
                    <Grid lg={4.2} xs={12} container justifyContent="space-between" alignItems="center" direction="column">
                      <Grid lg={4} xs={12} container alignItems="flex-start">
                        <font size={2} className="text-light">{status?.head}</font>
                      </Grid>
                      <Grid lg={4} xs={12} container alignItems="flex-start">
                        <font size={2} className="text-light">{status?.head1}</font>
                      </Grid>
                      <Grid lg={4} xs={12} container alignItems="flex-start">
                        <font size={2} className="text-light">{status?.head2}</font>
                      </Grid>
                    </Grid>
                    <Grid lg={1.6} xs={12} container justifyContent="space-between" direction="column">
                      <Grid lg={4} xs={12} container alignItems="flex-start">
                        <div className="d-flex text-info">
                          <font className="text-info">{status?.text2}</font>
                          <img src={status?.img1} className="img-fluid mx-1" alt="nftdetails" />
                        </div>
                      </Grid>
                      <Grid lg={4} xs={12} container alignItems="flex-start">
                        <font className="text-muted">{status?.tokenID}</font>
                      </Grid>
                      <Grid lg={4} xs={12} container alignItems="flex-start">
                        <font className="text-muted">{status?.text2}</font>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ width: "80%" }} className="mt-3">
          <Grid lg={12} xs={12} container>
            <font className="text-light">Collection Details</font>
            <Grid lg={12} xs={12} container justifyContent="space-between" className="mt-3">
              <Grid lg={7} xs={12} container alignItems="center" sx={{ fontWeight: "600" }}>
                <img src={status?.img} className="backimg" alt="nftdetails" />
                <font className="text-light mx-2" size={3}>The imagination feel Collection</font>
                <Grid lg={12} xs={12} container justifyContent="space-between">
                  <Grid lg={12} xs={12} container alignItems="center" sx={{ fontWeight: "400" }}>
                    <font className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</font>
                    <font className="text-muted">Lorem Ipsum has been the industry&apos;s standard dummy text ever since</font>
                    <font className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </font>
                    <font className="text-muted">Lorem Ipsum has been the industry&apos;s standard dummy text ever since</font>
                  </Grid>
                </Grid>
              </Grid>
              <Grid lg={5} xs={12} container justifyContent="space-between" alignItems="center">
                <Grid lg={4} xs={12} container sx={{ fontWeight: "600" }}>
                  <font className="text-light mx-5" size={3}>{status?.items}</font>
                  <font className="text-muted mx-5" size={3}>Items</font>
                </Grid>
                <Grid lg={4} xs={12} container sx={{ fontWeight: "600" }}>
                  <font className="text-light mx-5" size={3}>{status?.owners}</font>
                  <font className="text-muted mx-5" size={3}>Owners</font>
                </Grid>
                <Grid lg={4} xs={12} container sx={{ fontWeight: "600" }}>
                  <div className="d-flex align-items-center">
                    <font className="text-light mx-5" size={3}>{status?.price}</font>
                  </div>
                  <font className="text-muted mx-5" size={3}>Price</font>
                </Grid>
                <Grid lg={12} xs={12} container justifyContent="space-between">
                  <button className="nftdetailbutton">
                    <div className="d-flex justify-content-center align-items-center">
                      <font className="text-muted" >Volume  Price -</font>
                      <img src={nfticons2} className="img-fluid mx-2" alt="nftdetails" />
                      <font className="text-light">{status?.ETH}</font>
                    </div>
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>)}
    </div>
  );
};

export default BidsTable;
