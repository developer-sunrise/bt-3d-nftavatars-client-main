import { Grid } from "@mui/material";
import React from "react";
// import { Typography } from "@mui/material";

const DateTimeDisplay = ({ value, type, isDanger }) => {

  return (
    <div
      className={isDanger ? "countdown danger" : "countdown"}
      style={{
        margin: "0px 12px",
      }}
    >
      <Grid container alignItems="center">
        <font size="2">
          {value}
          {type}
        </font>
      </Grid>
    </div>
  );
};

export default DateTimeDisplay;