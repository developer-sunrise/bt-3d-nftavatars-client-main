import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Table,TablePagination } from "@mui/material";
import React,{ useState } from "react";
import "../table.css";
import One from "../../../assets/NFTimages/1day.svg";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
const RankingTable = ({RankingData}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

  return (
    <div>
      <Grid lg={12} xs={12} >
        <Fade bottom>
          <TableContainer className="pricetableinnftdetails mt-3">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Position</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Title</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Base price</font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Last 1day<img src={One} className="img-fluid mx-1" alt="activity" /></font>
                  </TableCell>
                  <TableCell align="left" className="ntffooterdtbleindetails">
                    <font className="text-muted" size={3}>Last 7day<img src={One} className="img-fluid mx-1" alt="activity" /></font>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ paddingTop: "5%" }} className="ntffooterdtbleindetails">
                {RankingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => {
                  return (<>
                    <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                      <TableCell align="left" sx={{ border: "none" }}>
                        <font className="text-muted " size={2}>{item.position}</font>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="center" role="presentation" onClick={() => navigate("/nftlist")}>
                          <img src={item.authorprofile} className="img-fluid img-zoom-animation" width="30" height="30" alt="user" />
                          <font className="text-light   mx-1">{item.text}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="" sx={{ border: "none" }}>
                        <Grid lg={12} xs={12} container justifyContent="flex-start" alignItems="center">
                          <font className="text-light ">{item.baseprice}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} xs={12} container alignItems="center">
                          <font className="text-info ">{item.oneday}</font>
                        </Grid>
                      </TableCell>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Grid lg={12} xs={12} container alignItems="center">
                          <font className="text-warning ">{item.sevenday}</font>
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
              sx={{color:"#fff"}}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
              component="div"
              count={RankingData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Fade>
      </Grid>
    </div>
  );
};

export default RankingTable;