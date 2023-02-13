import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TablePagination } from "@mui/material";
import React, { useState } from "react";
// import { nftProperties } from "../../../helpers/datafile";
import "../table.css";

const PropertiesTables = ({ nftDetails }) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const Percentage = (100 / nftDetails?.properties?.length).toFixed(2);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <div>
      <Grid lg={12} xs={12} sx={{ overflow: "auto" }}>
        {nftDetails?.properties?.length === 0 ? (<>
          <Grid lg={10} xs={12} container justifyContent="center" alignItems="center" direction="column">
            <img src={require("../../../assets/banner/nodata.png").default} className="img-fluid w-25" alt="nodata" />
            <h5 className="text-light">No properties yet</h5>
          </Grid>
        </>) : (<>
          <TableContainer className="pricetableinnftdetails1 mt-3">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="start" className="ntffooterdtbleindetails">
                    <font className="text-muted mx-1">Type</font>
                  </TableCell>
                  <TableCell align="start" className="ntffooterdtbleindetails">
                    <font className="text-muted mx-1">Name</font>
                  </TableCell>
                  <TableCell align="" className="ntffooterdtbleindetails">
                    <font className="text-muted mx-1">Price</font>
                  </TableCell>
                  <TableCell align="center" className="ntffooterdtbleindetails">
                    <Grid lg={12} xs={12} container alignItems="center" justifyContent="">
                      <font className="text-muted">%</font>
                    </Grid>
                  </TableCell>
                  <TableCell align="center" className="ntffooterdtbleindetails">
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ paddingTop: "5%" }} className="ntffooterdtbleindetails">
                {nftDetails?.properties?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                  return (<>
                    <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} xs={12} container alignItems="space-between">
                          <font className="text-secondary mx-1 text-capitalize">{row?.propertiesType}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="space-between">
                          <font className="text-light text-capitalize">{row?.propertiesName}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="space-between">
                          <font className="text-light">{!nftDetails?.nftPrice ? "0" : nftDetails?.nftPrice} ETH</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} container alignItems="space-between">
                          <font className="text-light">{Percentage} %</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}></TableCell>
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
              count={nftDetails?.properties?.length}
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

export default PropertiesTables;
